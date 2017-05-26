$(document).ready(function() {
  $("#layout-right").scroll(function() {
    var progress =
      $(this).context.scrollTop / ($(this).context.scrollHeight - $(this).context.offsetHeight);
    if (progress >= 1) {
      progress = 1;
    }
    var width = document.body.clientWidth * progress;
    console.log(width);
    $("#layout-progress").width(width);
  });
});
