/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_HOSTNAME?: string;
  readonly VITE_API_PORT?: string;
  readonly VITE_API_PROTOCOL?: 'http' | 'https';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
