$(document).ready(function() {
  // --- our code goes here ---
  //Below function is to stop default behaviour of browser to redirect the page when clicked submit button.
  $( "#tweet-form" ).on('submit',function() {
    event.preventDefault();
    $postdata = $(this).serialize();
    $url = $(this).attr('action');
    console.log($(this).serialize());
    
    $.ajax({
      type: 'POST',
      url: $url,
      data:$postdata,
      success: function(data){
        console.log(data);
      }

    });
  });

  //code for checking the char count entered in the textarea and changing the color if it exists limit.
  $( "#tweet-text" ).on('input',function() {
    let enteredChar = $(this).val();
    let count = enteredChar.length;
    let totalcount = $(this).next('div').find('.counter');//output element
    totalcount.text(140-count);
    if(count > 140){
      totalcount.css({'color': 'red'})
    } else {
      totalcount.css({'color': 'grey'})
    }

  });


  // $( "#tweet-text" ).blur(function() {
  //   console.log('blur', event);
  // });
 
});