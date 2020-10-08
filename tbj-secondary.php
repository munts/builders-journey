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

<section id="the-content" class="" style="padding-bottom:200px;min-height:800px">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <div class="featured-content-left purpose copy">
                    <img src="<?= $customImage; ?>" class="img-responsive">
                </div>
            </div>
            <div class="col-xs-12 col-sm-5">
                <div class="welcome-quote" style="text-align:center;">
                    <?= $pageContent; ?>
                </div>
            </div>
        </div>
    </div>
</section>

<?php

get_template_part('templates/footer-block');

get_footer(); ?>
