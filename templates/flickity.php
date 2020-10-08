<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 11/8/18
 * Time: 3:07 PM
 */

global $post;
$homepageSlider = get_post_meta($post->ID, '_one_front_slider_id', true);
$topTitleOne = get_post_meta($post->ID, '_one_front_one_top', true);

?>
<section id="passion" class="row" data-title="<?= $topTitleOne; ?>">
<div id="flick-container" class="col-xs-12 flickity">
    <div id="flick" style="max-height:600px;max-width:100%;" class="main-carousel">
            <?php
            $homepageSlider2 = get_post_meta( $homepageSlider, '_multi_slides_group_', true );

            //echo $homepageSlider;
            foreach ( (array) $homepageSlider2 as $slide ) {
                $img = '';
                //if ( isset( $slide['message'] ) )
                //    $title = esc_html( $slide['message'] );
                //if ( isset( $slide['secondary-message'] ) )
                //    $secondaryTitle = esc_html( $slide['secondary-message'] );
                if ( isset( $slide['image_id'] ) ) {
                    $img = wp_get_attachment_image_src( $slide['image_id'], 'full');
                } ?>

                <div class="carousel-cell" style="min-height:700px;width:100%;background: url('<?= $img[0]; ?>');background-size:cover;">


                </div>
            <?php }  ?>

        <nav class="slides-navigation" style="z-index:10000;">
            <a href="#" class="prev"><i class="fa fa-angle-left" style="font-size:1.25em;"></i></a>
            <a href="#" class="next"><i class="fa fa-angle-right" style="font-size:1.25em;"></i></a>
        </nav>
    </div>
</div>
</section>
