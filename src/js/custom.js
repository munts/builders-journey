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
