/* eslint-disable @typescript-eslint/ban-ts-comment */

chrome.runtime.sendMessage({ action: 'injectInterfaceIcons' });

const root = document.createElement('main');
root.classList.add('gem_ChromeSnippetRoot');

const googleSearchPlace = document.querySelector('.s6JM6d');
googleSearchPlace?.prepend(root);

const googleContents = document.querySelector('.crJ18e')?.children?.[0];
const roleList = Array.from(googleContents?.children) as HTMLElement[];
const allTopic = roleList?.[0]?.firstChild?.firstChild as HTMLDivElement;

const isAllTopicSelected = Boolean(allTopic?.hasAttribute('selected'));

if (isAllTopicSelected) {
  // @ts-ignore
  genCodeSnippet({ root });
}

const setupForceButton = () => {
  const eraseIcon = document.querySelector<HTMLDivElement>('.BKRPef');
  const forceButton = document.createElement('button');

  forceButton.setAttribute('title', 'Generate Code Snippet');
  forceButton.classList.add('XDyW0e', 'gem_HoverSpin');
  forceButton.innerHTML = /*html*/ `<svg width="44" height="44" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 6.72168C11.9704 8.53645 13.4635 10.0296 15.2783 11C13.4635 11.9704 11.9704 13.4635 11 15.2783C10.0296 13.4635 8.53643 11.9704 6.72166 11C8.53643 10.0296 10.0296 8.53645 11 6.72168Z"
      stroke="#C4C7C5" stroke-width="2.44444" />
  </svg>`;

  forceButton.onclick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    // @ts-ignore
    genCodeSnippet({ root });
  };

  eraseIcon.insertAdjacentElement('afterend', forceButton);
};

setupForceButton();
