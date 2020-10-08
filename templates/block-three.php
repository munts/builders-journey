<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 11/17/18
 * Time: 10:15 AM
 */

//block Three variables
$topTitleThree = get_post_meta($post->ID, '_one_front_three_top', true);
$bottomTitleThree = get_post_meta($post->ID, '_one_front_three_bottom', true);
$imageThree = get_post_meta($post->ID, '_one_front_three_image', true);
$descriptionThree = get_post_meta($post->ID, '_one_front_three_wysiwyg', true);

?>

<section id="science" class="row" data-title="<?= $topTitleThree; ?>">
    <div class="col-sm-5 col-md-4 col-lg-2 col-lg-push-3 text-overlay-left clearfix">
        <div class="featured-content-left copy"><h2 id="triggerScience"><?= $topTitleThree; ?></h2><?= $descriptionThree; ?></div>

    </div>
    <div class="col-sm-7 col-md-7 col-lg-5 col-lg-push-4">
        <img src="<?= $imageThree; ?>" class="img-responsive desaturate2" style="width:85%;">
    </div>
</section>
