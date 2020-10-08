<?php
/**
 * Created by PhpStorm.
 * User: Scott Taylor
 * Date: 11/17/18
 * Time: 10:21 AM
 */

//block Five variables
$topTitleFive = get_post_meta($post->ID, '_one_front_five_top', true);
$bottomTitleFive = get_post_meta($post->ID, '_one_front_five_bottom', true);
$imageFive = get_post_meta($post->ID, '_one_front_five_image', true);
$descriptionFive = get_post_meta($post->ID, '_one_front_five_wysiwyg', true);

?>

<section id="solutions" class="row" data-title="<?= $topTitleFive; ?>">
    <div class="col-sm-5 col-md-4 col-lg-2 col-lg-push-3 text-overlay-left clearfix">
        <div class="featured-content-left"><h2 id="triggerSolutions"><?= $topTitleFive; ?></h2><?= $descriptionFive; ?></div>
    </div>
    <div class="col-sm-7 col-md-7 col-lg-5 col-lg-push-3">
        <img src="<?= $imageFive; ?>" class="img-responsive desaturate4" style="max-height:480px;">
    </div>

</section>
