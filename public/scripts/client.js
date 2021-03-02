const setDay = function (created_at) {
  ms = Date.now() - created_at
  days = Math.floor(ms / (24 * 60 * 60 * 1000)); //how many days ago tweet was executed
  return days;
};

const createTweetElement = function (tweet) {
  const $newTweet = $("<article>"); //tag for new tweets
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
  $('#submit-tweet').submit(function (event) {
    event.preventDefault(); //stopping the form submit button from executing
    const serializeData = $(this).serialize() //encodes form elements into string
    if (serializeData.length > 145) { //conditionals for error message
      $("div.err-border").show().slideDown("slow").html(`
      <h3 class="error">
      <em class='fas fa-times'></em>
      Over character limt
      <em class='fas fa-skull-crossbones'></em>
      </h3>`
      )
    } else if (serializeData.length <= 5) {
      $("div.err-border").show().slideDown("slow").html(`
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
          $("div.err-border").hide()
          $("#resetcounter").html('140');
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
        renderTweets(result);
      });
  };
  loadtweets();

  $('.writetweet').on('click', function () {
    $('#tweet-text').val('');
    $('#tweet-text').focus()
});
});


