$('a').on('click', function(e){
    e.preventDefault();
    var targetID = $(this).attr('href')
    var elementPosition = $(targetID).offset().top
    $('html,body').animate({scrollTop: elementPosition},'slow');
}); 