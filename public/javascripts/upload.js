$(document).ready(function() {
  var formData = new FormData();
  $('#submitBtn').on('click', function(event) {
    var title = $('#inputTitle').val();
    var detail = $('#inputDetail').val();
    var time = $('#inputTime').val();

    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('time', time);
    // console.log(formData)
    $.ajax('/upload', {
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
      error: function(xhr, error) {
        console.log('upload failed');
        formData = new FormData();
      },
      success: function(response) {
        console.log('upload success', response);
        formData = new FormData();
      }
    });
  })

  $('#uploadZone').on('drop', function(event) {
    console.log("drop触发")
    var file = event.originalEvent.dataTransfer.files[0];
    $('#file-name').text("文件名称:" + file.name);
    $('#file-size').text("文件大小:" + file.size);
    formData.append('file', file);
    return false;
  }).on('dragover', function(event) {
    return false;
  });
})
