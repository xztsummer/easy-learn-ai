interface WebpackModuleContext {
  keys(): string[];
  (id: string): any;
  resolve(id: string): string;
  id: string;
}

interface ImportMeta {
  webpackContext(
    request: string,
    options?: {
      recursive?: boolean;
      regExp?: RegExp;
      include?: RegExp;
      exclude?: RegExp;
      mode?: "sync" | "eager" | "weak" | "lazy" | "lazy-once";
    }
  ): WebpackModuleContext;
}
