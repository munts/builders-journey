<?php
/**
 * Created by PhpStorm.
 * User: Scott Taylor
 * Date: 11/17/18
 * Time: 10:29 AM
 */

//Footer Variables
$footerPhone = '';
$footerEmail = '';
$footer_logo = '';
$address_line1 = '';
$address_line2 = '';
//Social Media Icons
$instagram = '';
$linkedin = '';
$pinterest = '';
$facebook = '';
$gplus = '';
$twitter = '';
$wildcardIcon = '';
$wildcardUrl = '';

if (function_exists('one_get_option')) {
    //Footer Info
    $footerPhone = one_get_option('phone_text');
    $footerEmail = one_get_option('foot_email');
    $footer_logo = one_get_option('logo2');
    $address_line1 = one_get_option('address_line1');
    $address_line2 = one_get_option('address_line2');
    //Social Media
    $instagram = one_get_option('one_instagram_url');
    $facebook = one_get_option('one_facebook_url');
    $twitter = one_get_option('one_twitter_url');
    $gplus = one_get_option('one_gplus_url');
    $pinterest = one_get_option('one_instagram_url');
    $linkedin = one_get_option('one_linkedin_url');
    $wildcardIcon = one_get_option('one_wildcard_icon');
    $wildcardUrl = one_get_option('one_wildcard_url');

}

?>

<section id="purpose-bottom" class="row footer-wrapper">
    <div class="container">
        <div id="footer-bottom" class="row bottom-info">
            <div class="col-xs-12 footer-logo" style="text-align: center;margin:0 auto;">
                <div class="" style="max-width:253px;margin:0 auto;"><img src="<?= $footer_logo; ?>" class="img-responsive"></div>

            </div>
            <div class="col-xs-12 footer-address">
                <a href="tel:<?= $footerPhone; ?>"><span class="glyphicon glyphicon-phone"></span> <?= $footerPhone; ?></a> | <span class="glyphicon glyphicon-map-marker"></span> <?=$address_line1; ?> | <?=$address_line2; ?> | <span class="glyphicon glyphicon-envelope"></span> <a href="mailto:<?= $footerEmail; ?>"><?= $footerEmail; ?></a>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-4 col-sm-push-4">
                <div class="social">
                    <ul>
                        <?php
                        if (isset($instagram) && !empty($instagram)) {
                            echo '<li><a href="'.$instagram.'" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>';
                        };
                        if (isset($facebook) && !empty($facebook)) {
                            echo '<li><a href="'.$facebook.'" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>';
                        };
                        if (isset($twitter) && !empty($twitter)) {
                            echo '<li><a href="'.$twitter.'" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>';
                        };
                        if (isset($gplus) && !empty($gplus)) {
                            echo '<li><a href="'.$gplus.'" target="_blank"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>';
                        };
                        if (isset($linkedin) && !empty($linkedin)) {
                            echo '<li><a href="'.$linkedin.'" target="_blank"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>';
                        };
                        if (isset($pinterest) && !empty($pinterest)) {
                            echo '<li><a href="'.$pinterest.'" target="_blank"><i class="fa fa-pinterest" aria-hidden="true"></i></a></li>';
                        };
                        if (isset($wildcardUrl) && !empty($wildcardUrl)) {
                            echo '<li><a href="'.$wildcardUrl.'" target="_blank"><i class="<?= $wildcardIcon; ?>" aria-hidden="true"></i></a></li>';
                        };
                        ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
