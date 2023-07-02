"use strict";

import _ from "lodash";
import "./popup.css";

// actual extension-code
async function startExtension() {
  function getAllTweets() {
    const tweets = document.querySelectorAll('[data-testid="tweet"]');
    return tweets;
  }
  function cleanTweets(data) {
    const tweets = getAllTweets();
    Array.from(tweets).map(tweet => {
      try {
        const tweetText = tweet.querySelector('[data-testid="tweetText"]').innerHTML;
        const tweetAuthorUsername = tweet.querySelector("[data-testid^='UserAvatar-Container-']").dataset.testid.replace("UserAvatar-Container-", "");
  
        let textFound = _.some(data.text_content, function(keyword) {
            let keywordArray = keyword.toLowerCase().split(' ');
            return _.every(keywordArray, function(keyword) {
              return _.includes(tweetText, keyword);
            });
        });
  
        let authorFound = _.some(data.user_list, function(username) {
            return _.includes(tweetAuthorUsername.toLowerCase(), username.toLowerCase());
        });

        console.log("textFound", textFound, "authorFound", authorFound);
  
        if(textFound || authorFound) {
          tweet.parentElement.parentElement.parentElement.style.display = "none"
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    })
  }
  addEventListener("DOMContentLoaded", async () => {
    const data = await fetch("chrome-extension://jegnhcbblinfhmggcdccoecdiihkfipn/block-list.json").then(res => res.json())
    const cleanInterval = setInterval(() => {cleanTweets(data)}, 500);
  })
}

startExtension()