chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log("TabURL:", tab.url);
    // When the tab is fully loaded, inject the content script
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["contentScript.js"]
    }, () => {
      console.log("Content script injected after page load.");
    });
  }
});