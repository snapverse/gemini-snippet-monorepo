interface SnippetInit {
  explanation: string;
  code: string;
  language: string;
  source?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class CodeSnippet {
  element: HTMLElement = null;

  public constructor(init: SnippetInit) {
    const component = this.onInit(init);
    this.element = component;
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
    language: string;
    source?: string;
    engine?: 'Gemini 1.1';
  }) {
    const container = document.createElement('section');
    container.classList.add('gem_ChromeSnippetContainer');

    [
      this.createAvatar(),
      this.createExplanation({ rawHTML: explanation }),
      this.createSnippet({ code, language, source }),
      this.createActions({ engine })
    ].forEach((child) => container.appendChild(child));

    return container;
  }

  private createAvatar() {
    const avatar = document.createElement('img');
    avatar.setAttribute('height', '32');
    avatar.setAttribute('width', '32');
    avatar.src = chrome.runtime.getURL('gemini-colored.svg');

    return avatar;
  }

  private createExplanation(props: { rawHTML: string }) {
    const explanation = document.createElement('p');
    explanation.textContent = props.rawHTML;

    return explanation;
  }

  private createSnippet(props: {
    code: string;
    source: string;
    language: string;
  }) {
    const snippet = document.createElement('main');
    snippet.classList.add('gem_ChromeSnippet');

    const { code, source, language } = props;

    [
      this.createHeader({ language }),
      this.createCode({ code, language }),
      this.createFooter({ source }),
      this.createVotes({ votes: 0 })
    ].forEach((child) => snippet.appendChild(child));

    return snippet;
  }

  private createHeader(props: { language: string }) {
    const header = document.createElement('div');
    header.setAttribute('role', 'header');
    header.innerHTML = /*html*/ `<strong>${props.language}</strong>`;

    return header;
  }

  private createCode(props: { code: string; language: string }) {
    const pre = document.createElement('pre');
    const code = document.createElement('code');

    code.textContent = props.code;
    code.classList.add(`language-${props.language.toLowerCase()}`);

    pre.setAttribute('role', 'code');
    pre.appendChild(code);

    return pre;
  }

  private createVotes(props: { votes: number }) {
    const votes = document.createElement('div');
    votes.setAttribute('role', 'votes');

    votes.innerHTML = /*html*/ `
    <span class="material-symbols-custom">keyboard_arrow_up</span>
    <i>${props.votes}</i>
    <span class="material-symbols-custom">keyboard_arrow_down</span>
    `;

    return votes;
  }

  private createFooter(props: { source: string }) {
    const footer = document.createElement('div');
    footer.setAttribute('role', 'footer');
    footer.innerHTML = /*html*/ `
				<i>Fuente <a href="https://gemini.google.com/app" target="_blank">${props.source}</a></i>
				<span class="material-symbols-custom">content_copy</span>
			`;

    return footer;
  }

  private createActions(props: { engine: string }) {
    const actions = document.createElement('div');
    actions.setAttribute('role', 'actions');

    actions.innerHTML = /*html*/ `
		<span class="material-symbols-custom">volume_up</span>
		<span class="material-symbols-custom">restart_alt</span>
		<span class="gem_ChromeSnippetEngine">
      <img width="22" height="22" src="${chrome.runtime.getURL('gemini-outlined.svg')}"  />
			${props.engine}
		</span>
		`;

    return actions;
  }
}
