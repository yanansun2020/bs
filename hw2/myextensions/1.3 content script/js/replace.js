$(document).ready(function () {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
            var replaceAgainst = request.replaceAgainst;
            var replaceWith = request.replaceWith;
            var regexp = eval("/" + replaceAgainst +"/g");
            $('body').find("*").each(function () {
                $(this).html( $(this).html().replace(regexp, replaceWith) );
            })
            sendResponse({result: "replace success"});
        });
});

