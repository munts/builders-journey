<?php

/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */

?>

<div id="podcast-section" class="container blog-content">
    <div class="row">
        <div id="podcasts" class="col-xs-12 centered" style="padding-bottom:30px;">
            <h1 style="padding-bottom:30px;">The Builders Journey Latest Episodes</h1>
        </div>
    </div>
    <div class="row">
        <div id="podContent" class="col-xs-12 col-sm-9" style="border-right:1px solid #595958;">
            <?php
            //use wp_query to get cpts and order by post order attributes

            $podResults = new WP_Query(array(
                'post_type' => 'podcasts',
                'posts_per_page' => 8,
                'order_by' => 'menu_order',
                'order' => 'DESC',
                'post_status' => 'publish',
            ));
            $podPosts = $podResults->get_posts();

            //loop through results set
            foreach ($podPosts as $podPost) {
                /*
                Pull category for each unique post using the ID
                */
                $terms = get_the_terms( $podPost->ID, 'podcast_categories' );
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
                $images = get_field('gallery', $podPost->ID);
                $podTitle = get_the_title($podPost);
                $podUrl = get_permalink($podPost);
                $podContent = get_the_content($podPost);
                $podExcerpt = get_the_excerpt($podPost->ID);
                $featured_img_url = get_the_post_thumbnail_url($podPost->ID,'thumb');
                $podImageUrl = the_post_thumbnail('thumbnail');
                $podImageUrlThumb = get_post_meta( $podPost->ID, '_one_podcast_pod_thumbnail', true, 'thumb' );
                $pod_thumbnail = get_post_meta($podPost->ID, '_one_podcast_pod_thumbnail', true);
                $image = wp_get_attachment_image( get_post_meta($podPost->ID, '_one_podcast_pod_thumbnail_id', 1 ), 'thumb' );
                $pod_iframeUrl = get_post_meta($podPost->ID, '_one_podcast_iframe_url', true);
                $podId = get_post_meta($podPost->ID, '_one_podcast_episode_id', true);
                $vidUrl = get_post_meta($podPost->ID, '_one_podcast_video_url', true);
                $podLongDescription = get_post_meta($podPost->ID, '_one_podcast_description', true);
                $podShortDescription = get_post_meta($podPost->ID, '_one_podcast_short_description', true);
                $trimmedPodShortDescription = substr($podShortDescription, 0, 200);
                $more = '...';
                $podDescriptionOutput = $trimmedPodShortDescription . $more;
                ?>

                <div class="podcast">
                    <article class="pod-entry-1">
                        <div class="container-fluid">
                            <div class="row podRow">
                                <div class="col-xs-12 col-sm-5">
                                    <h2 class="podTitle"><a href="<?= $podUrl; ?>"><?= $podTitle; ?></a></h2>
                                    <?php
                                    echo '<iframe style="border: none" src="//html5-player.libsyn.com/embed/episode/id/'. $podId . '/height/90/theme/custom/thumbnail/yes/preload/no/direction/backward/render-playlist/no/custom-color/145da1/" height="90" width="100%" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>';
                                    ?>
                                </div>
                                <div class="col-xs-12 col-sm-1" style="padding:0;">
                                    <img src="<?= $pod_thumbnail; ?>" class="img-responsive" style="width:100px;">

                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <div class="podcastExcerpt"><?= $podDescriptionOutput; ?></div>
                                    <?php if (!empty ($images)) { ?>
                                        <a class="moreLink" href="<?= $podUrl; ?>"><img src="/wp-content/themes/one-confluence/assets/camera-sm.png" style="width:65%;"></a>
                                    <?php }
                                    if (!empty ($vidUrl)) { ?>
                                        <a class="moreLink" href="<?= $vidUrl; ?>"><img src="/wp-content/themes/one-confluence/assets/movie.png" style="width:50%;"></a>
                                    <?php } 
                                    if (!empty ($podUrl)) { ?>
                                        <a class="moreLink" href="<?= $podUrl; ?>"><img src="/wp-content/themes/one-confluence/assets/mic_headphones.png" style="width:50%;"></a>
                                    <?php }
                                    else{ ?>
                                        <a class="moreLink" href="<?= $podUrl; ?>">Read More</a>
                                    <?php } ?>
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
                <?php get_template_part('templates/right-sidebar-nav'); ?>
            </div>
        </div>
    </div>

</div>

