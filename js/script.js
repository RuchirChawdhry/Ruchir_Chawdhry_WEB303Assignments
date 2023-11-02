// Accordian
$(document).ready(function() {
    $('.accordion-header').on('click', function() {
        var content = $(this).next('.accordion-content');
        $(this).siblings('.accordion-content').slideUp();
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
  
  