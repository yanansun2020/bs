
$(document).ready(function () {
    $('body').find("*").each(function () {
        /*var replace_str = $(this).html();*/
        $(this).html( $(this).html().replace(/Chrome/g,"Firefox") );
        /*alert(replace_str);*/
    })
    var imgURL = "https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo-word-hor-sm.5622edbdf02d.png";
    $('#logo a img').attr("src", imgURL);

});

