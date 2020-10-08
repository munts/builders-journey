<?php
/**
 * Created by PhpStorm.
 * User: Scott Taylor
 * Date: 11/17/18
 * Time: 10:23 AM
 */

// Title block Variables
// left container
$titleBlockOne = '';
$titleBlockTwo = '';
$titleBlockThree = '';
//middle container
$middleContainerTopTitle = '';
$middleContainerBottomTitle = '';
// right container - logo container
$titleBlockLogo = '';

if (function_exists('one_get_option')) {

//Title Block Left Container
    $titleBlockOne = one_get_option('one_titleblock_one');
    $titleBlockTwo = one_get_option('one_titleblock_two');
    $titleBlockThree = one_get_option('one_titleblock_three');
//Title Block Middle Container
    $middleContainerTopTitle = one_get_option('one_middleTitleblock_top');
    $middleContainerBottomTitle = one_get_option('one_middleTitleblock_bottom');
//Title block Right Container - logo
    $titleBlockLogo = one_get_option('title-Block-logo');

}

?>

<section id="titleblock" class="row titleblocks-fixed">
    <div id="titleblock-inner" class="container">
        <div class="row">
            <div class="hidden-xs col-sm-4 col-md-3 reduced-padding">
                <div id="left" class="block-margin left-block block-wrap">
                    <div id="what"><span><?= $titleBlockOne; ?><br><?= $titleBlockTwo; ?><br><?= $titleBlockThree; ?></span></div>
                </div>
            </div>
            <div class="hidden-xs2 col-sm-4 col-md-6 reduced-padding">
                <div class="block-margin middle-block block-wrap">
                    <div class="buildingwith">
                        <div id="tagger" class="tagline">
                            <div class="building-with"><?= $middleContainerTopTitle; ?></div>
                            <div class="js-tag">EXPERIENCE</div></div>
                        <div class="since1994"><strong><?= $middleContainerBottomTitle; ?></strong></div>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-4 col-md-3 reduced-padding">
                <div class="block-margin right-block block-wrap">
                    <div id="logo2" style="background-image: url('<?= $titleBlockLogo; ?>');">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
