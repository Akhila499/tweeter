/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//import * as timeago from 'timeago.js';

$(document).ready(function() {

 const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
  for(let tweet of tweets){
    // calls createTweetElement for each tweet
    let $temp = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweet-container-id').append($temp);
  }
};

  const createTweetElement = function(tweet) {
  
    let username = tweet.user.name;
    let useravatars = tweet.user.avatars;
    let userid = tweet.user.handle;
    let textareaText = tweet.content.text;
    let timeOfPost = tweet.created_at;
    //let timeout = timeago.render(timeOfPost);
    const date1 = new Date();
    const date2 = new Date(timeOfPost);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    //console.log(diffTime + " milliseconds");
    //console.log(diffDays + " days");
    const $tweet = `
          <article>
            <div class="userinfo"><img src='${useravatars}'/> <span class="user-name">${username}</span><span class='user-id'>${userid}</span></div>
            <textarea name="text" id="" placeholder="">${textareaText}</textarea>
            <div>
              <span class="postedtime">${diffDays} days ago</span> 
              <span class='tweetericons'>
                <i class="fas fa-flag"></i>︁<i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
              </span>
            </div>

          </article>`;
    return $tweet;
  };

  renderTweets(data);
  
  //loading tweets from localhost:8080/tweets/



});
