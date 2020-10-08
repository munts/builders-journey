<?php
/**
 * Created by PhpStorm.
 * User: Scott Taylor
 * Date: 4/12/18
 * Time: 11:31 AM
 */

//What's in a Name Variables
//$whatsInaNameTitle = get_post_meta($post->ID, '_one_front_name_title', true);
$whatsInaNamePlumbBob = get_post_meta($post->ID, '_one_front_name_plumb_bob', true);
$whatsInaNameContact = get_post_meta($post->ID, '_one_front_name_contact_image', true);
$whatsInaNameSignature = get_post_meta($post->ID, '_one_front_name_signature_image', true);
$whatsInaNameParagraphOne = get_post_meta($post->ID, '_one_front_name_paragraph_one', true);
$whatsInaNameParagraphTwo = get_post_meta($post->ID, '_one_front_name_paragraph_two', true);
$whatsInaNameParagraphThree = get_post_meta($post->ID, '_one_front_name_paragraph_three', true);
$whatsInaNameParagraphFour = get_post_meta($post->ID, '_one_front_name_paragraph_four', true);
?>

<section id="name" class="row footer_wrapper" data-title="name">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div id="scroll-container">
                    <div id="myContainer" class="container">
                        <div class="row">
                            <div class="col-xs-12">
                                <div id="trigger-header" class="spacer s0"></div>
                                <div class="wian-header sketch-bg">
                                </div>
                            </div>
                        </div>
                        <div id="paragraph1" class="row">
                            <div class="hidden-xs col-sm-1"></div>
                            <div class="col-sm-10 border-left border-left1">
                                <div id="border1" class="spacer s0"></div>
                                <div class="paragraph1 scroll-content tween1">
                                    <?= $whatsInaNameParagraphOne; ?>
                                </div>
                            </div>
                            <div class="hidden-xs col-sm-1"></div>
                        </div>
                        <div class="row">
                            <div class="hidden-xs col-sm-1">
                            </div>
                            <div class="col-sm-10 border-left border-left2">
                                <div id="border2" class="spacer s0"></div>
                                <div class="paragraph2 scroll-content tween2">
                                    <?= $whatsInaNameParagraphTwo; ?>
                                </div>
                            </div>
                            <div class="hidden-xs col-sm-1"></div>
                        </div>
                        <div class="row">
                            <div class="hidden-xs col-sm-1"></div>
                            <div class="col-sm-10 border-left border-left3">
                                <div id="border3" class="spacer s0"></div>
                                <div class="paragraph3 scroll-content tween3">
                                    <?= $whatsInaNameParagraphThree; ?>
                                </div>
                            </div>
                            <div class="chidden-xs col-sm-1">
                            </div>
                        </div>
                        <?php if ($whatsInaNameParagraphFour !='') { ?>
                            <div class="row">
                                <div class="hidden-xs col-sm-1"></div>
                                <div class="col-sm-10 border-left border-left4">
                                    <div id="border4" class="spacer s0"></div>
                                    <div class="paragraph4 scroll-content tween4">
                                        <?= $whatsInaNameParagraphFour; ?>
                                    </div>
                                </div>
                                <div class="hidden-xs col-sm-1">
                                </div>
                            </div>
                        <?php } ?>
                        <div id="sketch" class="row">
                            <div class="col-md-12 pb-bg2 sketch-container">
                                <div class="pb-container">
                                    <img class="pb-bottom img-responsive" src="<?= $whatsInaNamePlumbBob; ?>"><!-- Plumb bob image-->
                                </div>
                            </div>
                        </div>
                        <div id="contact-signature" class="row">
                            <div class="hidden-xs hidden-sm col-md-1"></div>
                            <div class="col-md-11 col-md-pull-1 pb-bg2">
                                <div id="signature" class="wian-signature">
                                    <div id="contact" class="contact-us-button">
                                        <a href="#" class="" style="float:left;" data-toggle="modal" data-target="#contactModal"><img style="width:100%;" src="<?= $whatsInaNameContact; ?>"></a>
                                    </div>
                                    <div id="sig" style="width:50%;float:right;margin-top:-30px;">
                                        <img src="<?= $whatsInaNameSignature; ?>" style="width:100%;" class="img-responsive tween10">
                                    </div>
                                    <div id="fadeOut10" class="spacer s0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
