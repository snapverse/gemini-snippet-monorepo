declare const MONOREPO_ROOT: string;

declare namespace GoogleSearchEngine {
  export interface Source {
    pageTitle: string;
    href: string;
  }

  export interface Content {
    title: string;
    description: string;
  }
}
