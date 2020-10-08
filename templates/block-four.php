<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 11/17/18
 * Time: 10:16 AM
 */

//block Four variables
$topTitleFour = get_post_meta($post->ID, '_one_front_four_top', true);
$bottomTitleFour = get_post_meta($post->ID, '_one_front_four_bottom', true);
$imageFour = get_post_meta($post->ID, '_one_front_four_image', true);
$descriptionFour = get_post_meta($post->ID, '_one_front_four_wysiwyg', true);

?>

<section id="creative" class="row" data-title="<?= $topTitleFour; ?>">
    <div class="col-sm-8 col-sm-push-1 col-md-8 col-md-push-2 col-lg-6 col-lg-push-3 clearfix apples">
        <img src="<?= $imageFour; ?>" class="img-responsive desaturate3" style="width:80%;margin-left:0;">
    </div>
    <div class="col-sm-4 col-md-3 col-lg-2 col-lg-push-2 text-overlay-right">
        <div class="featured-content copy"><h2 id="triggerCreative"><?= $topTitleFour; ?></h2><?= $descriptionFour; ?></div>
    </div>
</section>
