<?php

/**
 * Template Name: Secondary Page
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header('three');

$customImage = get_post_meta($post->ID,'_confluence_secondary_custom_image', true);
$pageContent = get_the_content();

?>



<?php

get_template_part('templates/footer-block');

get_footer(); ?>
