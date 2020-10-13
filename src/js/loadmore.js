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