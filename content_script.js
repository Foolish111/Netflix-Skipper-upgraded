let skipIntroEnabled = true;
let nextEpisodeEnabled = true;

function clickButton(dataUia) {
  const button = document.querySelector(`[data-uia="${dataUia}"]`);
  if (button) {
    button.click();
  }
}

function checkForButtons() {
  if (skipIntroEnabled) {
    clickButton("player-skip-intro");
    clickButton("player-skip-recap");
  }
  if (nextEpisodeEnabled) {
    clickButton("next-episode-seamless-button-draining");
    clickButton("next-episode-seamless-button");
  }
}

setInterval(checkForButtons, 500);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSkipIntro") {
    skipIntroEnabled = request.value;
  }
  if (request.action === "toggleNextEpisode") {
    nextEpisodeEnabled = request.value;
  }
  sendResponse({ success: true });
});
