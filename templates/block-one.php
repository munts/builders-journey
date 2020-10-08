<?php
/**
 * Created by PhpStorm.
 * User: Scott Taylor
 * Date: 11/17/18
 * Time: 10:12 AM
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

<section id="passion" class="row mobile-flex" data-title="<?= $topTitleOne; ?>">
    <div class="hidden-xs hidden-sm col-lg-2 clearfix"></div>
    <div class="col-xs-12 col-sm-5 col-md-4 col-lg-4 text-overlay-left-one mobileOrder2 clearfix">
        <div class="featured-content-left purpose copy clearfix">
            <h2 id="triggerPassion"><?//= $topTitleOne; ?></h2>
            <div class="welcome-quote" style="font-family:'<?= $customFont2; ?>' !important;font-weight:<?= $weight; ?>;font-size:<?= $size; ?>;color:<?= $color; ?>;line-height:<?= $lineHeight; ?>;font-style:<?= $fontStyle; ?>;">
                <?= $descriptionOne; ?>
            </div>

            <div class="quote-subheading clearfix">
               <?= $topTitleSubHeadingOne; ?>
            </div>

            <div class="seven-step-cta clearfix">

                <a href="<?php echo Get_most_recent_permalink(); ?>" class="" style="float:right;"><img src="<?= $sevenStepCta; ?>" class="img-responsive desaturate"></a>
            </div>
        </div>
    </div>
    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-5 mobileOrder1 clearfix">
        <img src="<?= $imageOne; ?>" class="img-responsive desaturate-no">
    </div>
</section>


