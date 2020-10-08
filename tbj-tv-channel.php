<?php

/**
 * Template Name: The Builders Journey Channel
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header('three');

$customImage = get_post_meta($post->ID,'_confluence_two_col_video_custom_image', true);
$pageContent = get_the_content();
$videoCategory = get_post_meta($post->ID,'_confluence_two_col_video_category', true);
?>

<section id="the-content" class="" style="padding-bottom:200px;min-height:800px">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <div class="featured-content-left purpose copy">
                    <img src="<?= $customImage; ?>" class="img-responsive">
                </div>
            </div>
            <div class="col-xs-12 col-sm-5">
                <div class="welcome-quote" style="text-align:center;">
                    <?= $pageContent; ?>
                </div>
            </div>
        </div>
        <div id="latest-cta" class="row" style="position:absolute;left:44%;bottom:150px;">
            <div class="col-xs-12" style="text-align:center;">
                <div style="display:inline-block;"><a class="btn btn-primary" href="#video-section">Latest Videos</a></div>
            </div>
        </div>
    </div>
</section>

<div id="video-section" class="container blog-content">
    <div class="row">
        <div class="col-xs-12 centered">

        </div>
    </div>
    <div class="row">
        <div id="podContent" class="col-xs-12 col-sm-9" style="border-right:1px solid #595958;">
            <?php
            //use wp_query to get cpts and order by post order attributes

            $videoResults = new WP_Query(array(
                'post_type' => 'videos',
                //'category_name' => $videoCategory,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'video_categories',
                        'field' => 'slug',
                        'terms' => array( $videoCategory ) // Array of service categories you wish to retrieve posts from
                    )
                ),
                'posts_per_page' => -1,
                'order_by' => 'date',
                'order' => 'DESC',
                'post_status' => 'publish',
            ));
            $videoPosts = $videoResults->get_posts();
            //echo '<pre>' . print_r($podPosts, true) . '</pre>';

            //loop through results set
            foreach ($videoPosts as $videoPost) {
                $vidTitle = get_the_title($videoPost);
                $vidUrl = get_permalink($videoPost);
                $vidContent = get_the_content($videoPost);
                $vidExcerpt = get_the_excerpt($videoPost->ID);
                $vid_iframeUrl = get_post_meta($videoPost->ID, '_one_video_iframe_url', true);
                $vidId = get_post_meta($videoPost->ID, '_one_video_episode_id', true);
                $vidLongDescription = wpautop(get_post_meta($videoPost->ID, '_one_video_description', true));
                $vidShortDescription = wpautop(get_post_meta($videoPost->ID, '_one_video_short_description', true));
                $trimmedVidShortDescription = substr($vidShortDescription, 0, 200);
                $more = '...';
                $podDescriptionOutput = $trimmedPodShortDescription . $more;
                ?>

                <div class="video">
                    <article class="pod-entry-1">
                        <div class="container-fluid">
                            <div class="row podRow">
                                <div class="col-xs-12 col-sm-6">
                                    <h2 class="podTitle"><a href="<?= $vidUrl; ?>"><?= $vidTitle; ?></a></h2>
                                    <?php
                                    echo '<iframe style="border: none" src="/id/'. $vidId . '/" height="90" width="100%" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>';
                                    ?>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <p><?= $vidDescriptionOutput; ?></p>
                                    <a class="moreLink" href="<?= $vidUrl; ?>">Watch More</a>
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
<div id="gallery"></div>
<?php

get_template_part('templates/footer-block');

get_footer(); ?>
