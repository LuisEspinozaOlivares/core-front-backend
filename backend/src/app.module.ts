import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProfessionalModule } from './profesional/professional.module';
import { CommonModule } from './common/common.module';
import { PersonaModule } from './persona/persona.module';
import { EmpresaModule } from './empresa/empresa.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    CommonModule,
    PersonaModule,
    EmpresaModule,
    ProfessionalModule,
  ],
})
export class AppModule { }
