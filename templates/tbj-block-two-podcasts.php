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
    <div id="scrolly-side">
        <div class="scrolly">
            <article style="border-right:1px solid #595958;">
                <?php get_template_part( 'templates/podcast-foreach' ); ?>
            </article>
            <figure class='sticky'>
                <div class='bar-outer'>
                    <div id="right-sidebar-anchor">
                    </div>
                    <div id="right-sidebar">
                        <?php get_template_part('templates/right-sidebar-nav'); ?>
                    </div>
                </div>
            </figure>
        </div>
    </div>
</div>

