// your chrome API use cases (not include DOM manipulation here)

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'injectInterfaceIcons') {
    chrome.scripting.insertCSS({
      target: { tabId: sender.tab.id },
      files: ['/globals/theme/interfaceIcons.css']
    });
  }

  if (message.action === 'activeCodeHighlighting') {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['/addons/prism/prism.min.js']
    });
  }
});
