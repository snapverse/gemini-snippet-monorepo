export default class {
  public createPageLink(props: {
    logo: string;
    source: GoogleSearchEngine.Source;
    content: GoogleSearchEngine.Content;
  }) {
    const father = document.createElement('section');
    console.log(father, props)
  }
}
