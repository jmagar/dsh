/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_WS_URL: string
  readonly VITE_NODE_ENV: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Asset imports
declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react'
  const content: FunctionComponent<SVGProps<SVGSVGElement>>
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.json' {
  const content: Record<string, unknown>
  export default content
}

// CSS modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// For non-TS files that we want to import
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
} 