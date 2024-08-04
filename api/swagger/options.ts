import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import type { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

import { STYLESHEET_THEME } from './theme';
import env from '@/env';

export const SWAGGER_OPTIONS: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: 'Gemini Code Snippet Extension API',
      description:
        'The easiest way to find your code solutions in Google Chrome',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://${env.SERVER_HOST}:${env.SERVER_PORT}`,
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'gemini', description: 'Gemini API related end-points' },
      { name: 'default', description: 'Default sample end-points' }
    ]
  }
};

export const SWAGGER_UI_OPTIONS: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  theme: {
    favicon: [
      {
        filename: 'favicon.svg',
        rel: 'icon',
        sizes: 'any',
        type: 'image/svg+xml',
        content: Buffer.from(
          'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHNjcmlwdC8+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTE0IDI4YzAtMS45MzctLjM3My0zLjc1Ny0xLjEyLTUuNDZhMTMuODk4IDEzLjg5OCAwIDAgMC0yLjk3NS00LjQ0NUExMy44OTcgMTMuODk3IDAgMCAwIDUuNDYgMTUuMTJDMy43NTcgMTQuMzczIDEuOTM3IDE0IDAgMTRjMS45MzcgMCAzLjc1Ny0uMzYyIDUuNDYtMS4wODUgMS43MDMtLjc0NyAzLjE4NS0xLjc1IDQuNDQ1LTMuMDFBMTMuODk3IDEzLjg5NyAwIDAgMCAxMi44OCA1LjQ2QzEzLjYyNyAzLjc1NyAxNCAxLjkzNyAxNCAwYzAgMS45MzcuMzYyIDMuNzU3IDEuMDg1IDUuNDYuNzQ3IDEuNzAzIDEuNzUgMy4xODUgMy4wMSA0LjQ0NSAxLjI2IDEuMjYgMi43NDIgMi4yNjMgNC40NDUgMy4wMUMyNC4yNDMgMTMuNjM4IDI2LjA2MyAxNCAyOCAxNGMtMS45MzcgMC0zLjc1Ny4zNzMtNS40NiAxLjEyYTEzLjg5OCAxMy44OTggMCAwIDAtNC40NDUgMi45NzVjLTEuMjYgMS4yNi0yLjI2MyAyLjc0Mi0zLjAxIDQuNDQ1QzE0LjM2MiAyNC4yNDMgMTQgMjYuMDYzIDE0IDI4WiIvPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDE4LjY4MyAtMzMuMTk4IDE0LjEzNikgc2NhbGUoMjkuODAyNSAyMzguNzM3KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjA2NyIgc3RvcC1jb2xvcj0iIzkxNjhDMCIvPjxzdG9wIG9mZnNldD0iLjM0MyIgc3RvcC1jb2xvcj0iIzU2ODREMSIvPjxzdG9wIG9mZnNldD0iLjY3MiIgc3RvcC1jb2xvcj0iIzFCQTFFMyIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxzY3JpcHQvPjwvc3ZnPg==',
          'base64'
        )
      }
    ],
    title: 'Gemini Chrome Snippet API Docs',
    css: [
      {
        filename: 'theme.css',
        content: STYLESHEET_THEME
      }
    ]
  }
};
