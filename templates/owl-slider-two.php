<?php
/**
 * Created by PhpStorm.
 * User: Scott Taylor
 * Date: 11/17/18
 * Time: 10:26 AM
 */

//Gallery Variables

$gallery_id = get_post_meta($post->ID, '_one_front_gallery_id', true);
$dataTitleGallery = get_post_meta($post->ID, '_one_front_team_title', true);
$gallery_bg = get_post_meta($post->ID, '_one_front_gallery_background_image', true);
//end block variables

?>
<section id="gallery" class="row" data-title="<?= $dataTitleGallery; ?>">
    <div class="col-lg-10 col-lg-push-1 team_div" style="background-image: url('<?= $team_bg; ?>');">
        <div class="row">
            <div class="col-xs-8 col-xs-push-2 col-sm-8 col-sm-push-2">
                <div class="owl-carousel owl-theme">
                    <?php
                    $Gallery2 = get_post_meta( $gallery_id, 'pks_gallery_group', true ); // this particular instance spits out 33 which is entered into a field in wp-admin
                    foreach( (array) $Gallery2 as $Gallery ){
                        // Default all variables in case they are not defined in the dataset.
                        $photo = '';

                        if ( isset( $Gallery['image_id'] ) ) {
                            $photo = wp_get_attachment_image($Gallery['image_id'], 'share-pick', null, array(
                                'class' => 'thumb  img-responsive',
                            ));
                        } ?>
                        <div class="team-member">
                            <div class="col-xs-12 col-sm-4 col-md-4 gallery-photo"><?= $photo; ?></div>
                        </div>
                    <?php } // END foreach ?>
                </div>
            </div>
        </div>
    </div>
</section>