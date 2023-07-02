"use strict";

import "./popup.css";

(function () {
  async function setupCounter() {
    let { enableCleanBird } = await chrome.storage.local.get("enableCleanBird");

    if (typeof enableCleanBird == "undefined") enableCleanBird = true;

    document.getElementById("toggleButton").innerText = enableCleanBird ? "Disable" : "Enable";
    
    document.getElementById("toggleButton").addEventListener("click", async () => {
      let { enableCleanBird } = await chrome.storage.local.get("enableCleanBird");
      console.log("enableCleanBird", enableCleanBird);
      if (typeof enableCleanBird == "undefined") enableCleanBird = true;
      document.getElementById("toggleButton").innerText = !enableCleanBird ? "Disable" : "Enable";
      chrome.storage.local.set({
        enableCleanBird: !enableCleanBird,
      });
    });
  }

  document.addEventListener("DOMContentLoaded", setupCounter());
})();
