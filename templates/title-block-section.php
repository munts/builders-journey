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

<section id="titleblock" class="titleblocks-fixed">
    <div id="titleblock-inner" class="container">
        <div class="row">
            <div class="hidden-xs col-sm-4 reduced-padding">
                <div id="left-wrap" class="block-margin left-block block-wrap">
                    <div id="left">
                        <h4 style="color:#e6343f;"><?= $titleBlockOne; ?></h4>
                        <a href="#" class="btn btn-primary">Listen Now</a>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-4 reduced-padding">
                <div id="middle-wrap" class="block-margin middle-block block-wrap">
                    <div id="middle">
                        <h4 style="color:#e6343f;"><?= $titleBlockTwo; ?></h4>
                        <a href="#" class="btn btn-primary">Listen Now</a>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-4 reduced-padding">
                <div id="right-wrap" class="block-margin right-block block-wrap">
                    <div id="right">
                        <h4 style="color:#e6343f;"><?= $titleBlockThree; ?></h4>
                        <a href="#" class="btn btn-primary">Listen Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
