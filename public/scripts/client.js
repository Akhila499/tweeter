/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//import * as timeago from 'timeago.js';

$(document).ready(function() {
  //loadTweets();
  const renderTweets = function(tweets) {
  // loops through tweets
    for(let tweet of tweets){
      // calls createTweetElement for each tweet
      let $temp = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweet-container-id').prepend($temp);
    }
  };

  const createTweetElement = function(tweet) {
  
    let username = tweet.user.name;
    let useravatars = tweet.user.avatars;
    let userid = tweet.user.handle;
    let textareaText = tweet.content.text;
    let timeOfPost = tweet.created_at;
    let timeout = timeago.format(timeOfPost);
    // const date1 = new Date();
    // const date2 = new Date(timeOfPost);
    // const diffTime = Math.abs(date2 - date1);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    //console.log(diffTime + " milliseconds");
    //console.log(diffDays + " days");
    const $tweet = `
          <article>
            <div class="userinfo"><img src='${useravatars}'/> <span class="user-name">${username}</span><span class='user-id'>${userid}</span></div>
            <textarea name="text" id="" placeholder="">${textareaText}</textarea>
            <div>
              <span class="postedtime">${timeout}</span> 
              <span class='tweetericons'>
                <i class="fas fa-flag"></i>︁<i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
              </span>
            </div>

          </article>`;
    return $tweet;
  };
  
  //loading tweets from localhost:8080/tweets/
  
  const loadTweets = function(){

    const url = `http://localhost:8080/tweets`;

    $.ajax(url, { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    });
    
  };
  $( "#tweet-form" ).on('submit',function(event) {
    $postdata = $(this).serialize();
    console.log($postdata);
    event.preventDefault();
    
    //checking whether the input is empty or null or longer than the 140 charectors
    let validationInput = $( "#tweet-text" ).val();
    if(!validationInput){
      return alert('Input is invalid');
    }
    if(validationInput.length > 140){
      return alert('Input is too long');
    }
    

    $url = $(this).attr('action');
    //console.log($(this).serialize());
    
    $.ajax({
      type: 'POST',
      url: $url,
      data:$postdata,
      success: function(data){
        //console.log('inside ajax',data);
        loadTweets(data);
      }

    });
  });
  loadTweets();
});
