/* eslint-disable @typescript-eslint/ban-ts-comment */

const BASE_URL =
  '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const genCodeSnippet = ({ root }: { root: HTMLElement }) => {
  const cleanRoot = () => {
    while (root.firstChild) root.removeChild(root.firstChild);
  };

  const renderLoading = () => {
    cleanRoot();
    // @ts-ignore
    const skeletonLoading = new SkeletonLoading();
    root.appendChild(skeletonLoading.element);
  };

  const renderCodeSnippet = (props: {
    explanation: string;
    language: string;
    code: string;
  }) => {
    cleanRoot();
    // @ts-ignore
    const codeSnippet = new CodeSnippet({ ...props });

    root.appendChild(codeSnippet.element);

    codeSnippet.setCopyEvent(props.code);
    codeSnippet.setRestartEvent();
    codeSnippet.setSpeechEvent(props.explanation);

    chrome.runtime.sendMessage({ action: 'activeCodeHighlighting' });
  };

  const run = async () => {
    const textarea =
      document.querySelector<HTMLTextAreaElement>('textarea.gLFyf');
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    const query = textarea?.value ?? params.get('q');

    try {
      const isCodeRelated = await fetch(
        `${BASE_URL}/gemini/isCodeRelatedResearch?research=${query}`,
        {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'text/plain'
          })
        }
      );

      const isCodeRelatedPercentage = Number(await isCodeRelated.text());

      if (isCodeRelatedPercentage <= 50) {
        throw new Error(
          'The prompt relationship with programming is too low to generate a code snippet'
        );
      }

      renderLoading();

      const res = await fetch(`${BASE_URL}/gemini/generateCodeSnippet`, {
        method: 'POST',
        body: JSON.stringify({ prompt: query }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        })
      });

      const {
        content: { code_snippet: code, language, explanation }
        // @ts-ignore
      }: ApiModels.CodeSnippetBody = await res.json();

      renderCodeSnippet({ explanation, language, code });
    } catch (reason) {
      console.error(reason);
      cleanRoot();
    }
  };

  run();
};
