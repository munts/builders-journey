<?php

/**
 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */

?>

<div id="podcast-section" class="container blog-content">
    <div class="row">
        <div id="podcasts" class="col-xs-12 centered" style="padding-bottom:30px;">
            <h1 style="padding-bottom:30px;">The Builder's Journey Latest Episodes</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-9" style="border-right:1px solid #595958;">
            <?php get_template_part( 'templates/podcast-foreach' ); ?>
        </div>
        <div class="col-sm-3">
            <div id="right-sidebar-anchor"></div>
            <div id="right-sidebar">
                <?php get_template_part('templates/right-sidebar-nav'); ?>
            </div>
        </div>
    </div>
</div>

