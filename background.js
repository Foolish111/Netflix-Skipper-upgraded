chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
      changeInfo.status === "complete" &&
      tab.url &&
      tab.url.includes("netflix.com")
    ) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content_script.js"],
      });
    }
  });
  