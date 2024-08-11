/* eslint-disable @typescript-eslint/ban-ts-comment */
chrome.runtime.sendMessage({ action: 'injectInterfaceIcons' });

const BASE_URL = 'http://127.0.0.1:5000';

const root = document.createElement('main');
root.classList.add('gem_ChromeSnippetRoot');

const googleSearchPlace = document.querySelector('.s6JM6d');
googleSearchPlace?.prepend(root);

const renderLoading = () => {
  // @ts-ignore
  const skeletonLoading = new SkeletonLoading();
  root.appendChild(skeletonLoading.element);
};

const cleanRoot = () => {
  while (root.firstChild) root.removeChild(root.firstChild);
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

  chrome.runtime.sendMessage({ action: 'activeCodeHighlighting' });
};

const run = async () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const query = params.get('q');

  renderLoading();

  try {
    const res = await fetch(
      `${BASE_URL}/gemini/generateCodeSnippet?prompt=${query}`
    );

    const {
      content: { code_snippet: code, language, explanation }
      // @ts-ignore
    }: ApiModels.CodeSnippetBody = await res.json();

    renderCodeSnippet({ explanation, language, code });
  } catch (reason) {
    cleanRoot();
    console.error(reason);
  }
};

run();
