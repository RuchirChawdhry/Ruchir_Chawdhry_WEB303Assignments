// WEB303 Assignment 2
// Name: Ruchir Chawdhry

$(document).ready(function() {
  $('#content-wrapper a').on('click', function(e) {
      e.preventDefault(); // Prevent the default action of the link

      let id = $(this).attr('id'); // Get the ID of the clicked link
      let url = `${id}.html`; // Construct the URL

      // Using native XMLHttpRequest for AJAX, as per instruction
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              // First, hide and clear the content
              $('#content').hide().html('');

              // Set the new content and animate it in
              $('#content').html(xhr.responseText).fadeIn(1000);
          }
      };
      xhr.send();
  });
});
