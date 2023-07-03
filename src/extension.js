"use strict";

import _ from "lodash";
import "./popup.css";

// actual extension-code
async function startExtension() {
  function getAllTweets() {
    const tweets = document.querySelectorAll('[data-testid="tweet"]');
    return tweets;
  }
  function cleanTweets(blockList) {
    const tweets = getAllTweets();
    Array.from(tweets).map(tweet => {
      try {
        const tweetText = tweet.querySelector('[data-testid="tweetText"]').innerHTML;
        const tweetAuthorUsername = tweet.querySelector("[data-testid^='UserAvatar-Container-']").dataset.testid.replace("UserAvatar-Container-", "");
  
        let textFound = _.some(blockList.text_content, function(keyword) {
            let keywordArray = keyword.toLowerCase().split(' ');
            return _.every(keywordArray, function(keyword) {
              return _.includes(tweetText, keyword);
            });
        });
  
        let authorFound = _.some(blockList.user_list, function(username) {
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
    const blockList = {
      "text_content": [
        "most useful AI tools",
        "mind-blowing AI websites",
        "Here are ChatGPT thread",
        "easy to make MONEY online",
        "Here are AI websites",
        "Here are tools",
        "chatgpt is old news",
        "here’s how",
        "99% of people don't know",
        "ways ChatGPT",
        "AI prompts",
        "chatgpt things you can do",
        "Lemme show you how",
        "here steps"
      ],
      "user_list": []
    }
    const cleanInterval = setInterval(() => {cleanTweets(blockList)}, 500);
  })
}

startExtension()