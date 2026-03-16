/**
 * authService.ts — Flujo OIDC/PKCE nativo (sin librerías externas)
 * Usa crypto.subtle del browser para SHA-256 y generación de PKCE.
 */

// ─── Configuración OIDC ───────────────────────────────────────────────────────

const CONFIG = {
  issuer: 'https://auth.acl.cl/application/o/app-prueba-acl/',
  clientId: 'app-activos-client-id',
  redirectUri: 'http://localhost:3000/',
  postLogoutRedirectUri: 'http://localhost:3000/',
  scope: 'openid profile email roles',
  authorizeParams: {
    prompt: 'consent',
  },
} as const;

const STORAGE_KEYS = {
  codeVerifier: 'pkce_code_verifier',
  state: 'oidc_state',
  idToken: 'id_token',
  accessToken: 'access_token',
  tokenType: 'token_type',
  userInfo: 'oidc_userinfo',
} as const;

// ─── Construcción de endpoints ────────────────────────────────────────────────

/**
 * Extrae solo el origin del issuer y construye la URL del endpoint.
 * Ej: issuer "https://auth.acl.cl/application/o/app-prueba-acl/"
 *   → origin "https://auth.acl.cl"
 *   → getAuthentikEndpoint("/application/o/authorize/")
 *   = "https://auth.acl.cl/application/o/authorize/"
 */
function getAuthentikEndpoint(pathname: string): string {
  const origin = new URL(CONFIG.issuer).origin;
  return new URL(pathname, origin).toString();
}

function buildAuthUrl({ state, codeChallenge }: { state: string; codeChallenge: string }): string {
  const url = new URL(getAuthentikEndpoint('/application/o/authorize/'));
  url.searchParams.set('client_id', CONFIG.clientId);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('redirect_uri', CONFIG.redirectUri);
  url.searchParams.set('scope', CONFIG.scope);
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  const extraParams = CONFIG.authorizeParams as Record<string, string>;
  for (const [key, value] of Object.entries(extraParams)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

// ─── Storage ──────────────────────────────────────────────────────────────────

/** Tokens y userInfo → localStorage (persisten entre tabs) */
function saveTokens(tokens: { access_token: string; id_token: string; token_type?: string }): void {
  if (tokens.id_token) localStorage.setItem(STORAGE_KEYS.idToken, tokens.id_token);
  if (tokens.access_token) localStorage.setItem(STORAGE_KEYS.accessToken, tokens.access_token);
  if (tokens.token_type) localStorage.setItem(STORAGE_KEYS.tokenType, tokens.token_type);
}

/**
 * Limpia sesión completa:
 * - tokens y userInfo de localStorage
 * - codeVerifier y state de sessionStorage
 */
function clearLocalSession(): void {
  localStorage.removeItem(STORAGE_KEYS.idToken);
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.tokenType);
  localStorage.removeItem(STORAGE_KEYS.userInfo);
  sessionStorage.removeItem(STORAGE_KEYS.codeVerifier);
  sessionStorage.removeItem(STORAGE_KEYS.state);
}

// ─── Utilidades PKCE ─────────────────────────────────────────────────────────

function base64urlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  bytes.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateRandomString(byteLength: number): string {
  const array = new Uint8Array(byteLength);
  crypto.getRandomValues(array);
  return base64urlEncode(array.buffer);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64urlEncode(digest);
}

function decodeJwtPayload(token: string): Record<string, any> {
  try {
    const payloadB64 = token.split('.')[1];
    if (!payloadB64) return {};
    const padded = payloadB64 + '==='.slice((payloadB64.length + 3) % 4);
    const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return {};
  }
}

// ─── Resolución de roles y grupos ────────────────────────────────────────────

function resolveRolesFromClaims(claims: Record<string, any>): string[] {
  if (!claims || typeof claims !== 'object') return [];
  let roles: string[] = [];
  if (Array.isArray(claims.roles)) {
    roles = claims.roles;
  } else if (typeof claims.role === 'string') {
    roles = [claims.role];
  }
  return [...new Set(roles)].filter((r) => r && r !== 'Sin Rol');
}

function resolveGroupsFromClaims(claims: Record<string, any>): string[] {
  if (!claims || typeof claims !== 'object') return [];
  if (Array.isArray(claims.groups)) {
    return [...new Set(claims.groups)].filter((g: any) => !!g);
  }
  return [];
}

// ─── Tipos públicos ──────────────────────────────────────────────────────────

export interface UserInfo {
  sub: string;
  name: string;
  email: string;
  roles: string[];
  groups: string[];
}

// ─── Servicio ────────────────────────────────────────────────────────────────

export const authService = {
  /**
   * Inicia el flujo PKCE: genera verifier/challenge/state y redirige a Authentik.
   * codeVerifier y state → sessionStorage (temporales).
   */
  async login(): Promise<void> {
    const verifier = generateRandomString(32);
    const challenge = await generateCodeChallenge(verifier);
    const state = generateRandomString(16);

    sessionStorage.setItem(STORAGE_KEYS.codeVerifier, verifier);
    sessionStorage.setItem(STORAGE_KEYS.state, state);

    window.location.assign(buildAuthUrl({ state, codeChallenge: challenge }));
  },

  /**
   * Procesa el redirect de Authentik: intercambia code por tokens, guarda sesión.
   * Limpia la URL ANTES del fetch para evitar doble ejecución en React StrictMode.
   */
  async handleCallback(): Promise<UserInfo> {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const returnedState = searchParams.get('state');

    if (!code || !returnedState) {
      throw new Error('handleCallback: missing code or state in URL');
    }

    const savedState = sessionStorage.getItem(STORAGE_KEYS.state);
    const verifier = sessionStorage.getItem(STORAGE_KEYS.codeVerifier);

    if (returnedState !== savedState) {
      throw new Error('handleCallback: state mismatch — possible CSRF');
    }
    if (!verifier) {
      throw new Error('handleCallback: missing code_verifier (already consumed?)');
    }

    // Limpiar URL y PKCE state ANTES del fetch (previene doble invocación en StrictMode)
    window.history.replaceState({}, document.title, window.location.pathname);
    sessionStorage.removeItem(STORAGE_KEYS.codeVerifier);
    sessionStorage.removeItem(STORAGE_KEYS.state);

    // Intercambio de código por tokens
    const tokenRes = await fetch(getAuthentikEndpoint('/application/o/token/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: CONFIG.clientId,
        code,
        redirect_uri: CONFIG.redirectUri,
        code_verifier: verifier,
      }).toString(),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      throw new Error(`Token exchange failed (${tokenRes.status}): ${errText}`);
    }

    const tokens: { access_token: string; id_token: string; token_type?: string } =
      await tokenRes.json();

    // Guardar tokens en localStorage
    saveTokens(tokens);

    // Extraer claims del id_token
    const claims = decodeJwtPayload(tokens.id_token);
    const roles = resolveRolesFromClaims(claims);
    const groups = resolveGroupsFromClaims(claims);

    const user: UserInfo = {
      sub: claims.sub ?? '',
      name: claims.name ?? claims.preferred_username ?? claims.email ?? 'Usuario',
      email: claims.email ?? '',
      roles,
      groups,
    };

    // userInfo también en localStorage
    localStorage.setItem(STORAGE_KEYS.userInfo, JSON.stringify(user));
    return user;
  },

  /**
   * Cierra la sesión: limpia storage y redirige al endpoint end-session de Authentik
   * pasando id_token_hint para que Authentik invalide la sesión en el servidor.
   */
  logout(): void {
    const idToken = localStorage.getItem(STORAGE_KEYS.idToken);
    clearLocalSession();

    const endSessionUrl = new URL(getAuthentikEndpoint('/if/user/#/library'));
    if (idToken) endSessionUrl.searchParams.set('id_token_hint', idToken);
    endSessionUrl.searchParams.set('post_logout_redirect_uri', CONFIG.postLogoutRedirectUri);

    window.location.assign(endSessionUrl.toString());
  },

  /** Retorna el usuario guardado en localStorage, o null si no hay sesión. */
  getUser(): UserInfo | null {
    const raw = localStorage.getItem(STORAGE_KEYS.userInfo);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserInfo;
    } catch {
      return null;
    }
  },

  /** true si hay access_token en localStorage */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.accessToken);
  },

  /** Retorna el access_token desde localStorage para usarlo como Bearer en los servicios */
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.accessToken);
  },
};
