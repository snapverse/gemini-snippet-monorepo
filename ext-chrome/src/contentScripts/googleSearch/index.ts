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
