import './stylesheet.css';

interface SnippetInit {
  explanation: string;
  code: string;
  language: { short: string; long: string };
  source: string;
}

export default class CodeSnippet {
  public constructor(init: SnippetInit, root: string) {
    const component = this.onInit(init);
    document.querySelector(root).prepend(component);
  }

  private onInit({
    explanation,
    code,
    language,
    engine = 'Gemini 1.1',
    source = 'gemini'
  }: {
    explanation: string;
    code: string;
    language: { short: string; long: string };
    source?: string;
    engine?: 'Gemini 1.1',
  }) {
    const container = document.createElement('section');
    container.classList.add('gem_ChromeSnippetContainer');

    [
      this.createExplanation({ rawHTML: explanation }),
      this.createSnippet({ code, language, source }),
      this.createActions({ engine })
    ].forEach((child) => container.appendChild(child));

    return container;
  }

  private createExplanation(props: { rawHTML: string }) {
    const explanation = document.createElement('p');
    explanation.innerHTML = props.rawHTML;

    return explanation;
  }

  private createSnippet(props: {
    code: string;
    source: string;
    language: { short: string; long: string };
  }) {
    const snippet = document.createElement('main');
    snippet.classList.add('gem_ChromeSnippet');

    const {
      code,
      source,
      language: { short, long }
    } = props;

    [
      this.createHeader({ language: { long } }),
      this.createCode({ code, language: { short } }),
      this.createFooter({ source }),
      this.createVotes({ votes: 0 })
    ].forEach((child) => snippet.appendChild(child));

    return snippet;
  }

  private createHeader(props: { language: { long: string } }) {
    const header = document.createElement('div');
    header.setAttribute('role', 'header');
    header.innerHTML = /*html*/ `<strong>${props.language.long}</strong>`;

    return header;
  }

  private createCode(props: { code: string; language: { short: string } }) {
    const code = document.createElement('pre');
    code.setAttribute('role', 'code');
    code.classList.add(`language-${props.language.short}`);
    code.innerHTML = /*html*/ `<code>${props.code}</code>`;

    return code;
  }

  private createVotes(props: { votes: number }) {
    const votes = document.createElement('div');
    votes.setAttribute('role', 'votes');

    votes.innerHTML = /*html*/ `
    <span class="material-symbols-outlined">keyboard_arrow_up</span>
    <i>${props.votes}</i>
    <span class="material-symbols-outlined">keyboard_arrow_down</span>
    `;

    return votes;
  }

  private createFooter(props: { source: string }) {
    const footer = document.createElement('div');
    footer.setAttribute('role', 'footer');
    footer.innerHTML = /*html*/ `
				<i>Fuente <a href="https://gemini.google.com/app" target="_blank">${props.source}</a></i>
				<span class="material-symbols-outlined">content_copy</span>
			`;

    return footer;
  }

  private createActions(props: { engine: string }) {
    const actions = document.createElement('div');
    actions.setAttribute('role', 'actions');

    actions.innerHTML = /*html*/ `
		<span class="material-symbols-outlined">volume_up</span>
		<span class="material-symbols-outlined">restart_alt</span>
		<span class="gem_ChromeSnippetEngine">
			<img src="/gemini-outlined.svg" width="22" height="22" />
			${props.engine}
		</span>
		`;

    return actions;
  }
}
