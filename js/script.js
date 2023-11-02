// Accordian
$(document).ready(function(){
    $('.accordion-content').hide();

    // Event listener for accordion headers
    $('.accordion-header').click(function() {
        var container = $(this).closest('.accordion-container');
        var content = $(this).next('.accordion-content');

        container.find('.accordion-content').not(content).slideUp();
        content.slideToggle();
    });
});


// Tabbed Content
function openTab(evt, tabName) {
    $(".tabcontent").css('display', 'none');
  
    $(".tablinks").removeClass('active');
  
    $("#" + tabName).css('display', 'block');
    $(evt.currentTarget).addClass('active');
}
  
  