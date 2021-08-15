/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//import * as timeago from 'timeago.js';

$(document).ready(function() {
  
  //loading tweets from localhost:8080/tweets/
  const loadTweets = function() {
    const url = `http://localhost:8080/tweets`;
    $.ajax(url, { method: 'GET' })
      .then(function (data) {
        renderTweets(data);
      });
  };
  loadTweets();
  
  const renderTweets = function(tweets) {
  // loops through tweets
    $('#tweet-container-id').empty();
    for(let tweet of tweets) {
      // calls createTweetElement for each tweet
      let $temp = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweet-container-id').prepend($temp);
    }
  };
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const createTweetElement = function(tweet) {
  
    let username = tweet.user.name;
    let useravatars = tweet.user.avatars;
    let userid = tweet.user.handle;
    let textareaText = tweet.content.text;
    let timeOfPost = tweet.created_at;
    let timeout = timeago.format(timeOfPost);

    const $tweet = `
          <article>
            <div class="userinfo"><img src='${useravatars}'/> <span class="user-name">${username}</span><span class='user-id'>${userid}</span></div>
            <p>${escape(textareaText)}</p>
            <div>
              <span class="postedtime">${timeout}</span> 
              <span class='tweetericons'>
                <i class="fas fa-flag"></i>︁<i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
              </span>
            </div>

          </article>`;
    return $tweet;
  };
  
  
  $("#tweet-form").on('submit',function(event) {
    $postdata = $(this).serialize();
    console.log($postdata);
    
    event.preventDefault();
    
    //checking whether the input is empty or null or longer than the 140 charectors
    let validationInput = $("#tweet-text").val();
    if (!validationInput) {
      //display if error
      $('.isa_error').css({'display':'block'});
      // hide error message after 3 sec
      setTimeout(function() {
        $('.isa_error').css({'display':'none'});
      }, 3000);
      return
    }
    if (validationInput.length > 140) {
      //display if error
      $('.isa_notinlimit').css({'display':'block'});
      // hide error message after 3 sec
      setTimeout(function() {
        $('.isa_notinlimit').css({'display':'none'});
      }, 3000);
      return
    }
      
    if (validationInput) {
      //display if success
      $('.isa_success').css({'display':'block'});
      // hide error message after 3 sec
      setTimeout(function() {
        $('.isa_success').css({'display':'none'});
      }, 3000);
    }
    
    

    $url = $(this).attr('action');

    $.ajax({
      type: 'POST',
      url: $url,
      data:$postdata,
      success: function(data) {
        loadTweets(data);
        //empty the post
        $('#tweet-text').val('');
        $(".counter").val(140);

      }
    });
    
  });
  
  // /scroll back up
  $(".scroll-top").click(function() {
    $("html, body").animate({ 
        scrollTop: 0 
    }, "slow");
    return false;
  });
  
});
