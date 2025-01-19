let skipIntroEnabled = true;
let nextEpisodeEnabled = true;
let skipRecapEnabled= true;

function clickButton(dataUia) {
  const button = document.querySelector(`[data-uia="${dataUia}"]`);
  if (button) {
    button.click();
  }
}

function checkForButtons() {
  if (skipIntroEnabled) {
    clickButton("player-skip-intro");
  }
  if (nextEpisodeEnabled) {
    clickButton("next-episode-seamless-button-draining");
    clickButton("next-episode-seamless-button");
  }
  if (skipRecapEnabled){
    clickButton("player-skip-recap");
  }
}

setInterval(checkForButtons, 1000);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSkipIntro") {
    skipIntroEnabled = request.value;
  }
  if (request.action === "toggleNextEpisode") {
    nextEpisodeEnabled = request.value;
  }
  if (request.action === "toggleSkipRecap") {
    skipRecapEnabled = request.value;
  }
  sendResponse({ success: true });
});
