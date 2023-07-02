"use strict";

function addScript(src) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL(src);
    (document.body || document.head || document.documentElement).appendChild(script);
}

let { enableCleanBird } = chrome.storage.local.get("enableCleanBird").then(({enableCleanBird}) => {
    if(typeof enableCleanBird == "undefined") enableCleanBird = true;
    
    if(enableCleanBird == true) {
        addScript("extension.js");
    } else {
        console.log("Extension disabled");
    }
})

