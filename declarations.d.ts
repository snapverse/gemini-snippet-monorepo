declare const MONOREPO_ROOT: string;

export namespace GoogleSearchEngine {
  export interface Source {
    pageTitle: string;
    href: string;
  }

  export interface Content {
		title: string
		description: string
	}
}
