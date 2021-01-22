<?php
/**
Template Name: Blog Template

 * @author Scott Taylor
 * @package One Confluence
 * @subpackage Customizations
 */
get_header( 'three' );

global $post;
$imageUrl = wp_get_attachment_url( get_post_thumbnail_id() );
?>
<div id="main-container" class="container-fluid">
    <div class="fullwidthbanner-container container">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-sm-push-3 hero-container" style="height:60px;">

            </div>
        </div>
    </div> <!-- /.rev_slider_wrapper-->
    <section id="" class="container">
        <div class="row" style="padding:0;">
            <div class="col-xs-12" style="font-weight:400;font-size:1.5em;padding:15px 60px;">
                <?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>
                <h1 class="dark-version"><?php echo get_the_title(); ?></h1>
                <?php echo the_content(); ?>
                <?php }
                }
                ?>
                <!--Add Blog Categories as filters here-->
            </div>
        </div>
        
        <?php $loop = new WP_Query(array('post_type' => 'post', 'posts_per_page' => -1, 'orderby'=> 'ASC')); ?>
        <?php
            $allCats = get_terms('category',[
                'hide_empty' => true,
            ]);
            $groupTerms = array();
            foreach ( $allCats as $allCatsTerm ) {
                $groupTerms[strtolower($allCatsTerm->name)] = $allCatsTerm->term_id;
            } 
        ?>
        <div class="row" style="padding:30px 0 0 0;">
            <div id="portfolio-page" class="col-xs-12" style="border-bottom:1px solid #cccccc;">
                <ul class="nav navbar-nav navbar-right filter-nav" id="filters" style="">
                    <?php
                        $terms2 = get_terms('category');
                        $count = count($terms2);
                        echo '<li><a href="javascript:void(0)" title="" data-filter=".all" data-groupid="-1" class="active filter-all-btn filter-btn">All</a></li>';
                        if ( $count > 0 ){
                            foreach ( $terms2 as $term ) {
                                $termname = strtolower($term->name);
                                $termname = $term->name;
                                $termname = str_replace('&amp; ', '', $termname);
                                $termname = str_replace('&', '-', $termname);
                                $termname = str_replace(' ', '-', $termname);
                                echo '<li style="list-style:inline;"><a href="javascript:void(0)" title="" class="filter-btn" data-groupid="'.$termname.'" data-filter=".'.$termname.'">'.$term->name.'</a></li>';
                            }
                        }
                    ?>
                </ul>
            </div>
        </div>
        <div id="portfolio" class="row" style="position:relative !important; padding:30px 0 30px 0;height:100%;">
            <div id="scrolly-side">
                <div class="scrolly">
                    <div id="blogContent" class="col-xs-12 col-sm-9 all post-items" style="border-right:1px solid #595958;">
                        <?php while ( $loop->have_posts() ) : $loop->the_post();
                            $postTitle = get_the_title();
                            $postDate = get_the_date();
                            $thumb = get_post_thumbnail_id();
                            $img_url = wp_get_attachment_url( $thumb,'medium'); //get img URL
                            $image = aq_resize( $img_url, 200, 138, true ); //resize & crop img
                            $excerpt = get_the_excerpt();
                            $excerpt = substr($excerpt, 0, 300);
                            if( strlen($excerpt) >= 250 ){
                                $excerpt .= '... <a href="'. get_permalink($post->ID) .'">More</a>';
                            }
                                //$taxID = null;
                                //if( array_key_exists( $tax, $groupTerms ) ){
                                //$taxID = $groupTerms[$tax];
                                //}
                            ?>
                            <div class="blog-post container-fluid">
                                <div class="row podRow">
                                    <div class="col-xs-4">
                                        <a href="<?php the_permalink($post->ID); ?>" title="<?= $title; ?>">
                                            <img src="<?= $image; ?>" class="img-responsive alignleft mobile-stack">
                                        </a>
                                    </div>
                                    <div class="col-xs-8">
                                        <a href="<?= print get_permalink($post->ID); ?>" class="galleryItem" title="<?= $title;?>"><h2 class="project-title"><?= $postTitle; ?></h2></a>
                                        <div clsss="pod-details"><?= $postDate; ?></div>
                                        <?php echo $excerpt; ?>
                                    </div>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    </div>
                    
                    <div class="col-sm-3">
                        <figure class='sticky'>
                            <div class='bar-outer'>
                                <div id="right-sidebar-anchor"></div>
                                <div id="right-sidebar">
                                <?php get_template_part('templates/right-sidebar-blog-nav'); ?>
                            </div>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<?php

get_template_part('templates/footer-block');

get_footer(); ?>