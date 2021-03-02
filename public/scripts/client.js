/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  
// Subtract one day in milliseconds (oneDayMs) times the tweets length minus the current index.
// This keeps the newest tweets at the bottom, and allows for further tweets to be added.

const setDay = function (created_at) {
  ms = Date.now() - created_at
  days = Math.floor(ms / (24*60*60*1000));
  return days;
};

// $( "button" ).click(function() {
//   $( "fas fa-times" ).remove();
// type="submit"

const createTweetElement = function (tweet) {
  const $newTweet = $("<article>");
  const saveChar = $("<p>").text(tweet.content.text); //prevents cross-site scripting
  const header = `
    <header>
      <em class='far fa-grin-beam'></em>
      <h4>${tweet.user.name}</h4>
      <span class="tooltiptext">${tweet.user.handle}</span>
    </header>
    `
  const footer = `
    <footer>
      <div>${setDay(tweet.created_at)} days ago</div>
      <div class="icons">
      <em class='fas fa-thumbs-up'></em>
      <em class='fas fa-comment'></em>
      <em class='fa fa-flag'></em>
      </div>
    </footer>
    `
  let tweetElement = $newTweet.append(header).append(saveChar).append(footer); //inserts html content as placeholder for tweets

  return tweetElement;
}

const renderTweets = function (tweets) {
  $('#container').empty(); //removes inputted callbacks
  for (let tweet of tweets) {
    const formattedTweet = createTweetElement(tweet);
    $('#container').prepend(formattedTweet); //accessed data obj to format outputted tweets
  }
  return;
}

$(document).ready(function () {
  // renderTweets(tweetData);
  $('#submit-tweet').submit(function (event) {
    event.preventDefault(); //stopping the form submit button from executing
    const serializeData = $(this).serialize() //encodes form elements into string
    if (serializeData.length > 145) {
      $( "div.err-border" ).slideDown("slow").html(`
      <h3 class="error">
      <em class='fas fa-times'></em>
      Tweet exceeded 140 character limit
      <em class='fas fa-skull-crossbones'></em>
      </h3>`
      )
    } else if (serializeData.length <= 5) {
      $( "div.err-border" ).slideDown("slow").html(`
      <h3 class="error">
      <em class='fas fa-times'></em>
      No tweet detected
      <em class='fas fa-skull-crossbones'></em>
      </h3>`
      )
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: serializeData,
        success: function () {
          $('#tweet-text').val(''); //clears text box
          loadtweets();//calling function to add text without page refresh
        }
      })
    }
  });

  const loadtweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "JSON",
    })
      .then(function (result) {
        renderTweets(result)
      });
  };
  loadtweets();
})


