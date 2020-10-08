<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 11/17/18
 * Time: 10:14 AM
 */

//block Two variables
$topTitleTwo = get_post_meta($post->ID, '_one_front_two_top', true);
$bottomTitleTwo = get_post_meta($post->ID, '_one_front_two_bottom', true);
$imageTwo = get_post_meta($post->ID, '_one_front_two_image', true);
//$headerTwo = get_post_meta($post->ID, '_one_front_two_header', true);
$descriptionTwo = get_post_meta($post->ID, '_one_front_two_wysiwyg', true);

?>

<section id="art" class="row" data-title="<?= $topTitleTwo; ?>" data-target="art">
    <div class="col-sm-7 col-md-8 col-md-push-1 col-lg-4 col-lg-push-3 clearfix">
        <img src="<?= $imageTwo; ?>" class="img-responsive desaturate" style="width:90%;">
    </div>
    <div class="col-sm-5 col-md-4 col-md-pull-1 col-lg-2 col-lg-push-3 text-overlay-right">
        <div class="featured-content copy"><h2 id="triggerArt"><?= $topTitleTwo; ?></h2><?= $descriptionTwo; ?></div>
    </div>
</section>
