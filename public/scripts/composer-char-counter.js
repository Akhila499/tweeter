$(document).ready(function() {
  // --- our code goes here ---
  console.log('$(document).ready');
  $( "#tweet-form" ).on('submit',function() {
    event.preventDefault();
    console.log('submit', event);
  });
  //code for checking the char count entered in the textarea and changing the color if it exists limit.
  $( "#tweet-text" ).on('input',function() {
    console.log('this', event);
    let enteredChar = $(this).val();
    console.log(enteredChar,enteredChar.length);
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