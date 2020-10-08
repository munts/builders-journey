<?php
/**
 *This is a template part if the admin wants to use a fluid layout for the team section
 */
global $post;
//Team Variables
//$teamLayout = get_post_meta($post->ID, 'team_layout', true);
//Gallery Variables
$gallery_id = get_post_meta($post->ID, '_one_front_gallery_id', true);
$dataTitleGallery = get_post_meta($post->ID, '_one_front_team_title', true);
$gallery_bg = get_post_meta($post->ID, '_one_front_gallery_background_image', true);
//end block variables
$team_bg = get_post_meta($post->ID, '_one_front_team_background_image', true);
?>

<section id="gallery" class="row" data-title="<?= $dataTitleGallery; ?>">
    <div class="col-xs-12 team_div" style="background-image: url('<?= $team_bg; ?>');">
        <div class="row">
            <div class="col-xs-10 col-xs-push-1">
                <div class="owl-carousel owl-theme">
                    <?php
                    $Gallery2 = get_post_meta( $gallery_id, 'pks_gallery_group', true ); // this particular instance spits out 33 which is entered into a field in wp-admin
                    foreach( (array) $Gallery2 as $Gallery ){
                        // Default all variables in case they are not defined in the dataset.
                        $photo = $photo_full = '' ;

                        if ( isset( $Gallery['image_id'] ) ) {
                            $photo = wp_get_attachment_image($Gallery['image_id'], 'share-pick', null, array(
                                'class' => 'img-responsive',
                            ));
                        }
                        if ( isset( $Gallery['image_id'] ) ) {
                            $photo_full = wp_get_attachment_image_url($Gallery['image_id'], 'full', null, array(
                                'class' => 'img-responsive',
                            ));
                        } ?>
                        <div class="gallery-item">
                            <a href="<?= $photo_full; ?>" rel="gallery1" class="" data-group="gallery">
                                <?= $photo; ?>
                            </a>
                        </div>
                    <?php } // END foreach ?>
                </div>
            </div>
        </div>
    </div>
</section>