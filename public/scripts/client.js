/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }
]

const createTweetElement = function (tweet) {
  const $newTweet = $("<article>");
  const html = `
    <header>
      <i class='far fa-grin-beam'></i>
      <h4>${tweet.user.name}</h4>
      <span class="tooltiptext">${tweet.user.handle}</span>
      <p> ${tweet.content.text}</p>
    </header>
    <footer>
      <p>${tweet.created_at}</p>
      <i class='fas fa-thumbs-up'></i>
      <i class='fas fa-comment'></i>
      <i class='fa fa-flag'></i>
    </footer>
    `
  let tweetElement = $newTweet.append(html);
  return tweetElement;
}

const renderTweets = function (tweets) {
  $('#container').empty();
  for (let tweet of tweets) {
    const formattedTweet = createTweetElement(tweet);
    $('#container').append(formattedTweet);
  }
  return;
}

$(document).ready(function () {
  renderTweets(tweetData);
  $('#submit-tweet').submit(function (event) {
    event.preventDefault();
    console.log($(this).serialize())
    const serializeData = $(this).serialize()
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializeData
    }).then(function (result) {
      console.log("made it here", result);
    })
  });

  const loadtweets = function (){
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "JSON",
      //success: alert("success")
     })
    .then(function (result) {
      renderTweets(result)
      
  });
  };

  loadtweets();

})


