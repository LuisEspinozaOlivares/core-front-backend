# 🤖 AI Prompt: NestJS CRUD Generator Instructions

Actúa como un Desarrollador Senior de NestJS. Tu objetivo es generar todos los archivos necesarios para un módulo CRUD completo siguiendo las mejores prácticas de arquitectura limpia y tipado estricto.

## 1. Información del Recurso
- **Nombre de la Entidad:** [Nombre de la Entidad, ej: Product]
- **Nombre del Módulo (plural):** [Nombre del Módulo, ej: products]
- **Base Path:** `/api/[nombre-recurso]`

## 2. Definición del Modelo / Atributos / Mapper
Genera la entidad y los DTOs basándote en el archivo schema.prisma alojado en el proyecto.

* La entidad debe ser una interface y debe representar tal cual los campos alojados en el modelo de prisma con los campos en snake_case.
* Los DTOs deben ser clases y deben representar tal cual los campos alojados en el modelo de prisma con los campos en camelCase.
* Debes generar un archivo mapper que permita mapear entre la entidad y los DTOs con dos métodos estáticos, toDto y toEntity.

## 3. Requisitos Técnicos Obligatorios

### A. Estructura de Archivos
Hay cuatro modulos principales en la estructura del proyecto, common, persona, profesional y empresa.
Debes generar los siguientes archivos en la carpeta `src/[nombre-modulo]`:
1. `entity/[nombre-recurso].entity.ts`: Los campos deben ser en snake_case tal cual está en el modelo de prisma. Es solo una interface.
2. `dto/crear-[nombre-recurso].dto.ts`: Usando `class-validator` y `class-transformer`.
3. `dto/modificar-[nombre-recurso].dto.ts`: Que simplemente extienda de `crear-[nombre-recurso].dto.ts`.
4. `dto/[nombre-recurso].dto.ts`: Que tenga todos los datos de la entidad en camelCase. No es necesario agregarle validación. Debe llevar las anotaciones `@ApiProperty()` en cada campo.
5. `[nombre-recurso].service.ts`: Lógica de negocio con manejo de errores (`NotFoundException`).
6. `[nombre-recurso].controller.ts`: Endpoints con códigos de estado correctos.
7. El controlador y el servicio deben importarse en el archivo `src/[nombre-modulo].module.ts`

### B. Estándares de Código
- **Swagger:** Usa decoradores `@ApiTags`, `@ApiOperation`, `@ApiResponse` y `@Body`.

## 4. Endpoints a Generar
- `GET /`: Listar todos.
- `POST /`: Crear recurso.
- `GET /:id`: Obtener uno por ID.
- `PUT /:id`: Actualización.
- `DELETE /:id`: Eliminación física (remove).

## 5. Instrucción de Salida
Genera el código bloque por bloque, asegurándote de que las importaciones sean coherentes entre archivos. No omitas las validaciones de `class-validator` en los DTOs. Ten la libertad de inspeccionar el proyecto pero no modifiques ni elimines nada de lo que ya está hecho, tu tarea es simplemente generar el recurso acomodandote a lo que ya está desarrollado.
El espacio de identación de los archivos debe ser de 2.
Todas las importaciones y variables en String deben ser con comillas simples `''`.