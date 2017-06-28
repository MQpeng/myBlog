$(document).ready(function() {
  var changePost = function() {
    console.log($("#select-major").val());
    var major = $("#select-major").val();
    var depart = $("#select-depart").val();

    if (major !== '0' || depart !== '0') {
      console.log({
        major: major.substr(6),
        depart: depart.substr(3)
      })
      $.ajax({
        type: 'POST',
        url: '/huanan',
        data: {
          major: major.substr(6),
          depart: depart.substr(3)
        },
        error: function(xhr, error) {
          console.log('upload failed');
        },
        success: function(response) {
          console.log('upload success', response);
          window.location.href = './huanan';
        },
        dataType: false
      });
    }
  };
  $("#select-major").change(changePost)
  $("#select-depart").change(changePost)
})
