import { Pane } from 'tweakpane';
import GoogleSearchEngine from './GoogleSearchEngine';
import setupWindow from './setupWindow';

export default class GUI {
  protected root = document.querySelector<HTMLDivElement>('#__root__');
  protected googleEngine = new GoogleSearchEngine();

  public constructor() {
    this.onInit();
  }

  private onInit() {
    const pane = new Pane({
      title: 'Start to play',
      container: setupWindow(document.querySelector<HTMLSpanElement>('#pane'))
    });

    const PARAMS = {
      component: '',
      searchQuery: '',
      darkMode: false
    };

    pane.addBinding(PARAMS, 'component', {
      options: {
        None: '',
        Popup: '/src/views/popup',
        GoogleSearch: '/src/contentScripts/googleSearch'
      }
    });
    pane.addBinding(PARAMS, 'searchQuery');
    pane.addBinding(PARAMS, 'darkMode');

    pane.on('change', (ev) => {
      const key = (
        ev.target as unknown as keyof typeof ev.target & { key: string }
      ).key;
      const value = ev.value;

      if (this.behaviors[key]) {
        this.behaviors[key](value);
      }
    });
  }

  private createIframe(query: string): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.classList.add('googleSearch');
    iframe.src = `https://www.google.com/search?igu=1&q=${query}`;
    return iframe;
  }

  private behaviors: { [key: string]: (value: unknown) => void } = {
    async component(value: string) {
      console.log(value)
    },
    darkMode() {
      // Add behavior logic if necessary
    },
    searchQuery: async (value: string) => {
      if (!this.root) {
        console.error('Root element not found');
        return;
      }

      const query = value.split(' ').join('+');
      const iframe = this.createIframe(query);

      while (this.root.firstChild) {
        this.root.removeChild(this.root.firstChild);
      }

      this.root.appendChild(iframe);
    }
  };
}
