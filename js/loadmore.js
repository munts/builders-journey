/*!
 * One Confluence - WordPress Theme
 * Loadmore script
 */
;(function($, window, undefined){
var ppp = 8; // Post per page
var pageNumber = 1;


function load_posts(){
    pageNumber++;
    var str = '&pageNumber=' + pageNumber + '&ppp=' + ppp + '&action=more_post_ajax';
    $.ajax({
        type: "POST",
        dataType: "html",
        url: ajax_posts.ajaxurl,
        data: str,
        success: function(data){
            var $data = $(data);
            if($data.length){
                $("#podContent").append($data);
                $("#more_posts").attr("disabled",false);
            } else{
                $("#more_posts").attr("disabled",true);
                // $("#more_posts").addClass("remove");
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
        }

    });
    return false;
}

$("#more_posts").on("click",function(){ // When btn is pressed.
    $("#more_posts").attr("disabled",true); // Disable the button, temp.
    load_posts();
    $(this).insertAfter('#podContent'); // Move the 'Load More' button to the end of the the newly added posts.
});

}(jQuery, window));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsb2FkbW9yZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIE9uZSBDb25mbHVlbmNlIC0gV29yZFByZXNzIFRoZW1lXG4gKiBMb2FkbW9yZSBzY3JpcHRcbiAqL1xuOyhmdW5jdGlvbigkLCB3aW5kb3csIHVuZGVmaW5lZCl7XG52YXIgcHBwID0gODsgLy8gUG9zdCBwZXIgcGFnZVxudmFyIHBhZ2VOdW1iZXIgPSAxO1xuXG5cbmZ1bmN0aW9uIGxvYWRfcG9zdHMoKXtcbiAgICBwYWdlTnVtYmVyKys7XG4gICAgdmFyIHN0ciA9ICcmcGFnZU51bWJlcj0nICsgcGFnZU51bWJlciArICcmcHBwPScgKyBwcHAgKyAnJmFjdGlvbj1tb3JlX3Bvc3RfYWpheCc7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiBcImh0bWxcIixcbiAgICAgICAgdXJsOiBhamF4X3Bvc3RzLmFqYXh1cmwsXG4gICAgICAgIGRhdGE6IHN0cixcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICB2YXIgJGRhdGEgPSAkKGRhdGEpO1xuICAgICAgICAgICAgaWYoJGRhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAkKFwiI3BvZENvbnRlbnRcIikuYXBwZW5kKCRkYXRhKTtcbiAgICAgICAgICAgICAgICAkKFwiI21vcmVfcG9zdHNcIikuYXR0cihcImRpc2FibGVkXCIsZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICQoXCIjbW9yZV9wb3N0c1wiKS5hdHRyKFwiZGlzYWJsZWRcIix0cnVlKTtcbiAgICAgICAgICAgICAgICAvLyAkKFwiI21vcmVfcG9zdHNcIikuYWRkQ2xhc3MoXCJyZW1vdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yIDogZnVuY3Rpb24oanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAkbG9hZGVyLmh0bWwoanFYSFIgKyBcIiA6OiBcIiArIHRleHRTdGF0dXMgKyBcIiA6OiBcIiArIGVycm9yVGhyb3duKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4kKFwiI21vcmVfcG9zdHNcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7IC8vIFdoZW4gYnRuIGlzIHByZXNzZWQuXG4gICAgJChcIiNtb3JlX3Bvc3RzXCIpLmF0dHIoXCJkaXNhYmxlZFwiLHRydWUpOyAvLyBEaXNhYmxlIHRoZSBidXR0b24sIHRlbXAuXG4gICAgbG9hZF9wb3N0cygpO1xuICAgICQodGhpcykuaW5zZXJ0QWZ0ZXIoJyNwb2RDb250ZW50Jyk7IC8vIE1vdmUgdGhlICdMb2FkIE1vcmUnIGJ1dHRvbiB0byB0aGUgZW5kIG9mIHRoZSB0aGUgbmV3bHkgYWRkZWQgcG9zdHMuXG59KTtcblxufShqUXVlcnksIHdpbmRvdykpOyJdLCJmaWxlIjoibG9hZG1vcmUuanMifQ==
