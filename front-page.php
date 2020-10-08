<?php
/**
Template Name: Front Page
 **/
/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header('three');

        global $post;
        //hero layout Variable
        $heroLayout = get_post_meta($post->ID, '_one_front_hero_layout', true);
        //Team Layout Variable
        $teamLayout = get_post_meta($post->ID, 'team_layout', true);
        //Gallery Layout Variable
        $galleryLayout = get_post_meta($post->ID, 'gallery_layout', true);

        get_template_part('templates/tbj-block-one');
        get_template_part('templates/tbj-block-two-podcasts');
//        get_template_part('templates/block-two');
//        get_template_part('templates/block-three');
//        get_template_part('templates/block-four');

//       if ($teamLayout === 'fluid') { get_template_part('templates/team-fluid'); }
//       else { get_template_part('templates/owl-slider-one'); }

//       get_template_part('templates/block-five');
       //get_template_part('templates/title-block-section');
//       get_template_part('templates/whats-in-a-name');

      //if ($galleryLayout === 'fluid') { get_template_part('templates/gallery-fluid'); }
      if ($galleryLayout === 'fluid') { get_template_part('templates/swiper-gallery'); }
       else { get_template_part('templates/owl-slider-two'); }

       get_template_part('templates/footer-block');
    ?>

<?php get_footer(); ?>