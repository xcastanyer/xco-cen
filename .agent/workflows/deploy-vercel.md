---
description: Cómo desplegar la aplicación en Vercel
---

# Despliegue en Vercel

Este workflow te guiará paso a paso para desplegar tu aplicación Next.js con autenticación de Google en Vercel.

## Prerrequisitos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Google Cloud Console](https://console.cloud.google.com)
- Base de datos Supabase configurada (ya tienes esto)
- Repositorio Git (GitHub, GitLab o Bitbucket)

## Pasos de Despliegue

### 1. Preparar el Repositorio Git

Si aún no has inicializado Git o no has hecho commit de tus cambios:

```bash
git add .
git commit -m "Preparar para despliegue en Vercel"
git push
```

### 2. Configurar Google OAuth para Producción

1. Ve a [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Selecciona tu proyecto
3. Edita las credenciales OAuth 2.0 existentes
4. En **"URIs de redireccionamiento autorizados"**, añade:
   - `https://tu-app.vercel.app/api/auth/callback/google`
   - `https://tu-dominio-personalizado.com/api/auth/callback/google` (si usas dominio propio)
5. En **"Orígenes de JavaScript autorizados"**, añade:
   - `https://tu-app.vercel.app`
   - `https://tu-dominio-personalizado.com` (si usas dominio propio)

> **Nota**: Reemplaza `tu-app` con el nombre que Vercel asignará a tu proyecto. Puedes actualizar esto después del primer despliegue.

### 3. Desplegar en Vercel

#### Opción A: Desde la Web de Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New..."** → **"Project"**
3. Importa tu repositorio Git
4. Vercel detectará automáticamente que es un proyecto Next.js
5. **Configura las Variables de Entorno** (muy importante):
   - `DATABASE_URL`: Tu URL de Supabase con pgbouncer
   - `DIRECT_URL`: Tu URL directa de Supabase
   - `GOOGLE_CLIENT_ID`: Tu Client ID de Google
   - `GOOGLE_CLIENT_SECRET`: Tu Client Secret de Google
   - `NEXTAUTH_URL`: `https://tu-app.vercel.app` (usa la URL que Vercel te asignará)
   - `NEXTAUTH_SECRET`: Genera uno nuevo con: `openssl rand -base64 32`
6. Haz clic en **"Deploy"**

#### Opción B: Desde la CLI de Vercel

// turbo
```bash
npm install -g vercel
```

// turbo
```bash
vercel login
```

```bash
vercel
```

Sigue las instrucciones en pantalla y configura las variables de entorno cuando se te solicite.

### 4. Configurar Variables de Entorno en Vercel

Si no las configuraste durante el despliegue inicial:

1. Ve a tu proyecto en Vercel
2. Navega a **Settings** → **Environment Variables**
3. Añade cada variable:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_URL` (usa la URL de producción de Vercel)
   - `NEXTAUTH_SECRET` (genera uno nuevo para producción)

### 5. Actualizar NEXTAUTH_URL en Google OAuth

1. Una vez desplegado, Vercel te dará una URL (ej: `https://tu-app.vercel.app`)
2. Vuelve a Google Cloud Console
3. Actualiza los URIs de redireccionamiento con la URL correcta:
   - `https://tu-app.vercel.app/api/auth/callback/google`

### 6. Verificar el Despliegue

1. Visita tu aplicación en la URL de Vercel
2. Prueba el login con Google
3. Verifica que puedas acceder al dashboard
4. Comprueba que los datos se guarden en Supabase

### 7. Configurar Dominio Personalizado (Opcional)

1. En Vercel, ve a **Settings** → **Domains**
2. Añade tu dominio personalizado
3. Sigue las instrucciones para configurar los registros DNS
4. Actualiza `NEXTAUTH_URL` con tu nuevo dominio
5. Actualiza los URIs de Google OAuth con tu nuevo dominio

## Solución de Problemas

### Error: "Invalid callback URL"
- Verifica que los URIs de redireccionamiento en Google Cloud Console coincidan exactamente con tu URL de Vercel
- Asegúrate de que `NEXTAUTH_URL` esté configurado correctamente

### Error: "Database connection failed"
- Verifica que `DATABASE_URL` y `DIRECT_URL` estén configurados en Vercel
- Asegúrate de que Supabase permita conexiones desde Vercel

### Error: "Missing NEXTAUTH_SECRET"
- Genera un nuevo secret: `openssl rand -base64 32`
- Añádelo a las variables de entorno en Vercel

### Prisma no genera el cliente
- Vercel ejecuta automáticamente `prisma generate` durante el build
- Si hay problemas, añade un script `postinstall` en `package.json`:
  ```json
  "postinstall": "prisma generate"
  ```

## Comandos Útiles

```bash
# Ver logs de producción
vercel logs

# Redesplegar
vercel --prod

# Ver información del proyecto
vercel inspect
```

## Notas Importantes

- **NEXTAUTH_SECRET**: Usa un secret diferente para producción
- **Variables de Entorno**: Nunca las subas a Git (ya están en `.gitignore`)
- **Dominio**: Vercel proporciona HTTPS automáticamente
- **Actualizaciones**: Cada push a tu rama principal desplegará automáticamente
