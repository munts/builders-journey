<?php
/**
 * Created by PhpStorm.
 * User: Scott Taylor
 * Date: 9/09/20
 * Time: 5:12 AM
 */

$topTitleOne = get_post_meta($post->ID, '_one_front_one_top', true);
$bottomTitleOne = get_post_meta($post->ID, '_one_front_one_bottom', true);
$imageOne = get_post_meta($post->ID, '_one_front_one_image', true);
$descriptionOne = get_post_meta($post->ID, '_one_front_one_wysiwyg', true);
$topTitleSubHeadingOne = get_post_meta($post->ID, '_one_front_one_bottom', true);
$sevenStepCta = get_post_meta($post->ID, '_one_front_seven_step_button', true);
$sevenStepUrl = get_post_meta($post->ID, '_one_front_seven_step_url', true);

setup_custom_font_data();

$customFontSettings = setup_custom_font_data();

$font = $customFontSettings['font-family'];
$size = $customFontSettings['font-size'];
$weight = $customFontSettings['font-weight'];
$lineHeight = $customFontSettings['line-height'];
$color = $customFontSettings['color'];

$data = $font;
list($CustomFont) = explode(":", $data);
$customFont2 = preg_replace('/[^a-zA-Z0-9-_\.]/',' ', $CustomFont);

$fontStyle = one_get_option('font-style');

?>

<section id="passion" class="" data-title="<?= $topTitleOne; ?>" style="padding-bottom:200px;min-height:800px">
<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-4">
            <div class="featured-content-left purpose copy">
                <img src="<?= $imageOne; ?>" class="img-responsive">
            </div>
        </div>
        <div class="col-xs-12 col-sm-3">
<!--            <div class="quote-subheading clearfix">-->
<!--                --><?//= $topTitleSubHeadingOne; ?>
<!--            </div>-->
            <div class="welcome-quote">
                <?= $descriptionOne; ?>
                <div style="display:block;margin-top:60px;"><a class="btn btn-primary" href="#podcasts">Listen Here<br><img src="/wp-content/themes/one-confluence/assets/icons8-chevron-down-24.png"></a></div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-5" style="padding-top:15px;">

            <div class="video-responsive">
                <iframe width="420" height="315" src="https://player.vimeo.com/video/461013559" frameborder="0" allowfullscreen></iframe>
            </div>
            <div style="text-align: center;padding-top:10px;">
                <h2>The Builder’s Journey – T.V.</h2>
                <div class="small">Sponsored By</div>
                <h2>Plumb Kendall Solutions</h2>
            </div>

        </div>
    </div>

    <div id="latest-cta" class="row">
        <div class="col-xs-12" style="text-align:center;">
            <!-- <div style="display:inline-block;"><a class="btn btn-primary" href="#podcasts">Listen Here<br><img src="/wp-content/themes/one-confluence/assets/icons8-chevron-down-24.png"></a></div> -->

        </div>
    </div>
</div>

</section>


