/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string
  readonly VITE_GOOGLE_CUSTOM_SEARCH_API: string
  readonly VITE_GOOGLE_PROGRAMMABLE_SEARCH_ENGINE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
