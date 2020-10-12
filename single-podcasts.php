<?php
/**
Podcast Post Template
 **/
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header('three');

global $post;
//hero Variable
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
$images = get_field('gallery');
$podDescription = wpautop( get_post_meta($post->ID, '_one_podcast_description', true));
$podId = get_post_meta($post->ID, '_one_podcast_episode_id', true);

?>
    <div id="main-container" class="container-fluid">

        <div class="fullwidthbanner-container container blog-hero">
            <div class="row">
                <div class="col-xs-12 hero-container" style="min-height:100px;">

                </div>
            </div>
        </div> <!-- /.rev_slider_wrapper-->

        <?php while ( have_posts() ) : the_post(); ?>


            <div class="container blog-content">
                <div class="row">
                    <?php if (empty($images)) { ?>
                        <div class="col-xs-12 section-title-wrapper" style="padding:15px;">
                            <h1 class="light-version"><?= the_title(); ?></h1>
                            <?php
                                echo '<iframe style="border: none" src="//html5-player.libsyn.com/embed/episode/id/'. $podId . '/height/90/theme/custom/thumbnail/yes/preload/no/direction/backward/render-playlist/no/custom-color/145da1/" height="90" width="100%" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>';
                            ?>
                            <p><?= the_content(); ?></p>
                            <p><?= $podDescription; ?></p>
                        </div>
                    <?php }
                    else { ?>
                        <div class="col-xs-12 col-sm-8 section-title-wrapper" style="padding:15px;">
                            <h1 class="light-version"><?= the_title(); ?></h1>
                            <?php
                                echo '<iframe style="border: none" src="//html5-player.libsyn.com/embed/episode/id/'. $podId . '/height/90/theme/custom/thumbnail/yes/preload/no/direction/backward/render-playlist/no/custom-color/145da1/" height="90" width="100%" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>';
                            ?>
                            <p><?= the_content(); ?></p>
                            <p><?= $podDescription; ?></p>
                        </div>
                        <div class="col-xs-12 col-sm-4" style="padding:15px;">
                            <div class="photos_gallery">
                                <ul style="margin-bottom:60px;">
                                    <?php
                                    $images = get_field('gallery');
                                    if ($images):
                                        foreach ($images as $image):
                                            $url = $image['url'];
                                            $type = $image['type'];
                                            //$icon = $image['icon'];
                                            ?>
                                            <li class="projectGalleryItem">
                                                <a class="galleryImage" rel="gallery1" href="<?php echo $url; ?>">
                                                    <img src="<?php echo $image['sizes']['gallery-thumb']; ?>" alt="<?php echo basename($image['sizes']['medium']); ?>" />
                                                </a>
                                            </li>
                                        <?php
                                        endforeach;
                                    endif;
                                    ?>
                                </ul>
                            </div>
                        </div>
                    <?php } ?>
                </div>
                <div class="row" style="padding:60px 0 30px 0; text-align: center;">
                    <h3>Want More? Listen to the Previous or Next Episode...</h3>
                </div>
                <div class="row">
                    <div class="podcast-pagination" style="text-align: center;">
                        <div class="prev-posts" style="padding: 10px;">
                            <?php
                            $prev_post = get_previous_post();
                            if($prev_post) {
                            $prev_title = strip_tags(str_replace('"', '', $prev_post->post_title));
                            echo "\t" . '<a rel="prev" href="' . get_permalink($prev_post->ID) . '" title="' . $prev_title. '" class=""> <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span> </a> ' . ' <a rel="prev" href="' . get_permalink($prev_post->ID) . '" title="' . $prev_title. '" class=" ">'. $prev_title . '</a>' . "\n";
                                            }
                            ?>
                        </div>

                        <div class="next-posts" style="padding: 10px;">
                            <?php
                            $next_post = get_next_post();
                            if($next_post) {
                            $next_title = strip_tags(str_replace('"', '', $next_post->post_title));
                            echo "\t" . '<a rel="next" href="' . get_permalink($next_post->ID) . '" title="' . $next_title. '" class=""> '. $next_title . ' <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></a>' . "\n";
                                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php endwhile;
        get_template_part('templates/footer-block-post');
        ?>
    </div>
<?php get_footer(); ?>