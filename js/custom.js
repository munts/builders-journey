/*!
 * One Confluence - WordPress Theme
 *
 */
;(function($, window, undefined){
    /**
     * Check a href for an anchor. If exists, and in document, scroll to it.
     * If href argument ommited, assumes context (this) is HTML Element,
     * which will be the case when invoked by jQuery after an event
     */
    function scroll_if_anchor(href) {
        href = typeof(href) == "string" ? href : $(this).attr("href");

        // You could easily calculate this dynamically if you prefer
        var fromTop = 0;

        // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
        // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
        if(href.indexOf("#") == 0  && href != '#myModal') {
            var $target = $(href);

            // Older browser without pushState might flicker here, as they momentarily
            // jump to the wrong position (IE < 10)
            if($target.length) {
                $('html, body').animate({ scrollTop: $target.offset().top - fromTop }, "slow");
                if(history && "pushState" in history) {
                    history.pushState({}, document.title, window.location.pathname + href);
                    return false;
                }
            }
        }
    }

    // When our page loads, check to see if it contains and anchor
    scroll_if_anchor(window.location.hash);

// Intercept all anchor clicks

    $("body").on("click", "a", scroll_if_anchor);

    /* Magnific Popup */

    $('.gallery-item').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: { enabled:true }
        // other options
    });

    $('.projectGalleryItem').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: { enabled:true }
        // other options
    });

    /*  Scroll to top
    ------------------------------------ */
    $("a[href='#page-top']").on("click", function () {
        $("html, body").animate({scrollTop: 0}, "slow");
        //        $("html, body").animate({scrollTop: 0}, {duration: 1000});
        return false;
    });

    // Carousels
    //Init Swiper Gallery

    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })

    var ppp = 8; // Post per page
    var app = -1; // all podcast posts per page
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

// function re_load_posts(){
//     pageNumber++;
//     var str = '&pageNumber=' + pageNumber + '&ppp=' + ppp + '&action=more_post_ajax';
//     $.ajax({
//         type: "POST",
//         dataType: "html",
//         url: ajax_posts.ajaxurl,
//         data: str,
//         success: function(data){
//             var $data = $(data);
//             if($data.length){
//                 $("#podContentTitles").remove();
//                 $("#podContent").removeClass("remove").addClass("show");
//                 $("#podContent").append($data);
//                 $("#more_posts").attr("disabled",false);
//             } else{
//                 $("#more_posts").attr("disabled",true);
//                 // $("#more_posts").addClass("remove");
//             }
//         },
//         error : function(jqXHR, textStatus, errorThrown) {
//             $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
//         }

//     });
//     return false;
// }

//Load all titles so that users can scroll through just titles, but no description or play buttons...
function load_all_posts(){
    pageNumber++;
    var str = '&pageNumber=' + pageNumber + '&ppp=' + app + '&action=all_post_ajax';
    $.ajax({
        type: "POST",
        dataType: "html",
        url: ajax_posts.ajaxurl,
        data: str,
        success: function(data){
            var $data = $(data);
            if($data.length){
                $("#podContentTitles").append($data);
                $("#all_posts").attr("disabled",false);
            } else{
                $("#all_posts").attr("disabled",true);
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
        }

    });
    return false;
}
    //load more
    // on click function to invoke the load more posts ajax call.  Loads 8 more podcasts.
    $("#more_posts").on("click",function(){ // When btn is pressed.
        $("#more_posts").attr("disabled",true); // Disable the button, temp.
        load_posts();
        $(this).insertAfter('#podContent'); // Move the 'Load More' button to the end of the the newly added posts.
    });

    //search by title
    // on click function to invoke the load all posts, but just their titles via a new ajax call.  Loads all podcast titles.
    $("#all_posts").on("click",function(){ // When btn is pressed.
        $("#all_posts").attr("disabled",true); // Disable the button, temp.
        load_all_posts();
        $('#podContent').addClass('remove'); //hides the #podContent div
        $("#more_posts").addClass("remove"); //hides the Load more div/button
        //$("#more_posts").remove(); //hides the Load more div/button
        $("#all_posts").addClass("remove"); //hides the Search by Title button
        //$("#all_posts").remove(); //hides the Search by Title button
        $("#show_latest_episodes").removeClass("remove").addClass("show_button"); //displays the Show Latest Episodes button in the right sidebar(only when in Search by Title mode)
        //$("#new_more_posts").addClass("show"); //Give the Show Latest Episodes button a show class - not sure this is needed.
    });

    $("#show_latest_episodes").on("click", function () {
        //const element = $("#podContent");
        //var podcasts = $("#podContent");
        var $podcasts = $("#podContent");
        if ($("#podContent").hasClass("remove")) {
            $("#podContent").addClass("show_button");
            $("#podContentTitles").addClass("remove").removeClass("show_button");
            $("#show_latest_episodes").addClass("remove").removeClass("show_button");
            $("#show_all_posts").addClass("show_button").removeClass("remove");
            $("#load_more").addClass("show_button").removeClass("remove");
        } else {
            $("#podContent").style.display = "none";
        }
      });

      $("#show_all_posts").on("click", function () {
        $("#podContentTitles").addClass("show_button").removeClass("remove");
        $("#podContent").removeClass("show_button").addClass("remove");
        $("#show_latest_episodes").addClass("show_button").removeClass("remove");
        $("#show_all_posts").addClass("remove").removeClass("show_button");
      })

    //$("#all_posts").onclick=function(){showContent('#podContentTitles');}
 
    //toggle back to latest podcasts
    // on click function to hide the posts/podcasts by title and revert back to the posts loaded into the #podContent div
    // $("#toggle_to_more_posts").on("click",function(){ // When btn is pressed.
    //     $("#toggle_to_more_posts").attr("disabled",true);
    //     $('#podContent').removeClass("remove").addClass('show'); // Disable the button, temp.
    //     $('#podContentTitles').removeClass("show").addClass('remove'); // Disable the button, temp.
    //     $("#toggle_to_more_posts").removeClass("show").addClass("remove");
    //     //$(this).insertAfter('#sidebar_nav'); // Move the 'Load More' button to the end of the the newly added posts.
    //     $("#more_posts").removeClass("remove").addClass("show");
    //     $("#all_posts").removeClass("remove").addClass("show");
    // });

}(jQuery, window));


  
    // $("#repeat").on("click", function() {
    //   $content.append($crossButton.clone(true).removeAttr("id"));
    //   $content.append(
    //     $original.clone(true)
    //     .hide() // if sliding
    //     .attr("id",$original.attr("id")+$content.find("button.cross").length)
    //     .slideDown("slow") // does not slide much so remove if you do not like it
    //   );
    // });

    // //=====================================================================
    //
    // /* On isotope v2 hidden class is not defined.
    //  Add hidden class if item hidden, before initialising Isotope: */
    // var itemReveal = Isotope.Item.prototype.reveal;
    // Isotope.Item.prototype.reveal = function() {
    //     itemReveal.apply( this, arguments );
    //     $( this.element ).removeClass('isotope-hidden');
    // };
    // var itemHide = Isotope.Item.prototype.hide;
    // Isotope.Item.prototype.hide = function() {
    //     itemHide.apply( this, arguments );
    //     $( this.element ).addClass('isotope-hidden'); };
    //
    // //=======================================
// jQuery(function ($) {
// // initialize Isotope after all images have loaded
//     var $container = $('#podcasts').imagesLoaded( function() { //The ID for the list with all the blog posts
//         $container.isotope({ //Isotope options, 'item' matches the class in the PHP
//             itemSelector : '.podcast',
//             layoutMode: 'vertical'
//             /*grid: {
//                 columnWidth: 200
//             }*/
//         });
//     });
//
//     //Add the class selected to the item that is clicked, and remove from the others
//     var $optionSets = $('#filters'),
//         $optionLinks = $optionSets.find('a');
//
//     $optionLinks.click(function(){
//         var $this = $(this);
//         // don't proceed if already selected
//         if ( $this.hasClass('selected') ) {
//             return false;
//         }
//         var $optionSet = $this.parents('#filters');
//         $optionSets.find('.selected').removeClass('selected');
//         $this.addClass('selected');
//
//         //When an item is clicked, sort the items.
//         var selector = $(this).attr('data-filter');
//         $container.isotope({ filter: selector });
//
//         return false;
//     });
//
// });

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdXN0b20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBPbmUgQ29uZmx1ZW5jZSAtIFdvcmRQcmVzcyBUaGVtZVxuICpcbiAqL1xuOyhmdW5jdGlvbigkLCB3aW5kb3csIHVuZGVmaW5lZCl7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBhIGhyZWYgZm9yIGFuIGFuY2hvci4gSWYgZXhpc3RzLCBhbmQgaW4gZG9jdW1lbnQsIHNjcm9sbCB0byBpdC5cbiAgICAgKiBJZiBocmVmIGFyZ3VtZW50IG9tbWl0ZWQsIGFzc3VtZXMgY29udGV4dCAodGhpcykgaXMgSFRNTCBFbGVtZW50LFxuICAgICAqIHdoaWNoIHdpbGwgYmUgdGhlIGNhc2Ugd2hlbiBpbnZva2VkIGJ5IGpRdWVyeSBhZnRlciBhbiBldmVudFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNjcm9sbF9pZl9hbmNob3IoaHJlZikge1xuICAgICAgICBocmVmID0gdHlwZW9mKGhyZWYpID09IFwic3RyaW5nXCIgPyBocmVmIDogJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblxuICAgICAgICAvLyBZb3UgY291bGQgZWFzaWx5IGNhbGN1bGF0ZSB0aGlzIGR5bmFtaWNhbGx5IGlmIHlvdSBwcmVmZXJcbiAgICAgICAgdmFyIGZyb21Ub3AgPSAwO1xuXG4gICAgICAgIC8vIElmIG91ciBIcmVmIHBvaW50cyB0byBhIHZhbGlkLCBub24tZW1wdHkgYW5jaG9yLCBhbmQgaXMgb24gdGhlIHNhbWUgcGFnZSAoZS5nLiAjZm9vKVxuICAgICAgICAvLyBMZWdhY3kgalF1ZXJ5IGFuZCBJRTcgbWF5IGhhdmUgaXNzdWVzOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8xNTkzMTc0XG4gICAgICAgIGlmKGhyZWYuaW5kZXhPZihcIiNcIikgPT0gMCAgJiYgaHJlZiAhPSAnI215TW9kYWwnKSB7XG4gICAgICAgICAgICB2YXIgJHRhcmdldCA9ICQoaHJlZik7XG5cbiAgICAgICAgICAgIC8vIE9sZGVyIGJyb3dzZXIgd2l0aG91dCBwdXNoU3RhdGUgbWlnaHQgZmxpY2tlciBoZXJlLCBhcyB0aGV5IG1vbWVudGFyaWx5XG4gICAgICAgICAgICAvLyBqdW1wIHRvIHRoZSB3cm9uZyBwb3NpdGlvbiAoSUUgPCAxMClcbiAgICAgICAgICAgIGlmKCR0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoeyBzY3JvbGxUb3A6ICR0YXJnZXQub2Zmc2V0KCkudG9wIC0gZnJvbVRvcCB9LCBcInNsb3dcIik7XG4gICAgICAgICAgICAgICAgaWYoaGlzdG9yeSAmJiBcInB1c2hTdGF0ZVwiIGluIGhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyBocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoZW4gb3VyIHBhZ2UgbG9hZHMsIGNoZWNrIHRvIHNlZSBpZiBpdCBjb250YWlucyBhbmQgYW5jaG9yXG4gICAgc2Nyb2xsX2lmX2FuY2hvcih3aW5kb3cubG9jYXRpb24uaGFzaCk7XG5cbi8vIEludGVyY2VwdCBhbGwgYW5jaG9yIGNsaWNrc1xuXG4gICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcImFcIiwgc2Nyb2xsX2lmX2FuY2hvcik7XG5cbiAgICAvL2FkZCBjbGFzcyBzdGljayB0byB0aGUgcmlnaHQgc2lkZWJhciB3aGVuIHRoZSBwb2RDb250ZW50IGNvbnRhaW5lciBnZXRzIDEwMCBwaXhlbHMgZnJvbSB0aGUgdG9wIG9mIHRoZSB3aW5kb3dcbiAgICB2YXIgZml4UmlnaHRTaWRlYmFyT25TY3JvbGwgPSBuZXcgV2F5cG9pbnQoe1xuXG4gICAgICAgICAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9kQ29udGVudCcpLFxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24gKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNyaWdodC1zaWRlYmFyJykuYWRkQ2xhc3MoJ3N0aWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNyaWdodC1zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ3VuLXN0aWNrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9mZnNldDogJzEwMCdcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICB2YXIgdW5GaXhSaWdodFNpZGViYXJPblNjcm9sbCA9IG5ldyBXYXlwb2ludCh7XG5cbiAgICAgICAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb2RDb250ZW50JyksXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNyaWdodC1zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ3N0aWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNyaWdodC1zaWRlYmFyJykuYWRkQ2xhc3MoJ3VuLXN0aWNrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9mZnNldDogJzEwMCdcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvL1doZW4gdGhlIGdhbGxlcnkgY29tZXMgaW50byB2aWV3IHVuLXN0aWNrIHRoZSByaWdodCBzaWRlYmFyXG4gICAgdmFyIEZpeFJpZ2h0U2lkZWJhck9uU2Nyb2xsMiA9IG5ldyBXYXlwb2ludCh7XG5cbiAgICAgICAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JyksXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnZG93bicpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3JpZ2h0LXNpZGViYXInKS5yZW1vdmVDbGFzcygnc3RpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3JpZ2h0LXNpZGViYXInKS5hZGRDbGFzcygndW4tc3RpY2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2Zmc2V0OiAnOTAlJ1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIHZhciB1bkZpeFJpZ2h0U2lkZWJhck9uU2Nyb2xsMiA9IG5ldyBXYXlwb2ludCh7XG5cbiAgICAgICAgICAgIGVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JyksXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNyaWdodC1zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ3VuLXN0aWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNyaWdodC1zaWRlYmFyJykuYWRkQ2xhc3MoJ3N0aWNrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9mZnNldDogJzkwJSdcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvL3RoZXNlIHR3byB3YXlwb2ludHMgYXJlIGZvciB0aGUgUG9kY2FzdCB0d28gY29sdW1uIGlucnRlcmlvciBwYWdlcy4gIFdoZW4gZm9vdGVyIGNvbWVzIGludG8gdmlldyB1bi1zdGljayB0aGUgcmlnaHQgc2lkZWJhclxuICAgIHZhciBGaXhSaWdodFNpZGViYXJPblNjcm9sbDMgPSBuZXcgV2F5cG9pbnQoe1xuXG4gICAgICAgICAgICBlbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHVycG9zZS1ib3R0b20nKSxcbiAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xuICAgICAgICAgICAgICAgICAgICAkKCcjcmlnaHQtc2lkZWJhcicpLnJlbW92ZUNsYXNzKCdzdGljaycpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjcmlnaHQtc2lkZWJhcicpLmFkZENsYXNzKCd1bi1zdGljaycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvZmZzZXQ6ICc5MCUnXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgdmFyIHVuRml4UmlnaHRTaWRlYmFyT25TY3JvbGwzID0gbmV3IFdheXBvaW50KHtcblxuICAgICAgICAgICAgZWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3B1cnBvc2UtYm90dG9tJyksXG4gICAgICAgICAgICBoYW5kbGVyOiBmdW5jdGlvbiAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAndXAnKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNyaWdodC1zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ3VuLXN0aWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNyaWdodC1zaWRlYmFyJykuYWRkQ2xhc3MoJ3N0aWNrJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9mZnNldDogJzkwJSdcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvKiBNYWduaWZpYyBQb3B1cCAqL1xuXG4gICAgJCgnLmdhbGxlcnktaXRlbScpLm1hZ25pZmljUG9wdXAoe1xuICAgICAgICBkZWxlZ2F0ZTogJ2EnLCAvLyBjaGlsZCBpdGVtcyBzZWxlY3RvciwgYnkgY2xpY2tpbmcgb24gaXQgcG9wdXAgd2lsbCBvcGVuXG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIGNsb3NlT25Db250ZW50Q2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlQnRuSW5zaWRlOiBmYWxzZSxcbiAgICAgICAgZ2FsbGVyeTogeyBlbmFibGVkOnRydWUgfVxuICAgICAgICAvLyBvdGhlciBvcHRpb25zXG4gICAgfSk7XG5cbiAgICAkKCcucHJvamVjdEdhbGxlcnlJdGVtJykubWFnbmlmaWNQb3B1cCh7XG4gICAgICAgIGRlbGVnYXRlOiAnYScsIC8vIGNoaWxkIGl0ZW1zIHNlbGVjdG9yLCBieSBjbGlja2luZyBvbiBpdCBwb3B1cCB3aWxsIG9wZW5cbiAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgY2xvc2VPbkNvbnRlbnRDbGljazogdHJ1ZSxcbiAgICAgICAgY2xvc2VCdG5JbnNpZGU6IGZhbHNlLFxuICAgICAgICBnYWxsZXJ5OiB7IGVuYWJsZWQ6dHJ1ZSB9XG4gICAgICAgIC8vIG90aGVyIG9wdGlvbnNcbiAgICB9KTtcblxuICAgIC8vIENhcm91c2Vsc1xuXG4gICAgJChcIiN0ZWFtIC5vd2wtY2Fyb3VzZWxcIikub3dsQ2Fyb3VzZWwoe1xuICAgICAgICBpdGVtczogMSxcbiAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgbmF2OiB0cnVlLFxuICAgICAgICBuYXZUZXh0OiBbJzxpIGNsYXNzPVwiZmEgZmEtY2FyZXQtbGVmdCBmYS0yeFwiPjwvaT48c3BhbiBjbGFzcz1cIm5leHQtcHJldiBoaWRkZW4tc20gaGlkZGVuLXhzXCI+UHJldmlvdXM8L3NwYW4+ICcsJzxzcGFuIGNsYXNzPVwibmV4dC1wcmV2IGhpZGRlbi1zbSBoaWRkZW4teHNcIj5OZXh0PC9zcGFuPjxpIGNsYXNzPVwiZmEgZmEtY2FyZXQtcmlnaHQgZmEtMnhcIj48L2k+J11cbiAgICB9KTtcblxuICAgICQoXCIjZ2FsbGVyeSAub3dsLWNhcm91c2VsXCIpLm93bENhcm91c2VsKHtcbiAgICAgICAgLy9pdGVtczogNCxcbiAgICAgICAgbWFyZ2luOiAzMCxcbiAgICAgICAgLy9hdXRvV2lkdGg6ZmFsc2UsXG4gICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICBuYXY6IHRydWUsXG4gICAgICAgIG5hdlRleHQ6IFsnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXRyaWFuZ2xlLWxlZnRcIiBzdHlsZT1cImNvbG9yOiNjNzI1NGU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtcIj48L3NwYW4+ICcsJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi10cmlhbmdsZS1yaWdodFwiIHN0eWxlPVwiY29sb3I6I2M3MjU0ZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O1wiPjwvc3Bhbj4nXSxcbiAgICAgICAgcmVzcG9uc2l2ZUNsYXNzOnRydWUsXG4gICAgICAgIHJlc3BvbnNpdmU6e1xuICAgICAgICAgICAgMDp7XG4gICAgICAgICAgICAgICAgaXRlbXM6MSxcbiAgICAgICAgICAgICAgICBuYXY6dHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDYwMDp7XG4gICAgICAgICAgICAgICAgaXRlbXM6MixcbiAgICAgICAgICAgICAgICBuYXY6dHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDEwMDA6e1xuICAgICAgICAgICAgICAgIGl0ZW1zOjQsXG4gICAgICAgICAgICAgICAgbmF2OnRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyogIFNjcm9sbCB0byB0b3BcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbiAgICAkKFwiYVtocmVmPScjcGFnZS10b3AnXVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIFwic2xvd1wiKTtcbiAgICAgICAgLy8gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIHtkdXJhdGlvbjogMTAwMH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvLyAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vXG4gICAgLy8gLyogT24gaXNvdG9wZSB2MiBoaWRkZW4gY2xhc3MgaXMgbm90IGRlZmluZWQuXG4gICAgLy8gIEFkZCBoaWRkZW4gY2xhc3MgaWYgaXRlbSBoaWRkZW4sIGJlZm9yZSBpbml0aWFsaXNpbmcgSXNvdG9wZTogKi9cbiAgICAvLyB2YXIgaXRlbVJldmVhbCA9IElzb3RvcGUuSXRlbS5wcm90b3R5cGUucmV2ZWFsO1xuICAgIC8vIElzb3RvcGUuSXRlbS5wcm90b3R5cGUucmV2ZWFsID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIGl0ZW1SZXZlYWwuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgIC8vICAgICAkKCB0aGlzLmVsZW1lbnQgKS5yZW1vdmVDbGFzcygnaXNvdG9wZS1oaWRkZW4nKTtcbiAgICAvLyB9O1xuICAgIC8vIHZhciBpdGVtSGlkZSA9IElzb3RvcGUuSXRlbS5wcm90b3R5cGUuaGlkZTtcbiAgICAvLyBJc290b3BlLkl0ZW0ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgaXRlbUhpZGUuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgIC8vICAgICAkKCB0aGlzLmVsZW1lbnQgKS5hZGRDbGFzcygnaXNvdG9wZS1oaWRkZW4nKTsgfTtcbiAgICAvL1xuICAgIC8vIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblxuXG4vLyBqUXVlcnkoZnVuY3Rpb24gKCQpIHtcbi8vIC8vIGluaXRpYWxpemUgSXNvdG9wZSBhZnRlciBhbGwgaW1hZ2VzIGhhdmUgbG9hZGVkXG4vLyAgICAgdmFyICRjb250YWluZXIgPSAkKCcjcG9kY2FzdHMnKS5pbWFnZXNMb2FkZWQoIGZ1bmN0aW9uKCkgeyAvL1RoZSBJRCBmb3IgdGhlIGxpc3Qgd2l0aCBhbGwgdGhlIGJsb2cgcG9zdHNcbi8vICAgICAgICAgJGNvbnRhaW5lci5pc290b3BlKHsgLy9Jc290b3BlIG9wdGlvbnMsICdpdGVtJyBtYXRjaGVzIHRoZSBjbGFzcyBpbiB0aGUgUEhQXG4vLyAgICAgICAgICAgICBpdGVtU2VsZWN0b3IgOiAnLnBvZGNhc3QnLFxuLy8gICAgICAgICAgICAgbGF5b3V0TW9kZTogJ3ZlcnRpY2FsJ1xuLy8gICAgICAgICAgICAgLypncmlkOiB7XG4vLyAgICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6IDIwMFxuLy8gICAgICAgICAgICAgfSovXG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH0pO1xuLy9cbi8vICAgICAvL0FkZCB0aGUgY2xhc3Mgc2VsZWN0ZWQgdG8gdGhlIGl0ZW0gdGhhdCBpcyBjbGlja2VkLCBhbmQgcmVtb3ZlIGZyb20gdGhlIG90aGVyc1xuLy8gICAgIHZhciAkb3B0aW9uU2V0cyA9ICQoJyNmaWx0ZXJzJyksXG4vLyAgICAgICAgICRvcHRpb25MaW5rcyA9ICRvcHRpb25TZXRzLmZpbmQoJ2EnKTtcbi8vXG4vLyAgICAgJG9wdGlvbkxpbmtzLmNsaWNrKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4vLyAgICAgICAgIC8vIGRvbid0IHByb2NlZWQgaWYgYWxyZWFkeSBzZWxlY3RlZFxuLy8gICAgICAgICBpZiAoICR0aGlzLmhhc0NsYXNzKCdzZWxlY3RlZCcpICkge1xuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHZhciAkb3B0aW9uU2V0ID0gJHRoaXMucGFyZW50cygnI2ZpbHRlcnMnKTtcbi8vICAgICAgICAgJG9wdGlvblNldHMuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4vLyAgICAgICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuLy9cbi8vICAgICAgICAgLy9XaGVuIGFuIGl0ZW0gaXMgY2xpY2tlZCwgc29ydCB0aGUgaXRlbXMuXG4vLyAgICAgICAgIHZhciBzZWxlY3RvciA9ICQodGhpcykuYXR0cignZGF0YS1maWx0ZXInKTtcbi8vICAgICAgICAgJGNvbnRhaW5lci5pc290b3BlKHsgZmlsdGVyOiBzZWxlY3RvciB9KTtcbi8vXG4vLyAgICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICB9KTtcbi8vXG4vLyB9KTtcbn0oalF1ZXJ5LCB3aW5kb3cpKTtcblxuIl0sImZpbGUiOiJjdXN0b20uanMifQ==

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdXN0b20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBPbmUgQ29uZmx1ZW5jZSAtIFdvcmRQcmVzcyBUaGVtZVxuICpcbiAqL1xuOyhmdW5jdGlvbigkLCB3aW5kb3csIHVuZGVmaW5lZCl7XG4gICAgLyoqXG4gICAgICogQ2hlY2sgYSBocmVmIGZvciBhbiBhbmNob3IuIElmIGV4aXN0cywgYW5kIGluIGRvY3VtZW50LCBzY3JvbGwgdG8gaXQuXG4gICAgICogSWYgaHJlZiBhcmd1bWVudCBvbW1pdGVkLCBhc3N1bWVzIGNvbnRleHQgKHRoaXMpIGlzIEhUTUwgRWxlbWVudCxcbiAgICAgKiB3aGljaCB3aWxsIGJlIHRoZSBjYXNlIHdoZW4gaW52b2tlZCBieSBqUXVlcnkgYWZ0ZXIgYW4gZXZlbnRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzY3JvbGxfaWZfYW5jaG9yKGhyZWYpIHtcbiAgICAgICAgaHJlZiA9IHR5cGVvZihocmVmKSA9PSBcInN0cmluZ1wiID8gaHJlZiA6ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cbiAgICAgICAgLy8gWW91IGNvdWxkIGVhc2lseSBjYWxjdWxhdGUgdGhpcyBkeW5hbWljYWxseSBpZiB5b3UgcHJlZmVyXG4gICAgICAgIHZhciBmcm9tVG9wID0gMDtcblxuICAgICAgICAvLyBJZiBvdXIgSHJlZiBwb2ludHMgdG8gYSB2YWxpZCwgbm9uLWVtcHR5IGFuY2hvciwgYW5kIGlzIG9uIHRoZSBzYW1lIHBhZ2UgKGUuZy4gI2ZvbylcbiAgICAgICAgLy8gTGVnYWN5IGpRdWVyeSBhbmQgSUU3IG1heSBoYXZlIGlzc3VlczogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMTU5MzE3NFxuICAgICAgICBpZihocmVmLmluZGV4T2YoXCIjXCIpID09IDAgICYmIGhyZWYgIT0gJyNteU1vZGFsJykge1xuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGhyZWYpO1xuXG4gICAgICAgICAgICAvLyBPbGRlciBicm93c2VyIHdpdGhvdXQgcHVzaFN0YXRlIG1pZ2h0IGZsaWNrZXIgaGVyZSwgYXMgdGhleSBtb21lbnRhcmlseVxuICAgICAgICAgICAgLy8ganVtcCB0byB0aGUgd3JvbmcgcG9zaXRpb24gKElFIDwgMTApXG4gICAgICAgICAgICBpZigkdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkdGFyZ2V0Lm9mZnNldCgpLnRvcCAtIGZyb21Ub3AgfSwgXCJzbG93XCIpO1xuICAgICAgICAgICAgICAgIGlmKGhpc3RvcnkgJiYgXCJwdXNoU3RhdGVcIiBpbiBoaXN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgaHJlZik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXaGVuIG91ciBwYWdlIGxvYWRzLCBjaGVjayB0byBzZWUgaWYgaXQgY29udGFpbnMgYW5kIGFuY2hvclxuICAgIHNjcm9sbF9pZl9hbmNob3Iod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuXG4vLyBJbnRlcmNlcHQgYWxsIGFuY2hvciBjbGlja3NcblxuICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCJhXCIsIHNjcm9sbF9pZl9hbmNob3IpO1xuXG4gICAgLyogTWFnbmlmaWMgUG9wdXAgKi9cblxuICAgICQoJy5nYWxsZXJ5LWl0ZW0nKS5tYWduaWZpY1BvcHVwKHtcbiAgICAgICAgZGVsZWdhdGU6ICdhJywgLy8gY2hpbGQgaXRlbXMgc2VsZWN0b3IsIGJ5IGNsaWNraW5nIG9uIGl0IHBvcHVwIHdpbGwgb3BlblxuICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICBjbG9zZU9uQ29udGVudENsaWNrOiB0cnVlLFxuICAgICAgICBjbG9zZUJ0bkluc2lkZTogZmFsc2UsXG4gICAgICAgIGdhbGxlcnk6IHsgZW5hYmxlZDp0cnVlIH1cbiAgICAgICAgLy8gb3RoZXIgb3B0aW9uc1xuICAgIH0pO1xuXG4gICAgJCgnLnByb2plY3RHYWxsZXJ5SXRlbScpLm1hZ25pZmljUG9wdXAoe1xuICAgICAgICBkZWxlZ2F0ZTogJ2EnLCAvLyBjaGlsZCBpdGVtcyBzZWxlY3RvciwgYnkgY2xpY2tpbmcgb24gaXQgcG9wdXAgd2lsbCBvcGVuXG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIGNsb3NlT25Db250ZW50Q2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlQnRuSW5zaWRlOiBmYWxzZSxcbiAgICAgICAgZ2FsbGVyeTogeyBlbmFibGVkOnRydWUgfVxuICAgICAgICAvLyBvdGhlciBvcHRpb25zXG4gICAgfSk7XG5cbiAgICAvKiAgU2Nyb2xsIHRvIHRvcFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAgICQoXCJhW2hyZWY9JyNwYWdlLXRvcCddXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCBcInNsb3dcIik7XG4gICAgICAgIC8vICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCB7ZHVyYXRpb246IDEwMDB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLy8gQ2Fyb3VzZWxzXG4gICAgLy9Jbml0IFN3aXBlciBHYWxsZXJ5XG5cbiAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcbiAgICAgICAgLy8gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBsb29wOiB0cnVlLFxuXG4gICAgICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXG4gICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgIG5leHRFbDogJy5zd2lwZXItYnV0dG9uLW5leHQnLFxuICAgICAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgdmFyIHBwcCA9IDg7IC8vIFBvc3QgcGVyIHBhZ2VcbiAgICB2YXIgYXBwID0gLTE7IC8vIGFsbCBwb2RjYXN0IHBvc3RzIHBlciBwYWdlXG4gICAgdmFyIHBhZ2VOdW1iZXIgPSAxO1xuXG5mdW5jdGlvbiBsb2FkX3Bvc3RzKCl7XG4gICAgcGFnZU51bWJlcisrO1xuICAgIHZhciBzdHIgPSAnJnBhZ2VOdW1iZXI9JyArIHBhZ2VOdW1iZXIgKyAnJnBwcD0nICsgcHBwICsgJyZhY3Rpb249bW9yZV9wb3N0X2FqYXgnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogXCJodG1sXCIsXG4gICAgICAgIHVybDogYWpheF9wb3N0cy5hamF4dXJsLFxuICAgICAgICBkYXRhOiBzdHIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgdmFyICRkYXRhID0gJChkYXRhKTtcbiAgICAgICAgICAgIGlmKCRkYXRhLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgJChcIiNwb2RDb250ZW50XCIpLmFwcGVuZCgkZGF0YSk7XG4gICAgICAgICAgICAgICAgJChcIiNtb3JlX3Bvc3RzXCIpLmF0dHIoXCJkaXNhYmxlZFwiLGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAkKFwiI21vcmVfcG9zdHNcIikuYXR0cihcImRpc2FibGVkXCIsdHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gJChcIiNtb3JlX3Bvc3RzXCIpLmFkZENsYXNzKFwicmVtb3ZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvciA6IGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgJGxvYWRlci5odG1sKGpxWEhSICsgXCIgOjogXCIgKyB0ZXh0U3RhdHVzICsgXCIgOjogXCIgKyBlcnJvclRocm93bik7XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy8gZnVuY3Rpb24gcmVfbG9hZF9wb3N0cygpe1xuLy8gICAgIHBhZ2VOdW1iZXIrKztcbi8vICAgICB2YXIgc3RyID0gJyZwYWdlTnVtYmVyPScgKyBwYWdlTnVtYmVyICsgJyZwcHA9JyArIHBwcCArICcmYWN0aW9uPW1vcmVfcG9zdF9hamF4Jztcbi8vICAgICAkLmFqYXgoe1xuLy8gICAgICAgICB0eXBlOiBcIlBPU1RcIixcbi8vICAgICAgICAgZGF0YVR5cGU6IFwiaHRtbFwiLFxuLy8gICAgICAgICB1cmw6IGFqYXhfcG9zdHMuYWpheHVybCxcbi8vICAgICAgICAgZGF0YTogc3RyLFxuLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcbi8vICAgICAgICAgICAgIHZhciAkZGF0YSA9ICQoZGF0YSk7XG4vLyAgICAgICAgICAgICBpZigkZGF0YS5sZW5ndGgpe1xuLy8gICAgICAgICAgICAgICAgICQoXCIjcG9kQ29udGVudFRpdGxlc1wiKS5yZW1vdmUoKTtcbi8vICAgICAgICAgICAgICAgICAkKFwiI3BvZENvbnRlbnRcIikucmVtb3ZlQ2xhc3MoXCJyZW1vdmVcIikuYWRkQ2xhc3MoXCJzaG93XCIpO1xuLy8gICAgICAgICAgICAgICAgICQoXCIjcG9kQ29udGVudFwiKS5hcHBlbmQoJGRhdGEpO1xuLy8gICAgICAgICAgICAgICAgICQoXCIjbW9yZV9wb3N0c1wiKS5hdHRyKFwiZGlzYWJsZWRcIixmYWxzZSk7XG4vLyAgICAgICAgICAgICB9IGVsc2V7XG4vLyAgICAgICAgICAgICAgICAgJChcIiNtb3JlX3Bvc3RzXCIpLmF0dHIoXCJkaXNhYmxlZFwiLHRydWUpO1xuLy8gICAgICAgICAgICAgICAgIC8vICQoXCIjbW9yZV9wb3N0c1wiKS5hZGRDbGFzcyhcInJlbW92ZVwiKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbi8vICAgICAgICAgICAgICRsb2FkZXIuaHRtbChqcVhIUiArIFwiIDo6IFwiICsgdGV4dFN0YXR1cyArIFwiIDo6IFwiICsgZXJyb3JUaHJvd24pO1xuLy8gICAgICAgICB9XG5cbi8vICAgICB9KTtcbi8vICAgICByZXR1cm4gZmFsc2U7XG4vLyB9XG5cbi8vTG9hZCBhbGwgdGl0bGVzIHNvIHRoYXQgdXNlcnMgY2FuIHNjcm9sbCB0aHJvdWdoIGp1c3QgdGl0bGVzLCBidXQgbm8gZGVzY3JpcHRpb24gb3IgcGxheSBidXR0b25zLi4uXG5mdW5jdGlvbiBsb2FkX2FsbF9wb3N0cygpe1xuICAgIHBhZ2VOdW1iZXIrKztcbiAgICB2YXIgc3RyID0gJyZwYWdlTnVtYmVyPScgKyBwYWdlTnVtYmVyICsgJyZwcHA9JyArIGFwcCArICcmYWN0aW9uPWFsbF9wb3N0X2FqYXgnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogXCJodG1sXCIsXG4gICAgICAgIHVybDogYWpheF9wb3N0cy5hamF4dXJsLFxuICAgICAgICBkYXRhOiBzdHIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgdmFyICRkYXRhID0gJChkYXRhKTtcbiAgICAgICAgICAgIGlmKCRkYXRhLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgJChcIiNwb2RDb250ZW50VGl0bGVzXCIpLmFwcGVuZCgkZGF0YSk7XG4gICAgICAgICAgICAgICAgJChcIiNhbGxfcG9zdHNcIikuYXR0cihcImRpc2FibGVkXCIsZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgICQoXCIjYWxsX3Bvc3RzXCIpLmF0dHIoXCJkaXNhYmxlZFwiLHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvciA6IGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgJGxvYWRlci5odG1sKGpxWEhSICsgXCIgOjogXCIgKyB0ZXh0U3RhdHVzICsgXCIgOjogXCIgKyBlcnJvclRocm93bik7XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn1cbiAgICAvL2xvYWQgbW9yZVxuICAgIC8vIG9uIGNsaWNrIGZ1bmN0aW9uIHRvIGludm9rZSB0aGUgbG9hZCBtb3JlIHBvc3RzIGFqYXggY2FsbC4gIExvYWRzIDggbW9yZSBwb2RjYXN0cy5cbiAgICAkKFwiI21vcmVfcG9zdHNcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7IC8vIFdoZW4gYnRuIGlzIHByZXNzZWQuXG4gICAgICAgICQoXCIjbW9yZV9wb3N0c1wiKS5hdHRyKFwiZGlzYWJsZWRcIix0cnVlKTsgLy8gRGlzYWJsZSB0aGUgYnV0dG9uLCB0ZW1wLlxuICAgICAgICBsb2FkX3Bvc3RzKCk7XG4gICAgICAgICQodGhpcykuaW5zZXJ0QWZ0ZXIoJyNwb2RDb250ZW50Jyk7IC8vIE1vdmUgdGhlICdMb2FkIE1vcmUnIGJ1dHRvbiB0byB0aGUgZW5kIG9mIHRoZSB0aGUgbmV3bHkgYWRkZWQgcG9zdHMuXG4gICAgfSk7XG5cbiAgICAvL3NlYXJjaCBieSB0aXRsZVxuICAgIC8vIG9uIGNsaWNrIGZ1bmN0aW9uIHRvIGludm9rZSB0aGUgbG9hZCBhbGwgcG9zdHMsIGJ1dCBqdXN0IHRoZWlyIHRpdGxlcyB2aWEgYSBuZXcgYWpheCBjYWxsLiAgTG9hZHMgYWxsIHBvZGNhc3QgdGl0bGVzLlxuICAgICQoXCIjYWxsX3Bvc3RzXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpeyAvLyBXaGVuIGJ0biBpcyBwcmVzc2VkLlxuICAgICAgICAkKFwiI2FsbF9wb3N0c1wiKS5hdHRyKFwiZGlzYWJsZWRcIix0cnVlKTsgLy8gRGlzYWJsZSB0aGUgYnV0dG9uLCB0ZW1wLlxuICAgICAgICBsb2FkX2FsbF9wb3N0cygpO1xuICAgICAgICAkKCcjcG9kQ29udGVudCcpLmFkZENsYXNzKCdyZW1vdmUnKTsgLy9oaWRlcyB0aGUgI3BvZENvbnRlbnQgZGl2XG4gICAgICAgICQoXCIjbW9yZV9wb3N0c1wiKS5hZGRDbGFzcyhcInJlbW92ZVwiKTsgLy9oaWRlcyB0aGUgTG9hZCBtb3JlIGRpdi9idXR0b25cbiAgICAgICAgLy8kKFwiI21vcmVfcG9zdHNcIikucmVtb3ZlKCk7IC8vaGlkZXMgdGhlIExvYWQgbW9yZSBkaXYvYnV0dG9uXG4gICAgICAgICQoXCIjYWxsX3Bvc3RzXCIpLmFkZENsYXNzKFwicmVtb3ZlXCIpOyAvL2hpZGVzIHRoZSBTZWFyY2ggYnkgVGl0bGUgYnV0dG9uXG4gICAgICAgIC8vJChcIiNhbGxfcG9zdHNcIikucmVtb3ZlKCk7IC8vaGlkZXMgdGhlIFNlYXJjaCBieSBUaXRsZSBidXR0b25cbiAgICAgICAgJChcIiNzaG93X2xhdGVzdF9lcGlzb2Rlc1wiKS5yZW1vdmVDbGFzcyhcInJlbW92ZVwiKS5hZGRDbGFzcyhcInNob3dfYnV0dG9uXCIpOyAvL2Rpc3BsYXlzIHRoZSBTaG93IExhdGVzdCBFcGlzb2RlcyBidXR0b24gaW4gdGhlIHJpZ2h0IHNpZGViYXIob25seSB3aGVuIGluIFNlYXJjaCBieSBUaXRsZSBtb2RlKVxuICAgICAgICAvLyQoXCIjbmV3X21vcmVfcG9zdHNcIikuYWRkQ2xhc3MoXCJzaG93XCIpOyAvL0dpdmUgdGhlIFNob3cgTGF0ZXN0IEVwaXNvZGVzIGJ1dHRvbiBhIHNob3cgY2xhc3MgLSBub3Qgc3VyZSB0aGlzIGlzIG5lZWRlZC5cbiAgICB9KTtcblxuICAgICQoXCIjc2hvd19sYXRlc3RfZXBpc29kZXNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vY29uc3QgZWxlbWVudCA9ICQoXCIjcG9kQ29udGVudFwiKTtcbiAgICAgICAgLy92YXIgcG9kY2FzdHMgPSAkKFwiI3BvZENvbnRlbnRcIik7XG4gICAgICAgIHZhciAkcG9kY2FzdHMgPSAkKFwiI3BvZENvbnRlbnRcIik7XG4gICAgICAgIGlmICgkKFwiI3BvZENvbnRlbnRcIikuaGFzQ2xhc3MoXCJyZW1vdmVcIikpIHtcbiAgICAgICAgICAgICQoXCIjcG9kQ29udGVudFwiKS5hZGRDbGFzcyhcInNob3dfYnV0dG9uXCIpO1xuICAgICAgICAgICAgJChcIiNwb2RDb250ZW50VGl0bGVzXCIpLmFkZENsYXNzKFwicmVtb3ZlXCIpLnJlbW92ZUNsYXNzKFwic2hvd19idXR0b25cIik7XG4gICAgICAgICAgICAkKFwiI3Nob3dfbGF0ZXN0X2VwaXNvZGVzXCIpLmFkZENsYXNzKFwicmVtb3ZlXCIpLnJlbW92ZUNsYXNzKFwic2hvd19idXR0b25cIik7XG4gICAgICAgICAgICAkKFwiI3Nob3dfYWxsX3Bvc3RzXCIpLmFkZENsYXNzKFwic2hvd19idXR0b25cIikucmVtb3ZlQ2xhc3MoXCJyZW1vdmVcIik7XG4gICAgICAgICAgICAkKFwiI2xvYWRfbW9yZVwiKS5hZGRDbGFzcyhcInNob3dfYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwicmVtb3ZlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcIiNwb2RDb250ZW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoXCIjc2hvd19hbGxfcG9zdHNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCIjcG9kQ29udGVudFRpdGxlc1wiKS5hZGRDbGFzcyhcInNob3dfYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwicmVtb3ZlXCIpO1xuICAgICAgICAkKFwiI3BvZENvbnRlbnRcIikucmVtb3ZlQ2xhc3MoXCJzaG93X2J1dHRvblwiKS5hZGRDbGFzcyhcInJlbW92ZVwiKTtcbiAgICAgICAgJChcIiNzaG93X2xhdGVzdF9lcGlzb2Rlc1wiKS5hZGRDbGFzcyhcInNob3dfYnV0dG9uXCIpLnJlbW92ZUNsYXNzKFwicmVtb3ZlXCIpO1xuICAgICAgICAkKFwiI3Nob3dfYWxsX3Bvc3RzXCIpLmFkZENsYXNzKFwicmVtb3ZlXCIpLnJlbW92ZUNsYXNzKFwic2hvd19idXR0b25cIik7XG4gICAgICB9KVxuXG4gICAgLy8kKFwiI2FsbF9wb3N0c1wiKS5vbmNsaWNrPWZ1bmN0aW9uKCl7c2hvd0NvbnRlbnQoJyNwb2RDb250ZW50VGl0bGVzJyk7fVxuIFxuICAgIC8vdG9nZ2xlIGJhY2sgdG8gbGF0ZXN0IHBvZGNhc3RzXG4gICAgLy8gb24gY2xpY2sgZnVuY3Rpb24gdG8gaGlkZSB0aGUgcG9zdHMvcG9kY2FzdHMgYnkgdGl0bGUgYW5kIHJldmVydCBiYWNrIHRvIHRoZSBwb3N0cyBsb2FkZWQgaW50byB0aGUgI3BvZENvbnRlbnQgZGl2XG4gICAgLy8gJChcIiN0b2dnbGVfdG9fbW9yZV9wb3N0c1wiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXsgLy8gV2hlbiBidG4gaXMgcHJlc3NlZC5cbiAgICAvLyAgICAgJChcIiN0b2dnbGVfdG9fbW9yZV9wb3N0c1wiKS5hdHRyKFwiZGlzYWJsZWRcIix0cnVlKTtcbiAgICAvLyAgICAgJCgnI3BvZENvbnRlbnQnKS5yZW1vdmVDbGFzcyhcInJlbW92ZVwiKS5hZGRDbGFzcygnc2hvdycpOyAvLyBEaXNhYmxlIHRoZSBidXR0b24sIHRlbXAuXG4gICAgLy8gICAgICQoJyNwb2RDb250ZW50VGl0bGVzJykucmVtb3ZlQ2xhc3MoXCJzaG93XCIpLmFkZENsYXNzKCdyZW1vdmUnKTsgLy8gRGlzYWJsZSB0aGUgYnV0dG9uLCB0ZW1wLlxuICAgIC8vICAgICAkKFwiI3RvZ2dsZV90b19tb3JlX3Bvc3RzXCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKS5hZGRDbGFzcyhcInJlbW92ZVwiKTtcbiAgICAvLyAgICAgLy8kKHRoaXMpLmluc2VydEFmdGVyKCcjc2lkZWJhcl9uYXYnKTsgLy8gTW92ZSB0aGUgJ0xvYWQgTW9yZScgYnV0dG9uIHRvIHRoZSBlbmQgb2YgdGhlIHRoZSBuZXdseSBhZGRlZCBwb3N0cy5cbiAgICAvLyAgICAgJChcIiNtb3JlX3Bvc3RzXCIpLnJlbW92ZUNsYXNzKFwicmVtb3ZlXCIpLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICAvLyAgICAgJChcIiNhbGxfcG9zdHNcIikucmVtb3ZlQ2xhc3MoXCJyZW1vdmVcIikuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgIC8vIH0pO1xuXG59KGpRdWVyeSwgd2luZG93KSk7XG5cblxuICBcbiAgICAvLyAkKFwiI3JlcGVhdFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgJGNvbnRlbnQuYXBwZW5kKCRjcm9zc0J1dHRvbi5jbG9uZSh0cnVlKS5yZW1vdmVBdHRyKFwiaWRcIikpO1xuICAgIC8vICAgJGNvbnRlbnQuYXBwZW5kKFxuICAgIC8vICAgICAkb3JpZ2luYWwuY2xvbmUodHJ1ZSlcbiAgICAvLyAgICAgLmhpZGUoKSAvLyBpZiBzbGlkaW5nXG4gICAgLy8gICAgIC5hdHRyKFwiaWRcIiwkb3JpZ2luYWwuYXR0cihcImlkXCIpKyRjb250ZW50LmZpbmQoXCJidXR0b24uY3Jvc3NcIikubGVuZ3RoKVxuICAgIC8vICAgICAuc2xpZGVEb3duKFwic2xvd1wiKSAvLyBkb2VzIG5vdCBzbGlkZSBtdWNoIHNvIHJlbW92ZSBpZiB5b3UgZG8gbm90IGxpa2UgaXRcbiAgICAvLyAgICk7XG4gICAgLy8gfSk7XG5cbiAgICAvLyAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vXG4gICAgLy8gLyogT24gaXNvdG9wZSB2MiBoaWRkZW4gY2xhc3MgaXMgbm90IGRlZmluZWQuXG4gICAgLy8gIEFkZCBoaWRkZW4gY2xhc3MgaWYgaXRlbSBoaWRkZW4sIGJlZm9yZSBpbml0aWFsaXNpbmcgSXNvdG9wZTogKi9cbiAgICAvLyB2YXIgaXRlbVJldmVhbCA9IElzb3RvcGUuSXRlbS5wcm90b3R5cGUucmV2ZWFsO1xuICAgIC8vIElzb3RvcGUuSXRlbS5wcm90b3R5cGUucmV2ZWFsID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIGl0ZW1SZXZlYWwuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgIC8vICAgICAkKCB0aGlzLmVsZW1lbnQgKS5yZW1vdmVDbGFzcygnaXNvdG9wZS1oaWRkZW4nKTtcbiAgICAvLyB9O1xuICAgIC8vIHZhciBpdGVtSGlkZSA9IElzb3RvcGUuSXRlbS5wcm90b3R5cGUuaGlkZTtcbiAgICAvLyBJc290b3BlLkl0ZW0ucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgaXRlbUhpZGUuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICAgIC8vICAgICAkKCB0aGlzLmVsZW1lbnQgKS5hZGRDbGFzcygnaXNvdG9wZS1oaWRkZW4nKTsgfTtcbiAgICAvL1xuICAgIC8vIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBqUXVlcnkoZnVuY3Rpb24gKCQpIHtcbi8vIC8vIGluaXRpYWxpemUgSXNvdG9wZSBhZnRlciBhbGwgaW1hZ2VzIGhhdmUgbG9hZGVkXG4vLyAgICAgdmFyICRjb250YWluZXIgPSAkKCcjcG9kY2FzdHMnKS5pbWFnZXNMb2FkZWQoIGZ1bmN0aW9uKCkgeyAvL1RoZSBJRCBmb3IgdGhlIGxpc3Qgd2l0aCBhbGwgdGhlIGJsb2cgcG9zdHNcbi8vICAgICAgICAgJGNvbnRhaW5lci5pc290b3BlKHsgLy9Jc290b3BlIG9wdGlvbnMsICdpdGVtJyBtYXRjaGVzIHRoZSBjbGFzcyBpbiB0aGUgUEhQXG4vLyAgICAgICAgICAgICBpdGVtU2VsZWN0b3IgOiAnLnBvZGNhc3QnLFxuLy8gICAgICAgICAgICAgbGF5b3V0TW9kZTogJ3ZlcnRpY2FsJ1xuLy8gICAgICAgICAgICAgLypncmlkOiB7XG4vLyAgICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6IDIwMFxuLy8gICAgICAgICAgICAgfSovXG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH0pO1xuLy9cbi8vICAgICAvL0FkZCB0aGUgY2xhc3Mgc2VsZWN0ZWQgdG8gdGhlIGl0ZW0gdGhhdCBpcyBjbGlja2VkLCBhbmQgcmVtb3ZlIGZyb20gdGhlIG90aGVyc1xuLy8gICAgIHZhciAkb3B0aW9uU2V0cyA9ICQoJyNmaWx0ZXJzJyksXG4vLyAgICAgICAgICRvcHRpb25MaW5rcyA9ICRvcHRpb25TZXRzLmZpbmQoJ2EnKTtcbi8vXG4vLyAgICAgJG9wdGlvbkxpbmtzLmNsaWNrKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4vLyAgICAgICAgIC8vIGRvbid0IHByb2NlZWQgaWYgYWxyZWFkeSBzZWxlY3RlZFxuLy8gICAgICAgICBpZiAoICR0aGlzLmhhc0NsYXNzKCdzZWxlY3RlZCcpICkge1xuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHZhciAkb3B0aW9uU2V0ID0gJHRoaXMucGFyZW50cygnI2ZpbHRlcnMnKTtcbi8vICAgICAgICAgJG9wdGlvblNldHMuZmluZCgnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4vLyAgICAgICAgICR0aGlzLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuLy9cbi8vICAgICAgICAgLy9XaGVuIGFuIGl0ZW0gaXMgY2xpY2tlZCwgc29ydCB0aGUgaXRlbXMuXG4vLyAgICAgICAgIHZhciBzZWxlY3RvciA9ICQodGhpcykuYXR0cignZGF0YS1maWx0ZXInKTtcbi8vICAgICAgICAgJGNvbnRhaW5lci5pc290b3BlKHsgZmlsdGVyOiBzZWxlY3RvciB9KTtcbi8vXG4vLyAgICAgICAgIHJldHVybiBmYWxzZTtcbi8vICAgICB9KTtcbi8vXG4vLyB9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pSWl3aWMyOTFjbU5sY3lJNld5SmpkWE4wYjIwdWFuTWlYU3dpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlvaFhHNGdLaUJQYm1VZ1EyOXVabXgxWlc1alpTQXRJRmR2Y21SUWNtVnpjeUJVYUdWdFpWeHVJQ3BjYmlBcUwxeHVPeWhtZFc1amRHbHZiaWdrTENCM2FXNWtiM2NzSUhWdVpHVm1hVzVsWkNsN1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkRhR1ZqYXlCaElHaHlaV1lnWm05eUlHRnVJR0Z1WTJodmNpNGdTV1lnWlhocGMzUnpMQ0JoYm1RZ2FXNGdaRzlqZFcxbGJuUXNJSE5qY205c2JDQjBieUJwZEM1Y2JpQWdJQ0FnS2lCSlppQm9jbVZtSUdGeVozVnRaVzUwSUc5dGJXbDBaV1FzSUdGemMzVnRaWE1nWTI5dWRHVjRkQ0FvZEdocGN5a2dhWE1nU0ZSTlRDQkZiR1Z0Wlc1MExGeHVJQ0FnSUNBcUlIZG9hV05vSUhkcGJHd2dZbVVnZEdobElHTmhjMlVnZDJobGJpQnBiblp2YTJWa0lHSjVJR3BSZFdWeWVTQmhablJsY2lCaGJpQmxkbVZ1ZEZ4dUlDQWdJQ0FxTDF4dUlDQWdJR1oxYm1OMGFXOXVJSE5qY205c2JGOXBabDloYm1Ob2IzSW9hSEpsWmlrZ2UxeHVJQ0FnSUNBZ0lDQm9jbVZtSUQwZ2RIbHdaVzltS0doeVpXWXBJRDA5SUZ3aWMzUnlhVzVuWENJZ1B5Qm9jbVZtSURvZ0pDaDBhR2x6S1M1aGRIUnlLRndpYUhKbFpsd2lLVHRjYmx4dUlDQWdJQ0FnSUNBdkx5QlpiM1VnWTI5MWJHUWdaV0Z6YVd4NUlHTmhiR04xYkdGMFpTQjBhR2x6SUdSNWJtRnRhV05oYkd4NUlHbG1JSGx2ZFNCd2NtVm1aWEpjYmlBZ0lDQWdJQ0FnZG1GeUlHWnliMjFVYjNBZ1BTQXdPMXh1WEc0Z0lDQWdJQ0FnSUM4dklFbG1JRzkxY2lCSWNtVm1JSEJ2YVc1MGN5QjBieUJoSUhaaGJHbGtMQ0J1YjI0dFpXMXdkSGtnWVc1amFHOXlMQ0JoYm1RZ2FYTWdiMjRnZEdobElITmhiV1VnY0dGblpTQW9aUzVuTGlBalptOXZLVnh1SUNBZ0lDQWdJQ0F2THlCTVpXZGhZM2tnYWxGMVpYSjVJR0Z1WkNCSlJUY2diV0Y1SUdoaGRtVWdhWE56ZFdWek9pQm9kSFJ3T2k4dmMzUmhZMnR2ZG1WeVpteHZkeTVqYjIwdmNTOHhOVGt6TVRjMFhHNGdJQ0FnSUNBZ0lHbG1LR2h5WldZdWFXNWtaWGhQWmloY0lpTmNJaWtnUFQwZ01DQWdKaVlnYUhKbFppQWhQU0FuSTIxNVRXOWtZV3duS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ0pIUmhjbWRsZENBOUlDUW9hSEpsWmlrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklFOXNaR1Z5SUdKeWIzZHpaWElnZDJsMGFHOTFkQ0J3ZFhOb1UzUmhkR1VnYldsbmFIUWdabXhwWTJ0bGNpQm9aWEpsTENCaGN5QjBhR1Y1SUcxdmJXVnVkR0Z5YVd4NVhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCcWRXMXdJSFJ2SUhSb1pTQjNjbTl1WnlCd2IzTnBkR2x2YmlBb1NVVWdQQ0F4TUNsY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtS0NSMFlYSm5aWFF1YkdWdVozUm9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkNnbmFIUnRiQ3dnWW05a2VTY3BMbUZ1YVcxaGRHVW9leUJ6WTNKdmJHeFViM0E2SUNSMFlYSm5aWFF1YjJabWMyVjBLQ2t1ZEc5d0lDMGdabkp2YlZSdmNDQjlMQ0JjSW5Oc2IzZGNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZb2FHbHpkRzl5ZVNBbUppQmNJbkIxYzJoVGRHRjBaVndpSUdsdUlHaHBjM1J2Y25rcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYUdsemRHOXllUzV3ZFhOb1UzUmhkR1VvZTMwc0lHUnZZM1Z0Wlc1MExuUnBkR3hsTENCM2FXNWtiM2N1Ykc5allYUnBiMjR1Y0dGMGFHNWhiV1VnS3lCb2NtVm1LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRmRvWlc0Z2IzVnlJSEJoWjJVZ2JHOWhaSE1zSUdOb1pXTnJJSFJ2SUhObFpTQnBaaUJwZENCamIyNTBZV2x1Y3lCaGJtUWdZVzVqYUc5eVhHNGdJQ0FnYzJOeWIyeHNYMmxtWDJGdVkyaHZjaWgzYVc1a2IzY3ViRzlqWVhScGIyNHVhR0Z6YUNrN1hHNWNiaTh2SUVsdWRHVnlZMlZ3ZENCaGJHd2dZVzVqYUc5eUlHTnNhV05yYzF4dVhHNGdJQ0FnSkNoY0ltSnZaSGxjSWlrdWIyNG9YQ0pqYkdsamExd2lMQ0JjSW1GY0lpd2djMk55YjJ4c1gybG1YMkZ1WTJodmNpazdYRzVjYmlBZ0lDQXZMMkZrWkNCamJHRnpjeUJ6ZEdsamF5QjBieUIwYUdVZ2NtbG5hSFFnYzJsa1pXSmhjaUIzYUdWdUlIUm9aU0J3YjJSRGIyNTBaVzUwSUdOdmJuUmhhVzVsY2lCblpYUnpJREV3TUNCd2FYaGxiSE1nWm5KdmJTQjBhR1VnZEc5d0lHOW1JSFJvWlNCM2FXNWtiM2RjYmlBZ0lDQjJZWElnWm1sNFVtbG5hSFJUYVdSbFltRnlUMjVUWTNKdmJHd2dQU0J1WlhjZ1YyRjVjRzlwYm5Rb2UxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCbGJHVnRaVzUwT2lCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2duY0c5a1EyOXVkR1Z1ZENjcExGeHVJQ0FnSUNBZ0lDQWdJQ0FnYUdGdVpHeGxjam9nWm5WdVkzUnBiMjRnS0dScGNtVmpkR2x2YmlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LR1JwY21WamRHbHZiaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHUnBjbVZqZEdsdmJpQTlQVDBnSjJSdmQyNG5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9KeU55YVdkb2RDMXphV1JsWW1GeUp5a3VZV1JrUTJ4aGMzTW9KM04wYVdOckp5azdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNRb0p5TnlhV2RvZEMxemFXUmxZbUZ5SnlrdWNtVnRiM1psUTJ4aGMzTW9KM1Z1TFhOMGFXTnJKeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHOW1abk5sZERvZ0p6RXdNQ2RjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ2s3WEc1Y2JpQWdJQ0IyWVhJZ2RXNUdhWGhTYVdkb2RGTnBaR1ZpWVhKUGJsTmpjbTlzYkNBOUlHNWxkeUJYWVhsd2IybHVkQ2g3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR1ZzWlcxbGJuUTZJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tDZHdiMlJEYjI1MFpXNTBKeWtzWEc0Z0lDQWdJQ0FnSUNBZ0lDQm9ZVzVrYkdWeU9pQm1kVzVqZEdsdmJpQW9aR2x5WldOMGFXOXVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMyOXNaUzVzYjJjb1pHbHlaV04wYVc5dUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWkdseVpXTjBhVzl1SUQwOVBTQW5kWEFuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvSnlOeWFXZG9kQzF6YVdSbFltRnlKeWt1Y21WdGIzWmxRMnhoYzNNb0ozTjBhV05ySnlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvSnlOeWFXZG9kQzF6YVdSbFltRnlKeWt1WVdSa1EyeGhjM01vSjNWdUxYTjBhV05ySnlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVnNjMlVnZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJRzltWm5ObGREb2dKekV3TUNkY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNrN1hHNWNiaUFnSUNBdkwxZG9aVzRnZEdobElHZGhiR3hsY25rZ1kyOXRaWE1nYVc1MGJ5QjJhV1YzSUhWdUxYTjBhV05ySUhSb1pTQnlhV2RvZENCemFXUmxZbUZ5WEc0Z0lDQWdkbUZ5SUVacGVGSnBaMmgwVTJsa1pXSmhjazl1VTJOeWIyeHNNaUE5SUc1bGR5QlhZWGx3YjJsdWRDaDdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHVnNaVzFsYm5RNklHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0NkbllXeHNaWEo1Snlrc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JvWVc1a2JHVnlPaUJtZFc1amRHbHZiaUFvWkdseVpXTjBhVzl1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjMjlzWlM1c2IyY29aR2x5WldOMGFXOXVLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1pHbHlaV04wYVc5dUlEMDlQU0FuWkc5M2JpY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pDZ25JM0pwWjJoMExYTnBaR1ZpWVhJbktTNXlaVzF2ZG1WRGJHRnpjeWduYzNScFkyc25LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pDZ25JM0pwWjJoMExYTnBaR1ZpWVhJbktTNWhaR1JEYkdGemN5Z25kVzR0YzNScFkyc25LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWld4elpTQjdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2IyWm1jMlYwT2lBbk9UQWxKMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdLVHRjYmx4dUlDQWdJSFpoY2lCMWJrWnBlRkpwWjJoMFUybGtaV0poY2s5dVUyTnliMnhzTWlBOUlHNWxkeUJYWVhsd2IybHVkQ2g3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR1ZzWlcxbGJuUTZJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tDZG5ZV3hzWlhKNUp5a3NYRzRnSUNBZ0lDQWdJQ0FnSUNCb1lXNWtiR1Z5T2lCbWRXNWpkR2x2YmlBb1pHbHlaV04wYVc5dUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvWkdseVpXTjBhVzl1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9aR2x5WldOMGFXOXVJRDA5UFNBbmRYQW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9KeU55YVdkb2RDMXphV1JsWW1GeUp5a3VjbVZ0YjNabFEyeGhjM01vSjNWdUxYTjBhV05ySnlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvSnlOeWFXZG9kQzF6YVdSbFltRnlKeWt1WVdSa1EyeGhjM01vSjNOMGFXTnJKeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHOW1abk5sZERvZ0p6a3dKU2RjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ2s3WEc1Y2JpQWdJQ0F2TDNSb1pYTmxJSFIzYnlCM1lYbHdiMmx1ZEhNZ1lYSmxJR1p2Y2lCMGFHVWdVRzlrWTJGemRDQjBkMjhnWTI5c2RXMXVJR2x1Y25SbGNtbHZjaUJ3WVdkbGN5NGdJRmRvWlc0Z1ptOXZkR1Z5SUdOdmJXVnpJR2x1ZEc4Z2RtbGxkeUIxYmkxemRHbGpheUIwYUdVZ2NtbG5hSFFnYzJsa1pXSmhjbHh1SUNBZ0lIWmhjaUJHYVhoU2FXZG9kRk5wWkdWaVlYSlBibE5qY205c2JETWdQU0J1WlhjZ1YyRjVjRzlwYm5Rb2UxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCbGJHVnRaVzUwT2lCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2duY0hWeWNHOXpaUzFpYjNSMGIyMG5LU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHaGhibVJzWlhJNklHWjFibU4wYVc5dUlDaGthWEpsWTNScGIyNHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emIyeGxMbXh2Wnloa2FYSmxZM1JwYjI0cE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hrYVhKbFkzUnBiMjRnUFQwOUlDZGtiM2R1SnlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrS0NjamNtbG5hSFF0YzJsa1pXSmhjaWNwTG5KbGJXOTJaVU5zWVhOektDZHpkR2xqYXljcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FrS0NjamNtbG5hSFF0YzJsa1pXSmhjaWNwTG1Ga1pFTnNZWE56S0NkMWJpMXpkR2xqYXljcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxiSE5sSUh0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgwc1hHNGdJQ0FnSUNBZ0lDQWdJQ0J2Wm1aelpYUTZJQ2M1TUNVblhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBcE8xeHVYRzRnSUNBZ2RtRnlJSFZ1Um1sNFVtbG5hSFJUYVdSbFltRnlUMjVUWTNKdmJHd3pJRDBnYm1WM0lGZGhlWEJ2YVc1MEtIdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ1pXeGxiV1Z1ZERvZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvSjNCMWNuQnZjMlV0WW05MGRHOXRKeWtzWEc0Z0lDQWdJQ0FnSUNBZ0lDQm9ZVzVrYkdWeU9pQm1kVzVqZEdsdmJpQW9aR2x5WldOMGFXOXVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMyOXNaUzVzYjJjb1pHbHlaV04wYVc5dUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWkdseVpXTjBhVzl1SUQwOVBTQW5kWEFuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvSnlOeWFXZG9kQzF6YVdSbFltRnlKeWt1Y21WdGIzWmxRMnhoYzNNb0ozVnVMWE4wYVdOckp5azdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNRb0p5TnlhV2RvZEMxemFXUmxZbUZ5SnlrdVlXUmtRMnhoYzNNb0ozTjBhV05ySnlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVnNjMlVnZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJRzltWm5ObGREb2dKemt3SlNkY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNrN1hHNWNiaUFnSUNBdktpQk5ZV2R1YVdacFl5QlFiM0IxY0NBcUwxeHVYRzRnSUNBZ0pDZ25MbWRoYkd4bGNua3RhWFJsYlNjcExtMWhaMjVwWm1salVHOXdkWEFvZTF4dUlDQWdJQ0FnSUNCa1pXeGxaMkYwWlRvZ0oyRW5MQ0F2THlCamFHbHNaQ0JwZEdWdGN5QnpaV3hsWTNSdmNpd2dZbmtnWTJ4cFkydHBibWNnYjI0Z2FYUWdjRzl3ZFhBZ2QybHNiQ0J2Y0dWdVhHNGdJQ0FnSUNBZ0lIUjVjR1U2SUNkcGJXRm5aU2NzWEc0Z0lDQWdJQ0FnSUdOc2IzTmxUMjVEYjI1MFpXNTBRMnhwWTJzNklIUnlkV1VzWEc0Z0lDQWdJQ0FnSUdOc2IzTmxRblJ1U1c1emFXUmxPaUJtWVd4elpTeGNiaUFnSUNBZ0lDQWdaMkZzYkdWeWVUb2dleUJsYm1GaWJHVmtPblJ5ZFdVZ2ZWeHVJQ0FnSUNBZ0lDQXZMeUJ2ZEdobGNpQnZjSFJwYjI1elhHNGdJQ0FnZlNrN1hHNWNiaUFnSUNBa0tDY3VjSEp2YW1WamRFZGhiR3hsY25sSmRHVnRKeWt1YldGbmJtbG1hV05RYjNCMWNDaDdYRzRnSUNBZ0lDQWdJR1JsYkdWbllYUmxPaUFuWVNjc0lDOHZJR05vYVd4a0lHbDBaVzF6SUhObGJHVmpkRzl5TENCaWVTQmpiR2xqYTJsdVp5QnZiaUJwZENCd2IzQjFjQ0IzYVd4c0lHOXdaVzVjYmlBZ0lDQWdJQ0FnZEhsd1pUb2dKMmx0WVdkbEp5eGNiaUFnSUNBZ0lDQWdZMnh2YzJWUGJrTnZiblJsYm5SRGJHbGphem9nZEhKMVpTeGNiaUFnSUNBZ0lDQWdZMnh2YzJWQ2RHNUpibk5wWkdVNklHWmhiSE5sTEZ4dUlDQWdJQ0FnSUNCbllXeHNaWEo1T2lCN0lHVnVZV0pzWldRNmRISjFaU0I5WEc0Z0lDQWdJQ0FnSUM4dklHOTBhR1Z5SUc5d2RHbHZibk5jYmlBZ0lDQjlLVHRjYmx4dUlDQWdJQzh2SUVOaGNtOTFjMlZzYzF4dVhHNGdJQ0FnSkNoY0lpTjBaV0Z0SUM1dmQyd3RZMkZ5YjNWelpXeGNJaWt1YjNkc1EyRnliM1Z6Wld3b2UxeHVJQ0FnSUNBZ0lDQnBkR1Z0Y3pvZ01TeGNiaUFnSUNBZ0lDQWdiV0Z5WjJsdU9pQXdMRnh1SUNBZ0lDQWdJQ0JzYjI5d09pQjBjblZsTEZ4dUlDQWdJQ0FnSUNCa2IzUnpPaUJtWVd4elpTeGNiaUFnSUNBZ0lDQWdibUYyT2lCMGNuVmxMRnh1SUNBZ0lDQWdJQ0J1WVhaVVpYaDBPaUJiSnp4cElHTnNZWE56UFZ3aVptRWdabUV0WTJGeVpYUXRiR1ZtZENCbVlTMHllRndpUGp3dmFUNDhjM0JoYmlCamJHRnpjejFjSW01bGVIUXRjSEpsZGlCb2FXUmtaVzR0YzIwZ2FHbGtaR1Z1TFhoelhDSStVSEpsZG1sdmRYTThMM053WVc0K0lDY3NKenh6Y0dGdUlHTnNZWE56UFZ3aWJtVjRkQzF3Y21WMklHaHBaR1JsYmkxemJTQm9hV1JrWlc0dGVITmNJajVPWlhoMFBDOXpjR0Z1UGp4cElHTnNZWE56UFZ3aVptRWdabUV0WTJGeVpYUXRjbWxuYUhRZ1ptRXRNbmhjSWo0OEwyaytKMTFjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJQ1FvWENJaloyRnNiR1Z5ZVNBdWIzZHNMV05oY205MWMyVnNYQ0lwTG05M2JFTmhjbTkxYzJWc0tIdGNiaUFnSUNBZ0lDQWdMeTlwZEdWdGN6b2dOQ3hjYmlBZ0lDQWdJQ0FnYldGeVoybHVPaUF6TUN4Y2JpQWdJQ0FnSUNBZ0x5OWhkWFJ2VjJsa2RHZzZabUZzYzJVc1hHNGdJQ0FnSUNBZ0lHeHZiM0E2SUhSeWRXVXNYRzRnSUNBZ0lDQWdJR1J2ZEhNNklHWmhiSE5sTEZ4dUlDQWdJQ0FnSUNCdVlYWTZJSFJ5ZFdVc1hHNGdJQ0FnSUNBZ0lHNWhkbFJsZUhRNklGc25QSE53WVc0Z1kyeGhjM005WENKbmJIbHdhR2xqYjI0Z1oyeDVjR2hwWTI5dUxYUnlhV0Z1WjJ4bExXeGxablJjSWlCemRIbHNaVDFjSW1OdmJHOXlPaU5qTnpJMU5HVTdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqcDBjbUZ1YzNCaGNtVnVkRHRjSWo0OEwzTndZVzQrSUNjc0p6eHpjR0Z1SUdOc1lYTnpQVndpWjJ4NWNHaHBZMjl1SUdkc2VYQm9hV052YmkxMGNtbGhibWRzWlMxeWFXZG9kRndpSUhOMGVXeGxQVndpWTI5c2IzSTZJMk0zTWpVMFpUdGlZV05yWjNKdmRXNWtMV052Ykc5eU9uUnlZVzV6Y0dGeVpXNTBPMXdpUGp3dmMzQmhiajRuWFN4Y2JpQWdJQ0FnSUNBZ2NtVnpjRzl1YzJsMlpVTnNZWE56T25SeWRXVXNYRzRnSUNBZ0lDQWdJSEpsYzNCdmJuTnBkbVU2ZTF4dUlDQWdJQ0FnSUNBZ0lDQWdNRHA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVhSbGJYTTZNU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J1WVhZNmRISjFaVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdJQ0FnSURZd01EcDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhWFJsYlhNNk1peGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnVZWFk2ZEhKMVpWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJREV3TURBNmUxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbDBaVzF6T2pRc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JtRjJPblJ5ZFdWY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDBwTzF4dVhHNGdJQ0FnTHlvZ0lGTmpjbTlzYkNCMGJ5QjBiM0JjYmlBZ0lDQXRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMGdLaTljYmlBZ0lDQWtLRndpWVZ0b2NtVm1QU2NqY0dGblpTMTBiM0FuWFZ3aUtTNWpiR2xqYXlobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJQ1FvWENKb2RHMXNMQ0JpYjJSNVhDSXBMbUZ1YVcxaGRHVW9lM05qY205c2JGUnZjRG9nTUgwc0lGd2ljMnh2ZDF3aUtUdGNiaUFnSUNBZ0lDQWdMeThnSUNBZ0lDQWdJQ1FvWENKb2RHMXNMQ0JpYjJSNVhDSXBMbUZ1YVcxaGRHVW9lM05qY205c2JGUnZjRG9nTUgwc0lIdGtkWEpoZEdsdmJqb2dNVEF3TUgwcE8xeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0F2THlBdkx6MDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFZ4dUlDQWdJQzh2WEc0Z0lDQWdMeThnTHlvZ1QyNGdhWE52ZEc5d1pTQjJNaUJvYVdSa1pXNGdZMnhoYzNNZ2FYTWdibTkwSUdSbFptbHVaV1F1WEc0Z0lDQWdMeThnSUVGa1pDQm9hV1JrWlc0Z1kyeGhjM01nYVdZZ2FYUmxiU0JvYVdSa1pXNHNJR0psWm05eVpTQnBibWwwYVdGc2FYTnBibWNnU1hOdmRHOXdaVG9nS2k5Y2JpQWdJQ0F2THlCMllYSWdhWFJsYlZKbGRtVmhiQ0E5SUVsemIzUnZjR1V1U1hSbGJTNXdjbTkwYjNSNWNHVXVjbVYyWldGc08xeHVJQ0FnSUM4dklFbHpiM1J2Y0dVdVNYUmxiUzV3Y205MGIzUjVjR1V1Y21WMlpXRnNJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnTHk4Z0lDQWdJR2wwWlcxU1pYWmxZV3d1WVhCd2JIa29JSFJvYVhNc0lHRnlaM1Z0Wlc1MGN5QXBPMXh1SUNBZ0lDOHZJQ0FnSUNBa0tDQjBhR2x6TG1Wc1pXMWxiblFnS1M1eVpXMXZkbVZEYkdGemN5Z25hWE52ZEc5d1pTMW9hV1JrWlc0bktUdGNiaUFnSUNBdkx5QjlPMXh1SUNBZ0lDOHZJSFpoY2lCcGRHVnRTR2xrWlNBOUlFbHpiM1J2Y0dVdVNYUmxiUzV3Y205MGIzUjVjR1V1YUdsa1pUdGNiaUFnSUNBdkx5QkpjMjkwYjNCbExrbDBaVzB1Y0hKdmRHOTBlWEJsTG1ocFpHVWdQU0JtZFc1amRHbHZiaWdwSUh0Y2JpQWdJQ0F2THlBZ0lDQWdhWFJsYlVocFpHVXVZWEJ3Ykhrb0lIUm9hWE1zSUdGeVozVnRaVzUwY3lBcE8xeHVJQ0FnSUM4dklDQWdJQ0FrS0NCMGFHbHpMbVZzWlcxbGJuUWdLUzVoWkdSRGJHRnpjeWduYVhOdmRHOXdaUzFvYVdSa1pXNG5LVHNnZlR0Y2JpQWdJQ0F2TDF4dUlDQWdJQzh2SUM4dlBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlYRzVjYmx4dVhHNHZMeUJxVVhWbGNua29ablZ1WTNScGIyNGdLQ1FwSUh0Y2JpOHZJQzh2SUdsdWFYUnBZV3hwZW1VZ1NYTnZkRzl3WlNCaFpuUmxjaUJoYkd3Z2FXMWhaMlZ6SUdoaGRtVWdiRzloWkdWa1hHNHZMeUFnSUNBZ2RtRnlJQ1JqYjI1MFlXbHVaWElnUFNBa0tDY2pjRzlrWTJGemRITW5LUzVwYldGblpYTk1iMkZrWldRb0lHWjFibU4wYVc5dUtDa2dleUF2TDFSb1pTQkpSQ0JtYjNJZ2RHaGxJR3hwYzNRZ2QybDBhQ0JoYkd3Z2RHaGxJR0pzYjJjZ2NHOXpkSE5jYmk4dklDQWdJQ0FnSUNBZ0pHTnZiblJoYVc1bGNpNXBjMjkwYjNCbEtIc2dMeTlKYzI5MGIzQmxJRzl3ZEdsdmJuTXNJQ2RwZEdWdEp5QnRZWFJqYUdWeklIUm9aU0JqYkdGemN5QnBiaUIwYUdVZ1VFaFFYRzR2THlBZ0lDQWdJQ0FnSUNBZ0lDQnBkR1Z0VTJWc1pXTjBiM0lnT2lBbkxuQnZaR05oYzNRbkxGeHVMeThnSUNBZ0lDQWdJQ0FnSUNBZ2JHRjViM1YwVFc5a1pUb2dKM1psY25ScFkyRnNKMXh1THk4Z0lDQWdJQ0FnSUNBZ0lDQWdMeXBuY21sa09pQjdYRzR2THlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5c2RXMXVWMmxrZEdnNklESXdNRnh1THk4Z0lDQWdJQ0FnSUNBZ0lDQWdmU292WEc0dkx5QWdJQ0FnSUNBZ0lIMHBPMXh1THk4Z0lDQWdJSDBwTzF4dUx5OWNiaTh2SUNBZ0lDQXZMMEZrWkNCMGFHVWdZMnhoYzNNZ2MyVnNaV04wWldRZ2RHOGdkR2hsSUdsMFpXMGdkR2hoZENCcGN5QmpiR2xqYTJWa0xDQmhibVFnY21WdGIzWmxJR1p5YjIwZ2RHaGxJRzkwYUdWeWMxeHVMeThnSUNBZ0lIWmhjaUFrYjNCMGFXOXVVMlYwY3lBOUlDUW9KeU5tYVd4MFpYSnpKeWtzWEc0dkx5QWdJQ0FnSUNBZ0lDUnZjSFJwYjI1TWFXNXJjeUE5SUNSdmNIUnBiMjVUWlhSekxtWnBibVFvSjJFbktUdGNiaTh2WEc0dkx5QWdJQ0FnSkc5d2RHbHZia3hwYm10ekxtTnNhV05yS0daMWJtTjBhVzl1S0NsN1hHNHZMeUFnSUNBZ0lDQWdJSFpoY2lBa2RHaHBjeUE5SUNRb2RHaHBjeWs3WEc0dkx5QWdJQ0FnSUNBZ0lDOHZJR1J2YmlkMElIQnliMk5sWldRZ2FXWWdZV3h5WldGa2VTQnpaV3hsWTNSbFpGeHVMeThnSUNBZ0lDQWdJQ0JwWmlBb0lDUjBhR2x6TG1oaGMwTnNZWE56S0NkelpXeGxZM1JsWkNjcElDa2dlMXh1THk4Z0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUx5OGdJQ0FnSUNBZ0lDQjlYRzR2THlBZ0lDQWdJQ0FnSUhaaGNpQWtiM0IwYVc5dVUyVjBJRDBnSkhSb2FYTXVjR0Z5Wlc1MGN5Z25JMlpwYkhSbGNuTW5LVHRjYmk4dklDQWdJQ0FnSUNBZ0pHOXdkR2x2YmxObGRITXVabWx1WkNnbkxuTmxiR1ZqZEdWa0p5a3VjbVZ0YjNabFEyeGhjM01vSjNObGJHVmpkR1ZrSnlrN1hHNHZMeUFnSUNBZ0lDQWdJQ1IwYUdsekxtRmtaRU5zWVhOektDZHpaV3hsWTNSbFpDY3BPMXh1THk5Y2JpOHZJQ0FnSUNBZ0lDQWdMeTlYYUdWdUlHRnVJR2wwWlcwZ2FYTWdZMnhwWTJ0bFpDd2djMjl5ZENCMGFHVWdhWFJsYlhNdVhHNHZMeUFnSUNBZ0lDQWdJSFpoY2lCelpXeGxZM1J2Y2lBOUlDUW9kR2hwY3lrdVlYUjBjaWduWkdGMFlTMW1hV3gwWlhJbktUdGNiaTh2SUNBZ0lDQWdJQ0FnSkdOdmJuUmhhVzVsY2k1cGMyOTBiM0JsS0hzZ1ptbHNkR1Z5T2lCelpXeGxZM1J2Y2lCOUtUdGNiaTh2WEc0dkx5QWdJQ0FnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmk4dklDQWdJQ0I5S1R0Y2JpOHZYRzR2THlCOUtUdGNibjBvYWxGMVpYSjVMQ0IzYVc1a2IzY3BLVHRjYmx4dUlsMHNJbVpwYkdVaU9pSmpkWE4wYjIwdWFuTWlmUT09XG4iXSwiZmlsZSI6ImN1c3RvbS5qcyJ9
