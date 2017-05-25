$(document).ready(function() {

  $(".left-choose-menu-layout").hide();
  $(".left-choose-menu").click(function() {
    var id = $(this).attr("id");
    console.log(id);
    if (!$(".file-" + id).hasClass("menu-checked")) {
      $(".menu-checked").animate({
        height: "toggle"
      });
      $(".menu-checked").removeClass("menu-checked");
      $(".file-" + id).each(function() {
        $(this).animate({
          height: "toggle"
        });
        $(this).addClass("menu-checked");

        $(this).children().click(function() {
          $(".menu-checked").animate({
            height: "toggle"
          });
          $(".menu-checked").removeClass("menu-checked");
          // 跳转页面
          //console.log("click", $(this));
          var fileId = $(this).attr("id");
          $.ajax({
            url: '/test',
            data: {
              id: id,
              fileId: fileId
            },
            success: function() {
              console.log('success');
              window.location.href = '/test?id=' + id + '&fileId=' + fileId;
            },
            dataType: "text"
          });
        });
      });
    }
  });
});
