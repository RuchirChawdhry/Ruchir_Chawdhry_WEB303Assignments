
// method for the $.getJSON request
function getJSONTeamData() {
    $.getJSON("team.json", function(data) {
      // $.each() method to loop through the elements of the array
      $.each(data, function(index, teamMember) {
        // insert the name, position, and bio into the div#team
        $('#team').append('<h2>' + teamMember.name + '</h2>');
        $('#team').append('<h5>' + teamMember.position + '</h5>');
        $('#team').append('<p>' + teamMember.bio + '</p>');
      });
    });
}
  
  // method for the $.ajax request
function ajaxTeamData() {
  $.ajax({
    type: "GET",
    url: "team.json",
    // callback that runs before you send the ajax request
    beforeSend: function() {
      // display the text "Loading..." in the div#team
      $('#team').html("Loading...");
    },
    success: function(data) {
      // delay the content being displayed on the page for 3 seconds
      setTimeout(function() {
        $('#team').empty(); 

        $.each(data, function(index, teamMember) {
          $('#team').append('<h2>' + teamMember.name + '</h2>');
          $('#team').append('<h5>' + teamMember.position + '</h5>');
          $('#team').append('<p>' + teamMember.bio + '</p>');
        });
      }, 3000);
    },
    // error callback
    error: function() {
      $('#team').html("error... the content could not be retrieved...");
    }
  });
}
  
$(document).ready(function() {
  ajaxTeamData();
});
  