<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 9/25/20
 * Time: 2:55 PM
 */

get_header('three');
?>

    <section id="passion" class="" style="padding-bottom:200px;min-height:800px">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-4" style="padding: 0 30px;margin-top:-40px;">
                    <img src="/wp-content/themes/one-confluence/assets/T_V_Sketch-alex.png" class="img-responsive">
                </div>
                <div class="col-xs-12 col-sm-4" style="padding:30px">
                    <div class="quote-subheading clearfix" style="padding:45px 90px"></div>
                    <div class="welcome-quote" style="font-family:'Montserrat' !important;font-weight:300;font-size:18px;color:#666666;line-height:24px;font-style:normal;text-align:center;padding:0 15px;">
                    If you've ever wondered what it was like to live, work and play in a world class 
                    community high atop the Rockies, here's your chance. There might be some twist and turns along the way, so 
                    buckle up for your safety and welcome to the journey.
                    <div style="display:block;margin-top:31px;"><a class="" href="#podcast-section"><img src="/wp-content/themes/one-confluence/assets/watchhere.png"></a></div>
                    </div>
                    
                </div>
                <div class="col-xs-12 col-sm-4" style="padding:115px 15px;">
                    <div class="video-responsive">
                        <iframe width="420" height="315" src="https://player.vimeo.com/video/463089161" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div style="text-align: center;padding-top:10px;">
                        <h2>The Builder’s Journey – T.V.</h2>
                        <div class="small">Sponsored By</div>
                        <h2>Plumb Kendall Solutions</h2>
                    </div>
                </div>
            </div>

            <div id="latest-cta" class="row">
                <div class="col-xs-12" style="text-align:center;">
                    <!-- <div style="display:inline-block;"><a class="btn btn-primary" href="#podcasts">Latest Episodes<br><img src="/wp-content/themes/one-confluence/assets/icons8-chevron-down-24.png"></a></div> -->

                </div>
            </div>
        </div>

    </section>

<div id="podcast-section" class="container blog-content">
    <div class="row">
        <div class="col-xs-12 centered" style="padding-bottom:30px;">

        </div>
    </div>
    <div class="row">
        <div id="podContent" class="col-xs-12 col-sm-9" style="border-right:1px solid #595958;">
            <?php
            //use wp_query to get cpts and order by post order attributes

            $vidResults = new WP_Query(array(
                'post_type' => 'vids',
                //'cat' => 17,
                'posts_per_page' => 8,
                'order_by' => 'menu_order',
                'order' => 'DESC',
                'post_status' => 'publish',
            ));
            $vidPosts = $vidResults->get_posts();

            //loop through results set
            foreach ($vidPosts as $vidPost) {
                /*
                Pull category for each unique post using the ID
                */
                $terms = get_the_terms( $vidPost->ID, 'video_categories' );
                if ( $terms && ! is_wp_error( $terms ) ) :
                    $links = array();
                    foreach ( $terms as $term ) {

                        $links[] = $term->name;

                    }
                    $tax_links = join( " ", str_replace(' ', '-', $links));
                    $tax = strtolower($tax_links);
                else :
                    $tax = '';
                endif;
                $vidTitle = get_the_title($vidPost);
                $vidUrl = get_permalink($vidPost);
                $vidContent = get_the_content($vidPost);
                $vidExcerpt = get_the_excerpt($vidPost->ID);
                $featured_img_url = get_the_post_thumbnail_url($vidPost->ID,'thumb');
                $vidImageUrl = the_post_thumbnail('thumbnail');
                $vidImageUrlThumb = get_post_meta( $vidPost->ID, '_confluence_two_col_video_pod_thumbnail', true, 'thumb' );
                $vid_thumbnail = get_post_meta($vidPost->ID, '_confluence_two_col_video_pod_thumbnail', true);
                $image = wp_get_attachment_image( get_post_meta($vidPost->ID, '_confluence_two_col_video_pod_thumbnail_id', 1 ), 'thumb' );
                $vid_iframeUrl = get_post_meta($vidPost->ID, '_confluence_two_col_video_iframe_url', true);
                $vidId = get_post_meta($vidPost->ID, '_confluence_two_col_video_episode_id', true);
                $vidLongDescription = get_post_meta($vidPost->ID, '_confluence_two_col_video_description', true);
                $vidShortDescription = get_post_meta($vidPost->ID, '_confluence_two_col_video_short_description', true);
                $trimmedVidShortDescription = substr($vidShortDescription, 0, 200);
                $more = '...';
                $vidDescriptionOutput = $trimmedVidShortDescription . $more;
                ?>

                <div class="Video">
                    <article class="vid-entry-1">
                        <div class="container-fluid">
                            <div class="row podRow">
                                <div class="col-xs-12 col-sm-5">
                                    <h2 class="podTitle"><a href="<?= $vidUrl; ?>"><?= $vidTitle; ?></a></h2>
                                    <div class="video-responsive">
                                    <?php
                                    echo '<iframe width="420" height="315" src="https://player.vimeo.com/video/'. $vidId . '"frameborder="0" allowfullscreen></iframe>';
                                    ?>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-1" style="padding:0;">
                                    <img src="<?= $vid_thumbnail; ?>" class="img-responsive" style="width:100px;">

                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <?= $vidDescriptionOutput; ?>
                                    <a class="moreLink" href="<?= $vidUrl; ?>">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div>
                    </article>
                </div>

            <?php } // END foreach ?>
        </div>
        <div class="col-sm-3">
            <div id="right-sidebar-anchor"></div>
            <div id="right-sidebar">
                <?php get_template_part('templates/right-sidebar-tv-nav'); ?>
            </div>
        </div>
    </div>

</div>

<?php
get_template_part('templates/footer-block');
?>

<?php get_footer(); ?>