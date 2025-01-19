const skipIntroToggle = document.getElementById("skipIntro");
const nextEpisodeToggle = document.getElementById("nextEpisode");
const skipRecapToggle = document.getElementById("skipRecap");

function updateSetting(key, value) {
  chrome.storage.local.set({ [key]: value });
}

function sendMessage(action, value, retry = 3) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].url.includes("netflix.com")) {
      chrome.tabs.sendMessage(tabs[0].id, { action, value }, (response) => {
        if (chrome.runtime.lastError) {
          if (retry > 0) {
            setTimeout(() => sendMessage(action, value, retry - 1), 500);
          } else {
            console.error(chrome.runtime.lastError.message);
          }
        }
      });
    }
  });
}

skipIntroToggle.addEventListener("change", (event) => {
  updateSetting("skipIntro", event.target.checked);
  console.log("toggleSkipIntro", event.target.checked);
  sendMessage("toggleSkipIntro", event.target.checked);
});

nextEpisodeToggle.addEventListener("change", (event) => {
  updateSetting("nextEpisode", event.target.checked);
  console.log("toggleNextEpisode", event.target.checked);
  sendMessage("toggleNextEpisode", event.target.checked);
});
skipRecapToggle.addEventListener("change", (event) => {
  updateSetting("skipRecap", event.target.checked);
  console.log("toggleSkipRecap", event.target.checked);
  sendMessage("toggleSkipRecap", event.target.checked);
});
chrome.storage.local.get(["skipIntro", "nextEpisode"], (result) => {
  skipIntroToggle.checked = result.skipIntro !== false;
  nextEpisodeToggle.checked = result.nextEpisode !== false;
  skipRecapToggle.checked = result.skipRecap !== false;
  sendMessage("toggleSkipIntro", skipIntroToggle.checked);
  sendMessage("toggleNextEpisode", nextEpisodeToggle.checked);
  sendMessage("toggleSkipRecap", skipRecapToggle.checked);
});
