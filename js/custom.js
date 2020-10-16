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

function re_load_posts(){
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
                $("#podContentTitles").remove();
                $("#podContent").removeClass("remove").addClass("show");
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

    $("#more_posts").on("click",function(){ // When btn is pressed.
        $("#more_posts").attr("disabled",true); // Disable the button, temp.
        load_posts();
        $(this).insertAfter('#podContent'); // Move the 'Load More' button to the end of the the newly added posts.
    });

    $("#all_posts").on("click",function(){ // When btn is pressed.
        $("#all_posts").attr("disabled",true); // Disable the button, temp.
        load_all_posts();
        $('#podContent').addClass('remove');
        $("#more_posts").addClass("remove");
        $("#all_posts").addClass("remove");
        $("#new_more_posts").removeClass("remove");
        $("#new_more_posts").addClass("show");
    });

    $("#new_more_posts").on("click",function(){ // When btn is pressed.
        $("#more_posts").attr("disabled",true); // Disable the button, temp.
        re_load_posts();
        $(this).insertAfter('#podContent'); // Move the 'Load More' button to the end of the the newly added posts.
    });

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdXN0b20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBPbmUgQ29uZmx1ZW5jZSAtIFdvcmRQcmVzcyBUaGVtZVxuICpcbiAqL1xuOyhmdW5jdGlvbigkLCB3aW5kb3csIHVuZGVmaW5lZCl7XG4gICAgLyoqXG4gICAgICogQ2hlY2sgYSBocmVmIGZvciBhbiBhbmNob3IuIElmIGV4aXN0cywgYW5kIGluIGRvY3VtZW50LCBzY3JvbGwgdG8gaXQuXG4gICAgICogSWYgaHJlZiBhcmd1bWVudCBvbW1pdGVkLCBhc3N1bWVzIGNvbnRleHQgKHRoaXMpIGlzIEhUTUwgRWxlbWVudCxcbiAgICAgKiB3aGljaCB3aWxsIGJlIHRoZSBjYXNlIHdoZW4gaW52b2tlZCBieSBqUXVlcnkgYWZ0ZXIgYW4gZXZlbnRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzY3JvbGxfaWZfYW5jaG9yKGhyZWYpIHtcbiAgICAgICAgaHJlZiA9IHR5cGVvZihocmVmKSA9PSBcInN0cmluZ1wiID8gaHJlZiA6ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cbiAgICAgICAgLy8gWW91IGNvdWxkIGVhc2lseSBjYWxjdWxhdGUgdGhpcyBkeW5hbWljYWxseSBpZiB5b3UgcHJlZmVyXG4gICAgICAgIHZhciBmcm9tVG9wID0gMDtcblxuICAgICAgICAvLyBJZiBvdXIgSHJlZiBwb2ludHMgdG8gYSB2YWxpZCwgbm9uLWVtcHR5IGFuY2hvciwgYW5kIGlzIG9uIHRoZSBzYW1lIHBhZ2UgKGUuZy4gI2ZvbylcbiAgICAgICAgLy8gTGVnYWN5IGpRdWVyeSBhbmQgSUU3IG1heSBoYXZlIGlzc3VlczogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMTU5MzE3NFxuICAgICAgICBpZihocmVmLmluZGV4T2YoXCIjXCIpID09IDAgICYmIGhyZWYgIT0gJyNteU1vZGFsJykge1xuICAgICAgICAgICAgdmFyICR0YXJnZXQgPSAkKGhyZWYpO1xuXG4gICAgICAgICAgICAvLyBPbGRlciBicm93c2VyIHdpdGhvdXQgcHVzaFN0YXRlIG1pZ2h0IGZsaWNrZXIgaGVyZSwgYXMgdGhleSBtb21lbnRhcmlseVxuICAgICAgICAgICAgLy8ganVtcCB0byB0aGUgd3JvbmcgcG9zaXRpb24gKElFIDwgMTApXG4gICAgICAgICAgICBpZigkdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAkdGFyZ2V0Lm9mZnNldCgpLnRvcCAtIGZyb21Ub3AgfSwgXCJzbG93XCIpO1xuICAgICAgICAgICAgICAgIGlmKGhpc3RvcnkgJiYgXCJwdXNoU3RhdGVcIiBpbiBoaXN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICsgaHJlZik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXaGVuIG91ciBwYWdlIGxvYWRzLCBjaGVjayB0byBzZWUgaWYgaXQgY29udGFpbnMgYW5kIGFuY2hvclxuICAgIHNjcm9sbF9pZl9hbmNob3Iod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuXG4vLyBJbnRlcmNlcHQgYWxsIGFuY2hvciBjbGlja3NcblxuICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCJhXCIsIHNjcm9sbF9pZl9hbmNob3IpO1xuXG4gICAgLyogTWFnbmlmaWMgUG9wdXAgKi9cblxuICAgICQoJy5nYWxsZXJ5LWl0ZW0nKS5tYWduaWZpY1BvcHVwKHtcbiAgICAgICAgZGVsZWdhdGU6ICdhJywgLy8gY2hpbGQgaXRlbXMgc2VsZWN0b3IsIGJ5IGNsaWNraW5nIG9uIGl0IHBvcHVwIHdpbGwgb3BlblxuICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICBjbG9zZU9uQ29udGVudENsaWNrOiB0cnVlLFxuICAgICAgICBjbG9zZUJ0bkluc2lkZTogZmFsc2UsXG4gICAgICAgIGdhbGxlcnk6IHsgZW5hYmxlZDp0cnVlIH1cbiAgICAgICAgLy8gb3RoZXIgb3B0aW9uc1xuICAgIH0pO1xuXG4gICAgJCgnLnByb2plY3RHYWxsZXJ5SXRlbScpLm1hZ25pZmljUG9wdXAoe1xuICAgICAgICBkZWxlZ2F0ZTogJ2EnLCAvLyBjaGlsZCBpdGVtcyBzZWxlY3RvciwgYnkgY2xpY2tpbmcgb24gaXQgcG9wdXAgd2lsbCBvcGVuXG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIGNsb3NlT25Db250ZW50Q2xpY2s6IHRydWUsXG4gICAgICAgIGNsb3NlQnRuSW5zaWRlOiBmYWxzZSxcbiAgICAgICAgZ2FsbGVyeTogeyBlbmFibGVkOnRydWUgfVxuICAgICAgICAvLyBvdGhlciBvcHRpb25zXG4gICAgfSk7XG5cbiAgICAvKiAgU2Nyb2xsIHRvIHRvcFxuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAgICQoXCJhW2hyZWY9JyNwYWdlLXRvcCddXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCBcInNsb3dcIik7XG4gICAgICAgIC8vICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCB7ZHVyYXRpb246IDEwMDB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLy8gQ2Fyb3VzZWxzXG4gICAgLy9Jbml0IFN3aXBlciBHYWxsZXJ5XG5cbiAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyLWNvbnRhaW5lcicsIHtcbiAgICAgICAgLy8gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxuICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBsb29wOiB0cnVlLFxuXG4gICAgICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXG4gICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgIG5leHRFbDogJy5zd2lwZXItYnV0dG9uLW5leHQnLFxuICAgICAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgdmFyIHBwcCA9IDg7IC8vIFBvc3QgcGVyIHBhZ2VcbiAgICB2YXIgYXBwID0gLTE7IC8vIGFsbCBwb2RjYXN0IHBvc3RzIHBlciBwYWdlXG4gICAgdmFyIHBhZ2VOdW1iZXIgPSAxO1xuXG5mdW5jdGlvbiBsb2FkX3Bvc3RzKCl7XG4gICAgcGFnZU51bWJlcisrO1xuICAgIHZhciBzdHIgPSAnJnBhZ2VOdW1iZXI9JyArIHBhZ2VOdW1iZXIgKyAnJnBwcD0nICsgcHBwICsgJyZhY3Rpb249bW9yZV9wb3N0X2FqYXgnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhVHlwZTogXCJodG1sXCIsXG4gICAgICAgIHVybDogYWpheF9wb3N0cy5hamF4dXJsLFxuICAgICAgICBkYXRhOiBzdHIsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgdmFyICRkYXRhID0gJChkYXRhKTtcbiAgICAgICAgICAgIGlmKCRkYXRhLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgJChcIiNwb2RDb250ZW50XCIpLmFwcGVuZCgkZGF0YSk7XG4gICAgICAgICAgICAgICAgJChcIiNtb3JlX3Bvc3RzXCIpLmF0dHIoXCJkaXNhYmxlZFwiLGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAkKFwiI21vcmVfcG9zdHNcIikuYXR0cihcImRpc2FibGVkXCIsdHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gJChcIiNtb3JlX3Bvc3RzXCIpLmFkZENsYXNzKFwicmVtb3ZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvciA6IGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgJGxvYWRlci5odG1sKGpxWEhSICsgXCIgOjogXCIgKyB0ZXh0U3RhdHVzICsgXCIgOjogXCIgKyBlcnJvclRocm93bik7XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVfbG9hZF9wb3N0cygpe1xuICAgIHBhZ2VOdW1iZXIrKztcbiAgICB2YXIgc3RyID0gJyZwYWdlTnVtYmVyPScgKyBwYWdlTnVtYmVyICsgJyZwcHA9JyArIHBwcCArICcmYWN0aW9uPW1vcmVfcG9zdF9hamF4JztcbiAgICAkLmFqYXgoe1xuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YVR5cGU6IFwiaHRtbFwiLFxuICAgICAgICB1cmw6IGFqYXhfcG9zdHMuYWpheHVybCxcbiAgICAgICAgZGF0YTogc3RyLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIHZhciAkZGF0YSA9ICQoZGF0YSk7XG4gICAgICAgICAgICBpZigkZGF0YS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICQoXCIjcG9kQ29udGVudFRpdGxlc1wiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKFwiI3BvZENvbnRlbnRcIikucmVtb3ZlQ2xhc3MoXCJyZW1vdmVcIikuYWRkQ2xhc3MoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgICQoXCIjcG9kQ29udGVudFwiKS5hcHBlbmQoJGRhdGEpO1xuICAgICAgICAgICAgICAgICQoXCIjbW9yZV9wb3N0c1wiKS5hdHRyKFwiZGlzYWJsZWRcIixmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgJChcIiNtb3JlX3Bvc3RzXCIpLmF0dHIoXCJkaXNhYmxlZFwiLHRydWUpO1xuICAgICAgICAgICAgICAgIC8vICQoXCIjbW9yZV9wb3N0c1wiKS5hZGRDbGFzcyhcInJlbW92ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgOiBmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICRsb2FkZXIuaHRtbChqcVhIUiArIFwiIDo6IFwiICsgdGV4dFN0YXR1cyArIFwiIDo6IFwiICsgZXJyb3JUaHJvd24pO1xuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGxvYWRfYWxsX3Bvc3RzKCl7XG4gICAgcGFnZU51bWJlcisrO1xuICAgIHZhciBzdHIgPSAnJnBhZ2VOdW1iZXI9JyArIHBhZ2VOdW1iZXIgKyAnJnBwcD0nICsgYXBwICsgJyZhY3Rpb249YWxsX3Bvc3RfYWpheCc7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGFUeXBlOiBcImh0bWxcIixcbiAgICAgICAgdXJsOiBhamF4X3Bvc3RzLmFqYXh1cmwsXG4gICAgICAgIGRhdGE6IHN0cixcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICB2YXIgJGRhdGEgPSAkKGRhdGEpO1xuICAgICAgICAgICAgaWYoJGRhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAkKFwiI3BvZENvbnRlbnRUaXRsZXNcIikuYXBwZW5kKCRkYXRhKTtcbiAgICAgICAgICAgICAgICAkKFwiI2FsbF9wb3N0c1wiKS5hdHRyKFwiZGlzYWJsZWRcIixmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgJChcIiNhbGxfcG9zdHNcIikuYXR0cihcImRpc2FibGVkXCIsdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yIDogZnVuY3Rpb24oanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAkbG9hZGVyLmh0bWwoanFYSFIgKyBcIiA6OiBcIiArIHRleHRTdGF0dXMgKyBcIiA6OiBcIiArIGVycm9yVGhyb3duKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4gICAgJChcIiNtb3JlX3Bvc3RzXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpeyAvLyBXaGVuIGJ0biBpcyBwcmVzc2VkLlxuICAgICAgICAkKFwiI21vcmVfcG9zdHNcIikuYXR0cihcImRpc2FibGVkXCIsdHJ1ZSk7IC8vIERpc2FibGUgdGhlIGJ1dHRvbiwgdGVtcC5cbiAgICAgICAgbG9hZF9wb3N0cygpO1xuICAgICAgICAkKHRoaXMpLmluc2VydEFmdGVyKCcjcG9kQ29udGVudCcpOyAvLyBNb3ZlIHRoZSAnTG9hZCBNb3JlJyBidXR0b24gdG8gdGhlIGVuZCBvZiB0aGUgdGhlIG5ld2x5IGFkZGVkIHBvc3RzLlxuICAgIH0pO1xuXG4gICAgJChcIiNhbGxfcG9zdHNcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7IC8vIFdoZW4gYnRuIGlzIHByZXNzZWQuXG4gICAgICAgICQoXCIjYWxsX3Bvc3RzXCIpLmF0dHIoXCJkaXNhYmxlZFwiLHRydWUpOyAvLyBEaXNhYmxlIHRoZSBidXR0b24sIHRlbXAuXG4gICAgICAgIGxvYWRfYWxsX3Bvc3RzKCk7XG4gICAgICAgICQoJyNwb2RDb250ZW50JykuYWRkQ2xhc3MoJ3JlbW92ZScpO1xuICAgICAgICAkKFwiI21vcmVfcG9zdHNcIikuYWRkQ2xhc3MoXCJyZW1vdmVcIik7XG4gICAgICAgICQoXCIjYWxsX3Bvc3RzXCIpLmFkZENsYXNzKFwicmVtb3ZlXCIpO1xuICAgICAgICAkKFwiI25ld19tb3JlX3Bvc3RzXCIpLnJlbW92ZUNsYXNzKFwicmVtb3ZlXCIpO1xuICAgICAgICAkKFwiI25ld19tb3JlX3Bvc3RzXCIpLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICB9KTtcblxuICAgICQoXCIjbmV3X21vcmVfcG9zdHNcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7IC8vIFdoZW4gYnRuIGlzIHByZXNzZWQuXG4gICAgICAgICQoXCIjbW9yZV9wb3N0c1wiKS5hdHRyKFwiZGlzYWJsZWRcIix0cnVlKTsgLy8gRGlzYWJsZSB0aGUgYnV0dG9uLCB0ZW1wLlxuICAgICAgICByZV9sb2FkX3Bvc3RzKCk7XG4gICAgICAgICQodGhpcykuaW5zZXJ0QWZ0ZXIoJyNwb2RDb250ZW50Jyk7IC8vIE1vdmUgdGhlICdMb2FkIE1vcmUnIGJ1dHRvbiB0byB0aGUgZW5kIG9mIHRoZSB0aGUgbmV3bHkgYWRkZWQgcG9zdHMuXG4gICAgfSk7XG5cbn0oalF1ZXJ5LCB3aW5kb3cpKTtcblxuXG4gIFxuICAgIC8vICQoXCIjcmVwZWF0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAkY29udGVudC5hcHBlbmQoJGNyb3NzQnV0dG9uLmNsb25lKHRydWUpLnJlbW92ZUF0dHIoXCJpZFwiKSk7XG4gICAgLy8gICAkY29udGVudC5hcHBlbmQoXG4gICAgLy8gICAgICRvcmlnaW5hbC5jbG9uZSh0cnVlKVxuICAgIC8vICAgICAuaGlkZSgpIC8vIGlmIHNsaWRpbmdcbiAgICAvLyAgICAgLmF0dHIoXCJpZFwiLCRvcmlnaW5hbC5hdHRyKFwiaWRcIikrJGNvbnRlbnQuZmluZChcImJ1dHRvbi5jcm9zc1wiKS5sZW5ndGgpXG4gICAgLy8gICAgIC5zbGlkZURvd24oXCJzbG93XCIpIC8vIGRvZXMgbm90IHNsaWRlIG11Y2ggc28gcmVtb3ZlIGlmIHlvdSBkbyBub3QgbGlrZSBpdFxuICAgIC8vICAgKTtcbiAgICAvLyB9KTtcblxuICAgIC8vIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy9cbiAgICAvLyAvKiBPbiBpc290b3BlIHYyIGhpZGRlbiBjbGFzcyBpcyBub3QgZGVmaW5lZC5cbiAgICAvLyAgQWRkIGhpZGRlbiBjbGFzcyBpZiBpdGVtIGhpZGRlbiwgYmVmb3JlIGluaXRpYWxpc2luZyBJc290b3BlOiAqL1xuICAgIC8vIHZhciBpdGVtUmV2ZWFsID0gSXNvdG9wZS5JdGVtLnByb3RvdHlwZS5yZXZlYWw7XG4gICAgLy8gSXNvdG9wZS5JdGVtLnByb3RvdHlwZS5yZXZlYWwgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgaXRlbVJldmVhbC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgLy8gICAgICQoIHRoaXMuZWxlbWVudCApLnJlbW92ZUNsYXNzKCdpc290b3BlLWhpZGRlbicpO1xuICAgIC8vIH07XG4gICAgLy8gdmFyIGl0ZW1IaWRlID0gSXNvdG9wZS5JdGVtLnByb3RvdHlwZS5oaWRlO1xuICAgIC8vIElzb3RvcGUuSXRlbS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICBpdGVtSGlkZS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgLy8gICAgICQoIHRoaXMuZWxlbWVudCApLmFkZENsYXNzKCdpc290b3BlLWhpZGRlbicpOyB9O1xuICAgIC8vXG4gICAgLy8gLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIGpRdWVyeShmdW5jdGlvbiAoJCkge1xuLy8gLy8gaW5pdGlhbGl6ZSBJc290b3BlIGFmdGVyIGFsbCBpbWFnZXMgaGF2ZSBsb2FkZWRcbi8vICAgICB2YXIgJGNvbnRhaW5lciA9ICQoJyNwb2RjYXN0cycpLmltYWdlc0xvYWRlZCggZnVuY3Rpb24oKSB7IC8vVGhlIElEIGZvciB0aGUgbGlzdCB3aXRoIGFsbCB0aGUgYmxvZyBwb3N0c1xuLy8gICAgICAgICAkY29udGFpbmVyLmlzb3RvcGUoeyAvL0lzb3RvcGUgb3B0aW9ucywgJ2l0ZW0nIG1hdGNoZXMgdGhlIGNsYXNzIGluIHRoZSBQSFBcbi8vICAgICAgICAgICAgIGl0ZW1TZWxlY3RvciA6ICcucG9kY2FzdCcsXG4vLyAgICAgICAgICAgICBsYXlvdXRNb2RlOiAndmVydGljYWwnXG4vLyAgICAgICAgICAgICAvKmdyaWQ6IHtcbi8vICAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aDogMjAwXG4vLyAgICAgICAgICAgICB9Ki9cbi8vICAgICAgICAgfSk7XG4vLyAgICAgfSk7XG4vL1xuLy8gICAgIC8vQWRkIHRoZSBjbGFzcyBzZWxlY3RlZCB0byB0aGUgaXRlbSB0aGF0IGlzIGNsaWNrZWQsIGFuZCByZW1vdmUgZnJvbSB0aGUgb3RoZXJzXG4vLyAgICAgdmFyICRvcHRpb25TZXRzID0gJCgnI2ZpbHRlcnMnKSxcbi8vICAgICAgICAgJG9wdGlvbkxpbmtzID0gJG9wdGlvblNldHMuZmluZCgnYScpO1xuLy9cbi8vICAgICAkb3B0aW9uTGlua3MuY2xpY2soZnVuY3Rpb24oKXtcbi8vICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbi8vICAgICAgICAgLy8gZG9uJ3QgcHJvY2VlZCBpZiBhbHJlYWR5IHNlbGVjdGVkXG4vLyAgICAgICAgIGlmICggJHRoaXMuaGFzQ2xhc3MoJ3NlbGVjdGVkJykgKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgdmFyICRvcHRpb25TZXQgPSAkdGhpcy5wYXJlbnRzKCcjZmlsdGVycycpO1xuLy8gICAgICAgICAkb3B0aW9uU2V0cy5maW5kKCcuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbi8vICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4vL1xuLy8gICAgICAgICAvL1doZW4gYW4gaXRlbSBpcyBjbGlja2VkLCBzb3J0IHRoZSBpdGVtcy5cbi8vICAgICAgICAgdmFyIHNlbGVjdG9yID0gJCh0aGlzKS5hdHRyKCdkYXRhLWZpbHRlcicpO1xuLy8gICAgICAgICAkY29udGFpbmVyLmlzb3RvcGUoeyBmaWx0ZXI6IHNlbGVjdG9yIH0pO1xuLy9cbi8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgIH0pO1xuLy9cbi8vIH0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGY4O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lJaXdpYzI5MWNtTmxjeUk2V3lKamRYTjBiMjB1YW5NaVhTd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeW9oWEc0Z0tpQlBibVVnUTI5dVpteDFaVzVqWlNBdElGZHZjbVJRY21WemN5QlVhR1Z0WlZ4dUlDcGNiaUFxTDF4dU95aG1kVzVqZEdsdmJpZ2tMQ0IzYVc1a2IzY3NJSFZ1WkdWbWFXNWxaQ2w3WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCRGFHVmpheUJoSUdoeVpXWWdabTl5SUdGdUlHRnVZMmh2Y2k0Z1NXWWdaWGhwYzNSekxDQmhibVFnYVc0Z1pHOWpkVzFsYm5Rc0lITmpjbTlzYkNCMGJ5QnBkQzVjYmlBZ0lDQWdLaUJKWmlCb2NtVm1JR0Z5WjNWdFpXNTBJRzl0YldsMFpXUXNJR0Z6YzNWdFpYTWdZMjl1ZEdWNGRDQW9kR2hwY3lrZ2FYTWdTRlJOVENCRmJHVnRaVzUwTEZ4dUlDQWdJQ0FxSUhkb2FXTm9JSGRwYkd3Z1ltVWdkR2hsSUdOaGMyVWdkMmhsYmlCcGJuWnZhMlZrSUdKNUlHcFJkV1Z5ZVNCaFpuUmxjaUJoYmlCbGRtVnVkRnh1SUNBZ0lDQXFMMXh1SUNBZ0lHWjFibU4wYVc5dUlITmpjbTlzYkY5cFpsOWhibU5vYjNJb2FISmxaaWtnZTF4dUlDQWdJQ0FnSUNCb2NtVm1JRDBnZEhsd1pXOW1LR2h5WldZcElEMDlJRndpYzNSeWFXNW5YQ0lnUHlCb2NtVm1JRG9nSkNoMGFHbHpLUzVoZEhSeUtGd2lhSEpsWmx3aUtUdGNibHh1SUNBZ0lDQWdJQ0F2THlCWmIzVWdZMjkxYkdRZ1pXRnphV3g1SUdOaGJHTjFiR0YwWlNCMGFHbHpJR1I1Ym1GdGFXTmhiR3g1SUdsbUlIbHZkU0J3Y21WbVpYSmNiaUFnSUNBZ0lDQWdkbUZ5SUdaeWIyMVViM0FnUFNBd08xeHVYRzRnSUNBZ0lDQWdJQzh2SUVsbUlHOTFjaUJJY21WbUlIQnZhVzUwY3lCMGJ5QmhJSFpoYkdsa0xDQnViMjR0Wlcxd2RIa2dZVzVqYUc5eUxDQmhibVFnYVhNZ2IyNGdkR2hsSUhOaGJXVWdjR0ZuWlNBb1pTNW5MaUFqWm05dktWeHVJQ0FnSUNBZ0lDQXZMeUJNWldkaFkza2dhbEYxWlhKNUlHRnVaQ0JKUlRjZ2JXRjVJR2hoZG1VZ2FYTnpkV1Z6T2lCb2RIUndPaTh2YzNSaFkydHZkbVZ5Wm14dmR5NWpiMjB2Y1M4eE5Ua3pNVGMwWEc0Z0lDQWdJQ0FnSUdsbUtHaHlaV1l1YVc1a1pYaFBaaWhjSWlOY0lpa2dQVDBnTUNBZ0ppWWdhSEpsWmlBaFBTQW5JMjE1VFc5a1lXd25LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnSkhSaGNtZGxkQ0E5SUNRb2FISmxaaWs3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUU5c1pHVnlJR0p5YjNkelpYSWdkMmwwYUc5MWRDQndkWE5vVTNSaGRHVWdiV2xuYUhRZ1pteHBZMnRsY2lCb1pYSmxMQ0JoY3lCMGFHVjVJRzF2YldWdWRHRnlhV3g1WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJxZFcxd0lIUnZJSFJvWlNCM2NtOXVaeUJ3YjNOcGRHbHZiaUFvU1VVZ1BDQXhNQ2xjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1LQ1IwWVhKblpYUXViR1Z1WjNSb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKQ2duYUhSdGJDd2dZbTlrZVNjcExtRnVhVzFoZEdVb2V5QnpZM0p2Ykd4VWIzQTZJQ1IwWVhKblpYUXViMlptYzJWMEtDa3VkRzl3SUMwZ1puSnZiVlJ2Y0NCOUxDQmNJbk5zYjNkY0lpazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lvYUdsemRHOXllU0FtSmlCY0luQjFjMmhUZEdGMFpWd2lJR2x1SUdocGMzUnZjbmtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhR2x6ZEc5eWVTNXdkWE5vVTNSaGRHVW9lMzBzSUdSdlkzVnRaVzUwTG5ScGRHeGxMQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVjR0YwYUc1aGJXVWdLeUJvY21WbUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklGZG9aVzRnYjNWeUlIQmhaMlVnYkc5aFpITXNJR05vWldOcklIUnZJSE5sWlNCcFppQnBkQ0JqYjI1MFlXbHVjeUJoYm1RZ1lXNWphRzl5WEc0Z0lDQWdjMk55YjJ4c1gybG1YMkZ1WTJodmNpaDNhVzVrYjNjdWJHOWpZWFJwYjI0dWFHRnphQ2s3WEc1Y2JpOHZJRWx1ZEdWeVkyVndkQ0JoYkd3Z1lXNWphRzl5SUdOc2FXTnJjMXh1WEc0Z0lDQWdKQ2hjSW1KdlpIbGNJaWt1YjI0b1hDSmpiR2xqYTF3aUxDQmNJbUZjSWl3Z2MyTnliMnhzWDJsbVgyRnVZMmh2Y2lrN1hHNWNiaUFnSUNBdkwyRmtaQ0JqYkdGemN5QnpkR2xqYXlCMGJ5QjBhR1VnY21sbmFIUWdjMmxrWldKaGNpQjNhR1Z1SUhSb1pTQndiMlJEYjI1MFpXNTBJR052Ym5SaGFXNWxjaUJuWlhSeklERXdNQ0J3YVhobGJITWdabkp2YlNCMGFHVWdkRzl3SUc5bUlIUm9aU0IzYVc1a2IzZGNiaUFnSUNCMllYSWdabWw0VW1sbmFIUlRhV1JsWW1GeVQyNVRZM0p2Ykd3Z1BTQnVaWGNnVjJGNWNHOXBiblFvZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkdWdFpXNTBPaUJrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDZ25jRzlrUTI5dWRHVnVkQ2NwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdhR0Z1Wkd4bGNqb2dablZ1WTNScGIyNGdLR1JwY21WamRHbHZiaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktHUnBjbVZqZEdsdmJpazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dScGNtVmpkR2x2YmlBOVBUMGdKMlJ2ZDI0bktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNRb0p5TnlhV2RvZEMxemFXUmxZbUZ5SnlrdVlXUmtRMnhoYzNNb0ozTjBhV05ySnlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvSnlOeWFXZG9kQzF6YVdSbFltRnlKeWt1Y21WdGIzWmxRMnhoYzNNb0ozVnVMWE4wYVdOckp5azdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJVZ2UxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdJQ0FnSUc5bVpuTmxkRG9nSnpFd01DZGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDazdYRzVjYmlBZ0lDQjJZWElnZFc1R2FYaFNhV2RvZEZOcFpHVmlZWEpQYmxOamNtOXNiQ0E5SUc1bGR5QlhZWGx3YjJsdWRDaDdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHVnNaVzFsYm5RNklHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Nkd2IyUkRiMjUwWlc1MEp5a3NYRzRnSUNBZ0lDQWdJQ0FnSUNCb1lXNWtiR1Z5T2lCbWRXNWpkR2x2YmlBb1pHbHlaV04wYVc5dUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvWkdseVpXTjBhVzl1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9aR2x5WldOMGFXOXVJRDA5UFNBbmRYQW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9KeU55YVdkb2RDMXphV1JsWW1GeUp5a3VjbVZ0YjNabFEyeGhjM01vSjNOMGFXTnJKeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9KeU55YVdkb2RDMXphV1JsWW1GeUp5a3VZV1JrUTJ4aGMzTW9KM1Z1TFhOMGFXTnJKeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHOW1abk5sZERvZ0p6RXdNQ2RjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ2s3WEc1Y2JpQWdJQ0F2TDFkb1pXNGdkR2hsSUdkaGJHeGxjbmtnWTI5dFpYTWdhVzUwYnlCMmFXVjNJSFZ1TFhOMGFXTnJJSFJvWlNCeWFXZG9kQ0J6YVdSbFltRnlYRzRnSUNBZ2RtRnlJRVpwZUZKcFoyaDBVMmxrWldKaGNrOXVVMk55YjJ4c01pQTlJRzVsZHlCWFlYbHdiMmx1ZENoN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUdWc1pXMWxiblE2SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLQ2RuWVd4c1pYSjVKeWtzWEc0Z0lDQWdJQ0FnSUNBZ0lDQm9ZVzVrYkdWeU9pQm1kVzVqZEdsdmJpQW9aR2x5WldOMGFXOXVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMyOXNaUzVzYjJjb1pHbHlaV04wYVc5dUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWkdseVpXTjBhVzl1SUQwOVBTQW5aRzkzYmljcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkNnbkkzSnBaMmgwTFhOcFpHVmlZWEluS1M1eVpXMXZkbVZEYkdGemN5Z25jM1JwWTJzbktUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSkNnbkkzSnBaMmgwTFhOcFpHVmlZWEluS1M1aFpHUkRiR0Z6Y3lnbmRXNHRjM1JwWTJzbktUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaV3h6WlNCN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnYjJabWMyVjBPaUFuT1RBbEoxeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0tUdGNibHh1SUNBZ0lIWmhjaUIxYmtacGVGSnBaMmgwVTJsa1pXSmhjazl1VTJOeWIyeHNNaUE5SUc1bGR5QlhZWGx3YjJsdWRDaDdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHVnNaVzFsYm5RNklHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0NkbllXeHNaWEo1Snlrc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JvWVc1a2JHVnlPaUJtZFc1amRHbHZiaUFvWkdseVpXTjBhVzl1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjMjlzWlM1c2IyY29aR2x5WldOMGFXOXVLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1pHbHlaV04wYVc5dUlEMDlQU0FuZFhBbktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNRb0p5TnlhV2RvZEMxemFXUmxZbUZ5SnlrdWNtVnRiM1psUTJ4aGMzTW9KM1Z1TFhOMGFXTnJKeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9KeU55YVdkb2RDMXphV1JsWW1GeUp5a3VZV1JrUTJ4aGMzTW9KM04wYVdOckp5azdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzYzJVZ2UxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdJQ0FnSUc5bVpuTmxkRG9nSnprd0pTZGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDazdYRzVjYmlBZ0lDQXZMM1JvWlhObElIUjNieUIzWVhsd2IybHVkSE1nWVhKbElHWnZjaUIwYUdVZ1VHOWtZMkZ6ZENCMGQyOGdZMjlzZFcxdUlHbHVjblJsY21sdmNpQndZV2RsY3k0Z0lGZG9aVzRnWm05dmRHVnlJR052YldWeklHbHVkRzhnZG1sbGR5QjFiaTF6ZEdsamF5QjBhR1VnY21sbmFIUWdjMmxrWldKaGNseHVJQ0FnSUhaaGNpQkdhWGhTYVdkb2RGTnBaR1ZpWVhKUGJsTmpjbTlzYkRNZ1BTQnVaWGNnVjJGNWNHOXBiblFvZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JsYkdWdFpXNTBPaUJrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDZ25jSFZ5Y0c5elpTMWliM1IwYjIwbktTeGNiaUFnSUNBZ0lDQWdJQ0FnSUdoaGJtUnNaWEk2SUdaMWJtTjBhVzl1SUNoa2FYSmxZM1JwYjI0cElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWhrYVhKbFkzUnBiMjRwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaGthWEpsWTNScGIyNGdQVDA5SUNka2IzZHVKeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtLQ2NqY21sbmFIUXRjMmxrWldKaGNpY3BMbkpsYlc5MlpVTnNZWE56S0NkemRHbGpheWNwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtLQ2NqY21sbmFIUXRjMmxrWldKaGNpY3BMbUZrWkVOc1lYTnpLQ2QxYmkxemRHbGpheWNwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJITmxJSHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnZabVp6WlhRNklDYzVNQ1VuWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FwTzF4dVhHNGdJQ0FnZG1GeUlIVnVSbWw0VW1sbmFIUlRhV1JsWW1GeVQyNVRZM0p2Ykd3eklEMGdibVYzSUZkaGVYQnZhVzUwS0h0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnWld4bGJXVnVkRG9nWkc5amRXMWxiblF1WjJWMFJXeGxiV1Z1ZEVKNVNXUW9KM0IxY25CdmMyVXRZbTkwZEc5dEp5a3NYRzRnSUNBZ0lDQWdJQ0FnSUNCb1lXNWtiR1Z5T2lCbWRXNWpkR2x2YmlBb1pHbHlaV04wYVc5dUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvWkdseVpXTjBhVzl1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9aR2x5WldOMGFXOXVJRDA5UFNBbmRYQW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUW9KeU55YVdkb2RDMXphV1JsWW1GeUp5a3VjbVZ0YjNabFEyeGhjM01vSjNWdUxYTjBhV05ySnlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1FvSnlOeWFXZG9kQzF6YVdSbFltRnlKeWt1WVdSa1EyeGhjM01vSjNOMGFXTnJKeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHOW1abk5sZERvZ0p6a3dKU2RjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ2s3WEc1Y2JpQWdJQ0F2S2lCTllXZHVhV1pwWXlCUWIzQjFjQ0FxTDF4dVhHNGdJQ0FnSkNnbkxtZGhiR3hsY25rdGFYUmxiU2NwTG0xaFoyNXBabWxqVUc5d2RYQW9lMXh1SUNBZ0lDQWdJQ0JrWld4bFoyRjBaVG9nSjJFbkxDQXZMeUJqYUdsc1pDQnBkR1Z0Y3lCelpXeGxZM1J2Y2l3Z1lua2dZMnhwWTJ0cGJtY2diMjRnYVhRZ2NHOXdkWEFnZDJsc2JDQnZjR1Z1WEc0Z0lDQWdJQ0FnSUhSNWNHVTZJQ2RwYldGblpTY3NYRzRnSUNBZ0lDQWdJR05zYjNObFQyNURiMjUwWlc1MFEyeHBZMnM2SUhSeWRXVXNYRzRnSUNBZ0lDQWdJR05zYjNObFFuUnVTVzV6YVdSbE9pQm1ZV3h6WlN4Y2JpQWdJQ0FnSUNBZ1oyRnNiR1Z5ZVRvZ2V5QmxibUZpYkdWa09uUnlkV1VnZlZ4dUlDQWdJQ0FnSUNBdkx5QnZkR2hsY2lCdmNIUnBiMjV6WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0FrS0NjdWNISnZhbVZqZEVkaGJHeGxjbmxKZEdWdEp5a3ViV0ZuYm1sbWFXTlFiM0IxY0NoN1hHNGdJQ0FnSUNBZ0lHUmxiR1ZuWVhSbE9pQW5ZU2NzSUM4dklHTm9hV3hrSUdsMFpXMXpJSE5sYkdWamRHOXlMQ0JpZVNCamJHbGphMmx1WnlCdmJpQnBkQ0J3YjNCMWNDQjNhV3hzSUc5d1pXNWNiaUFnSUNBZ0lDQWdkSGx3WlRvZ0oybHRZV2RsSnl4Y2JpQWdJQ0FnSUNBZ1kyeHZjMlZQYmtOdmJuUmxiblJEYkdsamF6b2dkSEoxWlN4Y2JpQWdJQ0FnSUNBZ1kyeHZjMlZDZEc1SmJuTnBaR1U2SUdaaGJITmxMRnh1SUNBZ0lDQWdJQ0JuWVd4c1pYSjVPaUI3SUdWdVlXSnNaV1E2ZEhKMVpTQjlYRzRnSUNBZ0lDQWdJQzh2SUc5MGFHVnlJRzl3ZEdsdmJuTmNiaUFnSUNCOUtUdGNibHh1SUNBZ0lDOHZJRU5oY205MWMyVnNjMXh1WEc0Z0lDQWdKQ2hjSWlOMFpXRnRJQzV2ZDJ3dFkyRnliM1Z6Wld4Y0lpa3ViM2RzUTJGeWIzVnpaV3dvZTF4dUlDQWdJQ0FnSUNCcGRHVnRjem9nTVN4Y2JpQWdJQ0FnSUNBZ2JXRnlaMmx1T2lBd0xGeHVJQ0FnSUNBZ0lDQnNiMjl3T2lCMGNuVmxMRnh1SUNBZ0lDQWdJQ0JrYjNSek9pQm1ZV3h6WlN4Y2JpQWdJQ0FnSUNBZ2JtRjJPaUIwY25WbExGeHVJQ0FnSUNBZ0lDQnVZWFpVWlhoME9pQmJKenhwSUdOc1lYTnpQVndpWm1FZ1ptRXRZMkZ5WlhRdGJHVm1kQ0JtWVMweWVGd2lQand2YVQ0OGMzQmhiaUJqYkdGemN6MWNJbTVsZUhRdGNISmxkaUJvYVdSa1pXNHRjMjBnYUdsa1pHVnVMWGh6WENJK1VISmxkbWx2ZFhNOEwzTndZVzQrSUNjc0p6eHpjR0Z1SUdOc1lYTnpQVndpYm1WNGRDMXdjbVYySUdocFpHUmxiaTF6YlNCb2FXUmtaVzR0ZUhOY0lqNU9aWGgwUEM5emNHRnVQanhwSUdOc1lYTnpQVndpWm1FZ1ptRXRZMkZ5WlhRdGNtbG5hSFFnWm1FdE1uaGNJajQ4TDJrK0oxMWNiaUFnSUNCOUtUdGNibHh1SUNBZ0lDUW9YQ0lqWjJGc2JHVnllU0F1YjNkc0xXTmhjbTkxYzJWc1hDSXBMbTkzYkVOaGNtOTFjMlZzS0h0Y2JpQWdJQ0FnSUNBZ0x5OXBkR1Z0Y3pvZ05DeGNiaUFnSUNBZ0lDQWdiV0Z5WjJsdU9pQXpNQ3hjYmlBZ0lDQWdJQ0FnTHk5aGRYUnZWMmxrZEdnNlptRnNjMlVzWEc0Z0lDQWdJQ0FnSUd4dmIzQTZJSFJ5ZFdVc1hHNGdJQ0FnSUNBZ0lHUnZkSE02SUdaaGJITmxMRnh1SUNBZ0lDQWdJQ0J1WVhZNklIUnlkV1VzWEc0Z0lDQWdJQ0FnSUc1aGRsUmxlSFE2SUZzblBITndZVzRnWTJ4aGMzTTlYQ0puYkhsd2FHbGpiMjRnWjJ4NWNHaHBZMjl1TFhSeWFXRnVaMnhsTFd4bFpuUmNJaUJ6ZEhsc1pUMWNJbU52Ykc5eU9pTmpOekkxTkdVN1ltRmphMmR5YjNWdVpDMWpiMnh2Y2pwMGNtRnVjM0JoY21WdWREdGNJajQ4TDNOd1lXNCtJQ2NzSnp4emNHRnVJR05zWVhOelBWd2laMng1Y0docFkyOXVJR2RzZVhCb2FXTnZiaTEwY21saGJtZHNaUzF5YVdkb2RGd2lJSE4wZVd4bFBWd2lZMjlzYjNJNkkyTTNNalUwWlR0aVlXTnJaM0p2ZFc1a0xXTnZiRzl5T25SeVlXNXpjR0Z5Wlc1ME8xd2lQand2YzNCaGJqNG5YU3hjYmlBZ0lDQWdJQ0FnY21WemNHOXVjMmwyWlVOc1lYTnpPblJ5ZFdVc1hHNGdJQ0FnSUNBZ0lISmxjM0J2Ym5OcGRtVTZlMXh1SUNBZ0lDQWdJQ0FnSUNBZ01EcDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhWFJsYlhNNk1TeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnVZWFk2ZEhKMVpWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJRFl3TURwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FYUmxiWE02TWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCdVlYWTZkSEoxWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lERXdNREE2ZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsMFpXMXpPalFzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYm1GMk9uUnlkV1ZjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMHBPMXh1WEc0Z0lDQWdMeW9nSUZOamNtOXNiQ0IwYnlCMGIzQmNiaUFnSUNBdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwZ0tpOWNiaUFnSUNBa0tGd2lZVnRvY21WbVBTY2pjR0ZuWlMxMGIzQW5YVndpS1M1amJHbGpheWhtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDUW9YQ0pvZEcxc0xDQmliMlI1WENJcExtRnVhVzFoZEdVb2UzTmpjbTlzYkZSdmNEb2dNSDBzSUZ3aWMyeHZkMXdpS1R0Y2JpQWdJQ0FnSUNBZ0x5OGdJQ0FnSUNBZ0lDUW9YQ0pvZEcxc0xDQmliMlI1WENJcExtRnVhVzFoZEdVb2UzTmpjbTlzYkZSdmNEb2dNSDBzSUh0a2RYSmhkR2x2YmpvZ01UQXdNSDBwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ2ZTazdYRzVjYmlBZ0lDQXZMeUF2THowOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVnh1SUNBZ0lDOHZYRzRnSUNBZ0x5OGdMeW9nVDI0Z2FYTnZkRzl3WlNCMk1pQm9hV1JrWlc0Z1kyeGhjM01nYVhNZ2JtOTBJR1JsWm1sdVpXUXVYRzRnSUNBZ0x5OGdJRUZrWkNCb2FXUmtaVzRnWTJ4aGMzTWdhV1lnYVhSbGJTQm9hV1JrWlc0c0lHSmxabTl5WlNCcGJtbDBhV0ZzYVhOcGJtY2dTWE52ZEc5d1pUb2dLaTljYmlBZ0lDQXZMeUIyWVhJZ2FYUmxiVkpsZG1WaGJDQTlJRWx6YjNSdmNHVXVTWFJsYlM1d2NtOTBiM1I1Y0dVdWNtVjJaV0ZzTzF4dUlDQWdJQzh2SUVsemIzUnZjR1V1U1hSbGJTNXdjbTkwYjNSNWNHVXVjbVYyWldGc0lEMGdablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdMeThnSUNBZ0lHbDBaVzFTWlhabFlXd3VZWEJ3Ykhrb0lIUm9hWE1zSUdGeVozVnRaVzUwY3lBcE8xeHVJQ0FnSUM4dklDQWdJQ0FrS0NCMGFHbHpMbVZzWlcxbGJuUWdLUzV5WlcxdmRtVkRiR0Z6Y3lnbmFYTnZkRzl3WlMxb2FXUmtaVzRuS1R0Y2JpQWdJQ0F2THlCOU8xeHVJQ0FnSUM4dklIWmhjaUJwZEdWdFNHbGtaU0E5SUVsemIzUnZjR1V1U1hSbGJTNXdjbTkwYjNSNWNHVXVhR2xrWlR0Y2JpQWdJQ0F2THlCSmMyOTBiM0JsTGtsMFpXMHVjSEp2ZEc5MGVYQmxMbWhwWkdVZ1BTQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQXZMeUFnSUNBZ2FYUmxiVWhwWkdVdVlYQndiSGtvSUhSb2FYTXNJR0Z5WjNWdFpXNTBjeUFwTzF4dUlDQWdJQzh2SUNBZ0lDQWtLQ0IwYUdsekxtVnNaVzFsYm5RZ0tTNWhaR1JEYkdGemN5Z25hWE52ZEc5d1pTMW9hV1JrWlc0bktUc2dmVHRjYmlBZ0lDQXZMMXh1SUNBZ0lDOHZJQzh2UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVhHNWNibHh1WEc0dkx5QnFVWFZsY25rb1puVnVZM1JwYjI0Z0tDUXBJSHRjYmk4dklDOHZJR2x1YVhScFlXeHBlbVVnU1hOdmRHOXdaU0JoWm5SbGNpQmhiR3dnYVcxaFoyVnpJR2hoZG1VZ2JHOWhaR1ZrWEc0dkx5QWdJQ0FnZG1GeUlDUmpiMjUwWVdsdVpYSWdQU0FrS0NjamNHOWtZMkZ6ZEhNbktTNXBiV0ZuWlhOTWIyRmtaV1FvSUdaMWJtTjBhVzl1S0NrZ2V5QXZMMVJvWlNCSlJDQm1iM0lnZEdobElHeHBjM1FnZDJsMGFDQmhiR3dnZEdobElHSnNiMmNnY0c5emRITmNiaTh2SUNBZ0lDQWdJQ0FnSkdOdmJuUmhhVzVsY2k1cGMyOTBiM0JsS0hzZ0x5OUpjMjkwYjNCbElHOXdkR2x2Ym5Nc0lDZHBkR1Z0SnlCdFlYUmphR1Z6SUhSb1pTQmpiR0Z6Y3lCcGJpQjBhR1VnVUVoUVhHNHZMeUFnSUNBZ0lDQWdJQ0FnSUNCcGRHVnRVMlZzWldOMGIzSWdPaUFuTG5CdlpHTmhjM1FuTEZ4dUx5OGdJQ0FnSUNBZ0lDQWdJQ0FnYkdGNWIzVjBUVzlrWlRvZ0ozWmxjblJwWTJGc0oxeHVMeThnSUNBZ0lDQWdJQ0FnSUNBZ0x5cG5jbWxrT2lCN1hHNHZMeUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjlzZFcxdVYybGtkR2c2SURJd01GeHVMeThnSUNBZ0lDQWdJQ0FnSUNBZ2ZTb3ZYRzR2THlBZ0lDQWdJQ0FnSUgwcE8xeHVMeThnSUNBZ0lIMHBPMXh1THk5Y2JpOHZJQ0FnSUNBdkwwRmtaQ0IwYUdVZ1kyeGhjM01nYzJWc1pXTjBaV1FnZEc4Z2RHaGxJR2wwWlcwZ2RHaGhkQ0JwY3lCamJHbGphMlZrTENCaGJtUWdjbVZ0YjNabElHWnliMjBnZEdobElHOTBhR1Z5YzF4dUx5OGdJQ0FnSUhaaGNpQWtiM0IwYVc5dVUyVjBjeUE5SUNRb0p5Tm1hV3gwWlhKekp5a3NYRzR2THlBZ0lDQWdJQ0FnSUNSdmNIUnBiMjVNYVc1cmN5QTlJQ1J2Y0hScGIyNVRaWFJ6TG1acGJtUW9KMkVuS1R0Y2JpOHZYRzR2THlBZ0lDQWdKRzl3ZEdsdmJreHBibXR6TG1Oc2FXTnJLR1oxYm1OMGFXOXVLQ2w3WEc0dkx5QWdJQ0FnSUNBZ0lIWmhjaUFrZEdocGN5QTlJQ1FvZEdocGN5azdYRzR2THlBZ0lDQWdJQ0FnSUM4dklHUnZiaWQwSUhCeWIyTmxaV1FnYVdZZ1lXeHlaV0ZrZVNCelpXeGxZM1JsWkZ4dUx5OGdJQ0FnSUNBZ0lDQnBaaUFvSUNSMGFHbHpMbWhoYzBOc1lYTnpLQ2R6Wld4bFkzUmxaQ2NwSUNrZ2UxeHVMeThnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1THk4Z0lDQWdJQ0FnSUNCOVhHNHZMeUFnSUNBZ0lDQWdJSFpoY2lBa2IzQjBhVzl1VTJWMElEMGdKSFJvYVhNdWNHRnlaVzUwY3lnbkkyWnBiSFJsY25NbktUdGNiaTh2SUNBZ0lDQWdJQ0FnSkc5d2RHbHZibE5sZEhNdVptbHVaQ2duTG5ObGJHVmpkR1ZrSnlrdWNtVnRiM1psUTJ4aGMzTW9KM05sYkdWamRHVmtKeWs3WEc0dkx5QWdJQ0FnSUNBZ0lDUjBhR2x6TG1Ga1pFTnNZWE56S0NkelpXeGxZM1JsWkNjcE8xeHVMeTljYmk4dklDQWdJQ0FnSUNBZ0x5OVhhR1Z1SUdGdUlHbDBaVzBnYVhNZ1kyeHBZMnRsWkN3Z2MyOXlkQ0IwYUdVZ2FYUmxiWE11WEc0dkx5QWdJQ0FnSUNBZ0lIWmhjaUJ6Wld4bFkzUnZjaUE5SUNRb2RHaHBjeWt1WVhSMGNpZ25aR0YwWVMxbWFXeDBaWEluS1R0Y2JpOHZJQ0FnSUNBZ0lDQWdKR052Ym5SaGFXNWxjaTVwYzI5MGIzQmxLSHNnWm1sc2RHVnlPaUJ6Wld4bFkzUnZjaUI5S1R0Y2JpOHZYRzR2THlBZ0lDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaTh2SUNBZ0lDQjlLVHRjYmk4dlhHNHZMeUI5S1R0Y2JuMG9hbEYxWlhKNUxDQjNhVzVrYjNjcEtUdGNibHh1SWwwc0ltWnBiR1VpT2lKamRYTjBiMjB1YW5NaWZRPT1cbiJdLCJmaWxlIjoiY3VzdG9tLmpzIn0=
