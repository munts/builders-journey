<?php
/**
Vids Post Template
 **/
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header('three');

global $post;
//hero Variable
$customImage = get_post_meta($post->ID,'_confluence_two_col_video_custom_image', true);
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
$images = get_field('gallery');
$vidShortDescription = wpautop( get_post_meta($post->ID, '_confluence_two_col_video_short_description', true));
$vidDescription = wpautop( get_post_meta($post->ID, '_confluence_two_col_video_description', true));
$vidId = get_post_meta($post->ID, '_confluence_two_col_video_episode_id', true);

?>
    <div id="main-container" class="container-fluid">

        <div class="fullwidthbanner-container container blog-hero">
            <div class="row">
                <div class="col-xs-12 col-sm-6" style="padding-top:30px;">
                    <h2>In this Episode...</h2>
                    <?= $vidShortDescription; ?>
                </div>
                <div class="col-xs-12 col-sm-6 hero-container" style="">
                    <div class="video-responsive">
                        Something here
                    </div>
                </div>
            </div>
        </div> <!-- /.rev_slider_wrapper-->

        <?php while ( have_posts() ) : the_post(); ?>


            <div class="container blog-content">
                <div class="row">
                    <?php if (empty($images)) { ?>
                        <div class="col-xs-12 section-title-wrapper" style="padding:15px;">
                            <h1 class="light-version"><?= the_title(); ?></h1>
                            <p><?= the_content(); ?></p>
                            <h2 class="podTitle"><a href="<?= $vidUrl; ?>"><?= $vidTitle; ?></a></h2>
                            <div class="video-responsive">
                                <?php
                                echo '<iframe width="420" height="315" src="https://player.vimeo.com/video/'. $vidId . '"frameborder="0" allowfullscreen></iframe>';
                                ?>
                            </div>
                            <img src="<?= $customImage; ?>" class="img-responsive" style="width:50%;">
                        </div>
                    <?php }
                    else { ?>
                        <div class="col-xs-12 col-sm-8 section-title-wrapper" style="padding:15px;">
                            <h1 class="light-version"><?= the_title(); ?></h1>
                            <p><?= the_content(); ?></p>
                            <div class="video-responsive">
                                <?php
                                echo '<iframe width="420" height="315" src="https://player.vimeo.com/video/'. $vidId . '"frameborder="0" allowfullscreen></iframe>';
                                ?>
                            </div>
                            <img src="<?= $customImage; ?>" class="img-responsive" style="width:50%;">
                            <p><?= $vidDescription; ?></p>
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
            </div>
        <?php endwhile;
        //get_template_part('templates/blog-title-block-section');
        get_template_part('templates/footer-block-post');
        ?>
    </div>
<?php get_footer(); ?>