import type { GoogleSearchEngine as GSE } from 'declarations';

export default class {
  public createPageLink(props: {
    logo: string;
    source: GSE.Source;
    content: GSE.Content;
  }) {
    const father = document.createElement('section');
    console.log(father, props)
  }
}
