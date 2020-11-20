<?php

/**
 * Template Name: Two Column Podcast Page
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header('three');

$customImage = get_post_meta($post->ID,'_confluence_two_col_podcast_custom_image', true);
$pageContent = get_the_content();
$podcastCategory = get_post_meta($post->ID,'_confluence_two_col_podcast_category', true);
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
            <div style="display:block;margin-top:31px;"><a class="" href="#podcast-section"><img src="/wp-content/themes/one-confluence/assets/learnmore.png"></a></div>
            </div>
        </div>
    </div>
</section>

<div id="podcast-section" class="container blog-content">
    <div class="row">
        <div class="col-xs-12 centered">

        </div>
    </div>
    <div class="row">
        <div id="podContent" class="col-xs-12 col-sm-9" style="border-right:1px solid #595958;">
            <?php
            //use wp_query to get cpts and order by post order attributes

            $podResults = new WP_Query(array(
                'post_type' => 'podcasts',
                //'category_name' => $podcastCategory,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'podcast_categories',
                        'field' => 'slug',
                        'terms' => array( $podcastCategory ) // Array of service categories you wish to retrieve posts from
                    )
                ),
                'posts_per_page' => -1,
                'order_by' => 'date',
                'order' => 'DESC',
                'post_status' => 'publish',
            ));
            $podPosts = $podResults->get_posts();
            //echo '<pre>' . print_r($podPosts, true) . '</pre>';

            //loop through results set
            foreach ($podPosts as $podPost) {
                $podTitle = get_the_title($podPost);
                $podUrl = get_permalink($podPost);
                $podContent = get_the_content($podPost);
                $podExcerpt = get_the_excerpt($podPost->ID);
                $pod_iframeUrl = get_post_meta($podPost->ID, '_one_podcast_iframe_url', true);
                $podId = get_post_meta($podPost->ID, '_one_podcast_episode_id', true);
                $podLongDescription = wpautop(get_post_meta($podPost->ID, '_one_podcast_description', true));
                $podShortDescription = wpautop(get_post_meta($podPost->ID, '_one_podcast_short_description', true));
                $trimmedPodShortDescription = substr($podShortDescription, 0, 200);
                $more = '...';
                $podDescriptionOutput = $trimmedPodShortDescription . $more;
                ?>

                <div class="podcast">
                    <article class="pod-entry-1">
                        <div class="container-fluid">
                            <div class="row podRow">
                                <div class="col-xs-12 col-sm-6">
                                    <h2 class="podTitle"><a href="<?= $podUrl; ?>"><?= $podTitle; ?></a></h2>
                                    <?php
                                    echo '<iframe style="border: none" src="//html5-player.libsyn.com/embed/episode/id/'. $podId . '/height/90/theme/custom/thumbnail/yes/preload/no/direction/backward/render-playlist/no/custom-color/145da1/" height="90" width="100%" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>';
                                    ?>
                                </div>
                                <div class="col-xs-12 col-sm-6">
                                    <p><?= $podDescriptionOutput; ?></p>
                                    <a class="moreLink" href="<?= $podUrl; ?>">Read More</a>
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
<div id="gallery"></div>
<?php

get_template_part('templates/footer-block');

get_footer(); ?>
