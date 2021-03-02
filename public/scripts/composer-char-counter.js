$(document).ready(function() {
  $("#tweet-text").on('input', function() {//accessing parent node and starting an event which takes place in the DOM
    let charLimit = 140 - $(this).val().length;
    let counter = $("#resetcounter") //traversing through the html document to access the value
    counter.html(charLimit); //accessing the contents of that value
    if(charLimit < 0) {
    counter.removeClass("counter").addClass("overcount") //implementing css to adhere to the conditional
    } else{
      counter.removeClass("overcount").addClass("counter")
    }
  })
}); 




