<?php
/**
 Blog Post Template
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
// otehr vars

?>
    <div id="main-container" class="container-fluid">

        <div class="fullwidthbanner-container container blog-hero">
            <div class="row">
                <div class="col-xs-12 col-sm-10 col-sm-push-1 hero-container" style="">
                    <img class="img-responsive" src="<?= $imageUrl; ?>" style="width:100%;">
                </div>
            </div>
        </div> <!-- /.rev_slider_wrapper-->

        <?php while ( have_posts() ) : the_post(); ?>

        <div class="container blog-content">
                <div class="row">
                    <?php if (empty($images)) { ?>
                        <div class="col-xs-12 col-sm-8 col-sm-push-2 section-title-wrapper" style="padding:15px;">
                            <h1 class="light-version"><?= the_title(); ?></h1>
                            <p><?= the_content(); ?></p>
                            <div class="attached-posts">
                                <?php
                                $attached_podcasts = get_post_meta(get_the_ID(), 'attached_cmb2_attached_podcasts', true);
                                $attached_vids = get_post_meta(get_the_ID(), 'attached_cmb2_attached_vids', true);
                                //$attached = get_post_meta( get_the_ID(), '_attached_cmb2_attached_posts', true );
                                if(!empty($attached_podcasts)){
                                    foreach ( $attached_podcasts as $attached_podcast ) {
                                        $Post = get_post( $attached_podcast );
                                        //echo get_the_title( $attached_podcast);
                                        echo '<li><a href="'.get_permalink( $attached_podcast ).'">'.get_the_title( $attached_podcast ).'</a></li>';
                                    }
                                }
                                if(!empty($attached_vids)){
                                    foreach ( $attached_vids as $attached_vid ) {
                                        $vidPost = get_post( $attached_vid );
                                        //echo get_the_title( $attached_podcast);
                                        echo '<li><a href="'.get_permalink( $attached_vid ).'">'.get_the_title( $attached_vid ).'</a></li>';
                                    }
                                }
                                ?>
                            </div>
                        </div>
                    <?php }
                    else { ?>
                        <div class="col-xs-12 col-sm-8 section-title-wrapper" style="padding:15px;">
                            <h1 class="light-version"><?= the_title(); ?></h1>
                            <p><?= the_content(); ?></p>
                            <div class="attached-posts">
                            <h2>Related Podcast and Video</h2>
                                <?php
                                $attached_podcasts = get_post_meta(get_the_ID(), 'attached_cmb2_attached_podcasts', true);
                                $attached_vids = get_post_meta(get_the_ID(), 'attached_cmb2_attached_vids', true);
                                //$attached = get_post_meta( get_the_ID(), '_attached_cmb2_attached_posts', true );
                                if(!empty($attached_podcasts)){
                                    foreach ( $attached_podcasts as $attached_podcast ) {
                                        $Post = get_post( $attached_podcast );
                                        //echo get_the_title( $attached_podcast);
                                        echo '<li><a href="'.get_permalink( $attached_podcast ).'">'.get_the_title( $attached_podcast ).'</a></li>';
                                    }
                                }
                                if(!empty($attached_vids)){
                                    foreach ( $attached_vids as $attached_vid ) {
                                        $vidPost = get_post( $attached_vid );
                                        //echo get_the_title( $attached_podcast);
                                        echo '<li><a href="'.get_permalink( $attached_vid ).'">'.get_the_title( $attached_vid ).'</a></li>';
                                    }
                                }
                                ?>
                            </div>
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