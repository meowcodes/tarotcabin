
//show input when add button is clicked
$(".add-btn").click(function(event){
  $("input").addClass("show");
  event.stopPropagation;
});
// hide input when clicked outside of add-div
$(document).click(function(event){
  if($(event.target).parents(".add-div").length === 0){
    $("input").removeClass("show");
  }
});

// remove parent item when remove-btn is clicked
// $("ul").on("click", ".remove-item", function(event) {
//   $(this).parent().remove();
//   event.stopPropagation;
// });

// add new keyword when 'enter' is pressed
$(".keyword-input").keypress(function(event) {
  if (event.key === "Enter"){
    $('button[type=submit] .default').click();
    // console.log($(this).val(), this.value);
    // var inputText = $(this).val();
    // $(".keywords-list").append('<li><span>' + inputText + '</span><span class="remove-item"><i class="fas fa-times-circle"></i></span></li>');
  }
});

// show up button when scrolled down
$(window).scroll(function() {
  var deckNav = $("#deck-nav").height();
  if($(this).scrollTop()>=deckNav){
    document.getElementById("upBtn").style.display = "block";
  } else {
    document.getElementById("upBtn").style.display = "none";
  }
});

function goUp(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}