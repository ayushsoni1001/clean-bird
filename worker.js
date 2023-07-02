const _ =  require("lodash");

let tweetText = "But most people are stuck in beginner mode. Here are 9 ChatGPT Frameworks to master Prompt Engineering: Thread ".toLowerCase();

let textFound = _.some(["Here are thread"], function(keyword) {
  let keywordArray = keyword.toLowerCase().split(' ');
  return _.every(keywordArray, function(keyword) {
    return _.includes(tweetText, keyword);
  });
});


console.log("textFound", textFound);