<?php
/**
 * Including all required lib files in the theme
 */
require_once( dirname(__FILE__) . '/lib/one-site-options.php');
require_once( dirname(__FILE__) . '/lib/one-frontpage-options.php');
require_once( dirname(__FILE__) . '/lib/one-podcast-functions.php');
require_once( dirname(__FILE__) . '/lib/team-functions.php');
require_once( dirname(__FILE__) . '/lib/gallery-functions.php');
require_once( dirname(__FILE__) . '/lib/secondary-functions.php');
require_once( dirname(__FILE__) . '/lib/two-col-podcast-functions.php');
require_once( dirname(__FILE__) . '/lib/tbj-tv-functions.php');
require_once( dirname(__FILE__) . '/lib/wp_bootstrap_navwalker.php');
require_once( dirname(__FILE__) . '/lib/aq_resizer.php');
//require_once( dirname(__FILE__) . '/lib/wp-bootstrap-navwalker.php'); // Not using today, but might need in near future.
require_once( dirname(__FILE__) . '/lib/tgm-plugin-activation/class-tgm-plugin-activation.php');

function cws_multitheme_register_required_plugins() {
    /*
     * Array of plugin arrays. Required keys are name and slug.
     * If the source is NOT from the .org repo, then source is also required.
     */
    $plugins = array(
        // This is an example of how to include a plugin from the WordPress Plugin Repository.
        array(
            'name'      => 'CMB2',
            'slug'      => 'cmb2',
            'required'  => true,
        ),
        array(
            'name'      => 'CMB2 Typography',
            'slug'      => 'cmb2-typography-master',
            'required'  => true,
        ),
    );

    $config = array(
        'id'           => 'tgmpa',                 // Unique ID for hashing notices for multiple instances of TGMPA.
        'default_path' => '',                      // Default absolute path to bundled plugins.
        'menu'         => 'tgmpa-install-plugins', // Menu slug.
        'parent_slug'  => 'themes.php',            // Parent menu slug.
        'capability'   => 'edit_theme_options',    // Capability needed to view plugin install page, should be a capability associated with
        // the parent menu used.
        'has_notices'  => true,                    // Show admin notices or not.
        'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
        'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
        'is_automatic' => false,                   // Automatically activate plugins after installation or not.
        'message'      => '',                      // Message to output right before the plugins table.
    );

    tgmpa( $plugins, $config );
}

/** Including all required style files in the theme **/
function oneConfluence_styles() {
    wp_register_style('vendor', get_template_directory_uri() .'/css/vendor/vendor.min.css', array(), null, 'all' );
    wp_register_style('main', get_template_directory_uri() .'/css/main.css', array(), null, 'all' );
    wp_register_style('styles', get_stylesheet_uri(), array(), '2.7.0','all' );
    wp_enqueue_style( 'vendor' );
    wp_enqueue_style( 'main' );
    wp_enqueue_style( 'styles' );
    /** Google fonts-opensans **/
    wp_enqueue_style('one-opensans', '//fonts.googleapis.com/css?family=Open+Sans:400,600,700,800,300,400italic');
}

add_action('wp_enqueue_scripts', 'oneConfluence_styles');

/** Include all required javascript files in the theme **/
function oneConfluence_scripts() {
    wp_enqueue_script('vendor', get_template_directory_uri() . '/js/vendor/vendor.min.js', array('jquery'), '', true);
    wp_enqueue_script('custom', get_template_directory_uri() . '/js/custom.js', array('jquery', 'vendor'), '', true);
    //wp_register_script( 'loadmorejs', get_template_directory_uri() . '/js/loadmore.js', array('jquery'), true );
     /** Easing javascript file **/
    //wp_enqueue_script( 'loadmorejs' );
    wp_localize_script( 'custom', 'ajax_posts', array(
        'ajaxurl' => admin_url( 'admin-ajax.php' ),
        'noposts' => __('No older posts found', 'one-confluence'),
    ));	
}

add_action('wp_enqueue_scripts', 'oneConfluence_scripts');
 


function Get_most_recent_permalink(){
    global $post;
    $tmp_post = $post;
    $args = array(
        'numberposts'     => 1,
        'offset'          => 0,
        'orderby'         => 'post_date',
        'order'           => 'DESC',
        'post_type'       => 'podcasts',
        'post_status'     => 'publish' );
    $myposts = get_posts( $args );
    $permalink = get_permalink($myposts[0]->ID);
    $post = $tmp_post;
    return $permalink;
}

//FUNCTION TO GET GOOGLE FONTS
    function setup_google_fonts(){
        $customFontData = one_get_option('typography');
         return $customFontData['font-family'];
    }
    function setup_custom_font_data(){

        $customFontData = one_get_option('typography');
        return $customFontData;
    }

function one_confluence_get_wysiwyg_output( $meta_key, $post_id = 2 ) {
    global $wp_embed;

    $post_id = $post_id ? $post_id : get_the_id();

    $content = get_post_meta( $post_id, $meta_key, 1 );
    $content = $wp_embed->autoembed( $content );
    $content = $wp_embed->run_shortcode( $content );
    //$content = wpautop( $content );
    $content = do_shortcode( $content );

    return $content;
};

// Prevent WP from adding <p> tags on pages
function disable_wp_auto_p( $content ) {
    if ( is_front_page() ) {
        remove_filter( 'the_content', 'wpautop' );
    }
    return $content;
}
add_filter( 'the_content', 'disable_wp_auto_p', 0 );



function custom_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

//Creating Custom Post types for the podcasts
function setup_podcast_cpt(){
    $labels = array(
        'name' => _x('podcasts', 'post type general name'),
        'singular_name' => _x('Podcast', 'post type singular name'),
        'add_new' => _x('Add New', 'Podcast'),
        'add_new_item' => __('Add New Podcast'),
        'edit_item' => __('Edit Podcast'),
        'new_item' => __('New Podcast'),
        'all_items' => __('All Podcasts'),
        'view_item' => __('View Podcast'),
        'search_items' => __('Search Podcasts'),
        'not_found' => __('No Podcasts Found'),
        'not_found_in_trash' => __('No Podcasts found in the trash'),
        'parent_item_colon' => '',
        'menu_name' => 'Podcasts'
    );
    $args = array(
        'labels' => $labels,
        'description' => 'Podcasts',
        'rewrite' => array('slug' => 'podcasts'),
        'public' => true,
        'menu_position' => 5,
        'supports' => array('title', 'thumbnail', 'editor', 'excerpt', 'custom-fields'),
        'has_archive' => true,
        'taxonomies' => array(''),
        'menu_icon' => 'dashicons-images-alt2',
    );
    register_post_type('podcasts', $args);
}
add_action('init', 'setup_podcast_cpt');

function podcast_taxonomy() {
    register_taxonomy(
        'podcast_categories',  //The taxonomy name
        'podcasts',        //post type name
        array(
            'hierarchical' => true,
            'label' => 'Podcast Categories',  //Display name
            'query_var' => true,
            'rewrite' => array(
                'slug' => 'podcasts', // base slug that will display before each term
                'with_front' => false // Don't display the category base before
            )
        )
    );
}
add_action( 'init', 'podcast_taxonomy');

//Creating Custom Post types for the Videos
function setup_vids_cpt(){
    $labels = array(
        'name' => _x('vids', 'post type general name'),
        'singular_name' => _x('vid', 'post type singular name'),
        'add_new' => _x('Add New', 'Video'),
        'add_new_item' => __('Add New Video'),
        'edit_item' => __('Edit Video'),
        'new_item' => __('New Video'),
        'all_items' => __('All Videos'),
        'view_item' => __('View Video'),
        'search_items' => __('Search Videos'),
        'not_found' => __('No Videos Found'),
        'not_found_in_trash' => __('No Videos found in the trash'),
        'parent_item_colon' => '',
        'menu_name' => 'Videos'
    );
    $args = array(
        'labels' => $labels,
        'description' => 'Videos',
        'rewrite' => array('slug' => 'vids'),
        'public' => true,
        'menu_position' => 5,
        'supports' => array('title', 'thumbnail', 'editor', 'excerpt', 'custom-fields'),
        'has_archive' => true,
        'taxonomies' => array(''),
        'menu_icon' => 'dashicons-video-alt2',
    );
    register_post_type('vids', $args);
}
add_action('init', 'setup_vids_cpt');

function video_taxonomy() {
    register_taxonomy(
        'video_categories',  //The taxonomy name
        'vids',        //post type name
        array(
            'hierarchical' => true,
            'label' => 'Video Categories',  //Display name
            'query_var' => true,
            'rewrite' => array(
                'slug' => 'vids', // base slug that will display before each term
                'with_front' => false // Don't display the category base before
            )
        )
    );
}
add_action( 'init', 'video_taxonomy');

///** OneConfluence Theme Setup **/
function oneConfluence_setup() {
    add_theme_support('post-thumbnails');
    add_image_size('post_thumbnail', 600, 250, true);
    add_image_size('post_thumbnail_1', 70, 70, true);
    add_image_size( 'gallery-thumb', 186, 318, true );
    add_theme_support('automatic-feed-links');

// Register menus

    register_nav_menus(array(
            'frontpage-menu' => __('Front Page Menu', 'one-confluence'),
            'frontpage-right-menu' => __('Front Page Right Menu', 'one-confluence'),
            'frontpage-mobile-menu' => __('Mobile Menu', 'one-confluence'),
            'blog-page-menu' => __('Blog and Post Menu', 'one-confluence'),
        )
    );
}

add_action('after_setup_theme', 'oneConfluence_setup');

function one_front_nav() {
    if (function_exists('wp_nav_menu'))
        wp_nav_menu(array(
            'theme_location' => 'frontpage-menu',
            'menu_class' => 'nav navbar-nav navbar-left',
            'menu_id' => 'one_menu',
            'container' => '',
            'container_class' => '',
            //'fallback_cb' => 'one_front_nav_fallback',  Removed fallback because we changed directions so many times and this is so specific that I don't see there ever being a fallback
            'walker' => new wp_bootstrap_navwalker()));
}

function one_front_nav_two() {
    if (function_exists('wp_nav_menu'))
        wp_nav_menu(array(
            'theme_location' => 'blog-page-menu',
            'menu_class' => 'nav navbar-nav navbar-left',
            'menu_id' => 'one_menu',
            'container' => '',
            'container_class' => '',
            //'fallback_cb' => 'one_front_nav_fallback',  Removed fallback because we changed directions so many times and this is so specific that I don't see there ever being a fallback
            'walker' => new wp_bootstrap_navwalker()));
}

function one_right_nav() {
    if (function_exists('wp_nav_menu'))
        wp_nav_menu(array(
            'theme_location' => 'frontpage-right-menu',
            'menu_class' => 'nav navbar-nav navbar-right dropline2 clearfix',
            'menu_id' => 'one_menu2',
            'container' => '',
            'container_class' => '',
            //'fallback_cb' => 'one_front_nav_fallback',  Removed fallback because we changed directions so many times and this is so specific that I don't see there ever being a fallback
            'walker' => new wp_bootstrap_navwalker()));
}

function one_mobile_nav() {
    if (function_exists('wp_nav_menu'))
        wp_nav_menu(array(
            'theme_location' => 'frontpage-mobile-menu',
            'menu_class' => 'nav navbar-nav',
            'menu_id' => 'one_menu_mobile',
            'container' => 'false',
            'container_class' => '',
            'depth' => 2,
            //'fallback_cb' => 'one_front_nav_fallback',  Removed fallback because we changed directions so many times and this is so specific that I don't see there ever being a fallback
            'walker' => new wp_bootstrap_navwalker()));
}

function one_footer_left_sidebar() {
    register_sidebar(
        array (
            'name' => __( 'Footer Left', 'one-confluence' ),
            'id' => 'left-footer-side-bar',
            'description' => __( 'Bottom Left Sidebar in the Footer', 'one-confluence' ),
            'before_widget' => '<div class="widget-content">',
            'after_widget' => "</div>",
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
}
add_action( 'widgets_init', 'one_footer_left_sidebar' );

function one_footer_middle_sidebar() {
    register_sidebar(
        array (
            'name' => __( 'Footer Middle', 'one-confluence' ),
            'id' => 'middle-footer-side-bar',
            'description' => __( 'Middle Sidebar in the Footer', 'one-confluence' ),
            'before_widget' => '<div class="widget-content">',
            'after_widget' => "</div>",
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
}
add_action( 'widgets_init', 'one_footer_middle_sidebar' );

function one_footer_right_sidebar() {
    register_sidebar(
        array (
            'name' => __( 'Footer right', 'one-confluence' ),
            'id' => 'right-footer-side-bar',
            'description' => __( 'Bottom Right Sidebar in the Footer', 'one-confluence' ),
            'before_widget' => '<div class="widget-content">',
            'after_widget' => "</div>",
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        )
    );
}
add_action( 'widgets_init', 'one_footer_right_sidebar' );

/**
 * Set the content width based on the theme's design and stylesheet.
 * Used to set the width of images and content. Should be equal to the width the theme
 * is designed for, generally via the style.css stylesheet.
 */
//if (!isset($content_width))
//    $content_width = 590; //This too was messed up and not being used in this version.  go back to version 2 or 3 to see this.

//Creating Custom Post types for Gallery
function setup_gallery_cpt(){
    $labels = array(
        'name' => _x('gallery', 'post type general name'),
        'singular_name' => _x('gallery', 'post type singular name'),
        'add_new' => _x('Add New', 'Gallery'),
        'add_new_item' => __('Add New Gallery'),
        'edit_item' => __('Edit Gallery'),
        'new_item' => __('New Gallery'),
        'all_items' => __('All galleries'),
        'view_item' => __('View Gallery'),
        'search_items' => __('Search galleries'),
        'not_found' => __('No Gallery Found'),
        'not_found_in_trash' => __('No Gallery found in the trash'),
        'parent_item_colon' => '',
        'menu_name' => 'Gallery'
    );
    $args = array(
        'labels' => $labels,
        'description' => 'PKS Galleries',
        'rewrite' => array('slug' => 'gallery'),
        'public' => true,
        'menu_position' => 5,
        'supports' => array('title', 'custom-fields'),
        'has_archive' => true,
        'taxonomies' => array(''),
        'menu_icon' => 'dashicons-welcome-write-blog',
    );
    register_post_type('gallery', $args);
}
add_action('init', 'setup_gallery_cpt');


//Trm excerpt - keeping this in, but currently not using it.  May want to use this so that copy doesn't bleed into it's following sections.
//May want to change this up to explicitly set the excerpt length.
function oneConfluence_trim_excerpt($length) {
    global $post;
    $explicit_excerpt = $post->post_excerpt;
    if ('' == $explicit_excerpt) {
        $text = get_the_content('');
        $text = apply_filters('the_content', $text);
        $text = str_replace(']]>', ']]>', $text);
    } else {
        $text = apply_filters('the_content', $explicit_excerpt);
    }
    $text = strip_shortcodes($text); // optional
    $text = strip_tags($text);
    $excerpt_length = $length;
    $words = explode(' ', $text, $excerpt_length + 1);
    if (count($words) > $excerpt_length) {
        array_pop($words);
        array_push($words, '...');
        $text = implode(' ', $words);
        $text = apply_filters('the_excerpt', $text);
    }
    return $text;
}

function more_post_ajax(){

    $ppp = (isset($_POST["ppp"])) ? $_POST["ppp"] : 8;
    $page = (isset($_POST['pageNumber'])) ? $_POST['pageNumber'] : 0;

    header("Content-Type: text/html");
        //$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
        $podResults = new WP_Query(array(
            'suppress_filters' => true,
            'post_type' => 'podcasts',
            'posts_per_page' => $ppp,
            'paged'          => $page,
            'orderby' => 'date',
            'order' => 'DESC',
            'post_status' => 'publish',
        ));
        $podPosts = $podResults->get_posts();

        //loop through results set
        foreach ($podPosts as $podPost) {
            /*
            Pull category for each unique post using the ID
            */
            $terms = get_the_terms( $podPost->ID, 'podcast_categories' );
            if ( $terms && ! is_wp_error( $terms ) ) :
                $links = array();
                foreach ( $terms as $term ) {

                    $links[] = $term->name;

                }
                $tax_links = join( " ", str_replace(' ', '-', $links));
                $tax = strtolower($tax_links);
            else :
                $tax = '';
            endif;
            $images = get_field('gallery', $podPost->ID);
            $podTitle = get_the_title($podPost);
            $podUrl = get_permalink($podPost);
            $podContent = get_the_content($podPost);
            $podExcerpt = get_the_excerpt($podPost->ID);
            $featured_img_url = get_the_post_thumbnail_url($podPost->ID,'thumb');
            $podImageUrl = the_post_thumbnail('thumbnail');
            $podImageUrlThumb = get_post_meta( $podPost->ID, '_one_podcast_pod_thumbnail', true, 'thumb' );
            $pod_thumbnail = get_post_meta($podPost->ID, '_one_podcast_pod_thumbnail', true);
            $image = wp_get_attachment_image( get_post_meta($podPost->ID, '_one_podcast_pod_thumbnail_id', 1 ), 'thumb' );
            $pod_iframeUrl = get_post_meta($podPost->ID, '_one_podcast_iframe_url', true);
            $podId = get_post_meta($podPost->ID, '_one_podcast_episode_id', true);
            $vidUrl = get_post_meta($podPost->ID, '_one_podcast_video_url', true);
            $podLongDescription = get_post_meta($podPost->ID, '_one_podcast_description', true);
            $podShortDescription = get_post_meta($podPost->ID, '_one_podcast_short_description', true);
            $trimmedPodShortDescription = substr($podShortDescription, 0, 200);
            $more = '...';
            $podDescriptionOutput = $trimmedPodShortDescription . $more;
            ?>

            <div class="podcast">
                <article class="pod-entry-1">
                    <div class="container-fluid">
                        <div class="row podRow">
                            <div class="col-xs-12 col-sm-5">
                                <h2 class="podTitle"><a href="<?= $podUrl; ?>"><?= $podTitle; ?></a></h2>
                                <?php
                                echo '<iframe style="border: none" src="//html5-player.libsyn.com/embed/episode/id/'. $podId . '/height/90/theme/custom/thumbnail/yes/preload/no/direction/backward/render-playlist/no/custom-color/145da1/" height="90" width="100%" scrolling="no"  allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>';
                                ?>
                            </div>
                            <div class="col-xs-12 col-sm-1" style="padding:0;">
                                <img src="<?= $pod_thumbnail; ?>" class="img-responsive" style="width:100px;">

                            </div>
                            <div class="col-xs-12 col-sm-6">
                                <div class="podcastExcerpt"><?= $podDescriptionOutput; ?></div>
                                <?php if (!empty ($images)) { ?>
                                    <a class="moreLink" href="<?= $podUrl; ?>"><img src="/wp-content/themes/one-confluence/assets/camera-sm.png" style="width:65%;"></a>
                                <?php }
                                if (!empty ($vidUrl)) { ?>
                                    <a class="moreLink" href="<?= $vidUrl; ?>"><img src="/wp-content/themes/one-confluence/assets/movie.png" style="width:50%;"></a>
                                <?php } 
                                if (!empty ($podUrl)) { ?>
                                    <a class="moreLink" href="<?= $podUrl; ?>"><img src="/wp-content/themes/one-confluence/assets/mic_headphones.png" style="width:50%;"></a>
                                <?php }
                                else{ ?>
                                    <a class="moreLink" href="<?= $podUrl; ?>">Read More</a>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                    <div>
                </article>
            </div>

        <?php } // END foreach 
    wp_reset_postdata();
    die($out);
}

add_action('wp_ajax_nopriv_more_post_ajax', 'more_post_ajax');
add_action('wp_ajax_more_post_ajax', 'more_post_ajax');

function all_post_ajax(){

    $app = (isset($_POST["app"])) ? $_POST["app"] : -1;
    $page = (isset($_POST['pageNumber'])) ? $_POST['pageNumber'] : 0;

    header("Content-Type: text/html");
        //$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
        $podResults = new WP_Query(array(
            'suppress_filters' => true,
            'post_type' => 'podcasts',
            'posts_per_page' => $app,
            'paged'          => $page,
            'orderby' => 'date',
            'order' => 'DESC',
            'post_status' => 'publish',
        ));
        $podPosts = $podResults->get_posts();

        //loop through results set
        foreach ($podPosts as $podPost) {
            /*
            Pull category for each unique post using the ID
            */
            // $terms = get_the_terms( $podPost->ID, 'podcast_categories' );
            // if ( $terms && ! is_wp_error( $terms ) ) :
            //     $links = array();
            //     foreach ( $terms as $term ) {

            //         $links[] = $term->name;

            //     }
            //     $tax_links = join( " ", str_replace(' ', '-', $links));
            //     $tax = strtolower($tax_links);
            // else :
            //     $tax = '';
            // endif;
            $images = get_field('gallery', $podPost->ID);
            $podTitle = get_the_title($podPost);
            $podUrl = get_permalink($podPost);
            //$podContent = get_the_content($podPost);
            //$podExcerpt = get_the_excerpt($podPost->ID);
            //$featured_img_url = get_the_post_thumbnail_url($podPost->ID,'thumb');
            //$podImageUrl = the_post_thumbnail('thumbnail');
            //$podImageUrlThumb = get_post_meta( $podPost->ID, '_one_podcast_pod_thumbnail', true, 'thumb' );
            //$pod_thumbnail = get_post_meta($podPost->ID, '_one_podcast_pod_thumbnail', true);
            //$image = wp_get_attachment_image( get_post_meta($podPost->ID, '_one_podcast_pod_thumbnail_id', 1 ), 'thumb' );
            //$pod_iframeUrl = get_post_meta($podPost->ID, '_one_podcast_iframe_url', true);
            $podId = get_post_meta($podPost->ID, '_one_podcast_episode_id', true);
            $vidUrl = get_post_meta($podPost->ID, '_one_podcast_video_url', true);
            //$podLongDescription = get_post_meta($podPost->ID, '_one_podcast_description', true);
            //$podShortDescription = get_post_meta($podPost->ID, '_one_podcast_short_description', true);
            //$trimmedPodShortDescription = substr($podShortDescription, 0, 200);
            //$more = '...';
            //$podDescriptionOutput = $trimmedPodShortDescription . $more;
            ?>

            <div class="podcast">
                <article class="pod-entry-1">
                    <div class="container-fluid">
                        <div class="row podRow">
                            <div class="col-xs-12 col-sm-8"> 
                                <h2 class="podTitle"><a href="<?= $podUrl; ?>"><?= $podTitle; ?></a></h2>
                            </div>
                            <div class="hidden-xs col-sm-4">
                                <ul class="post-icons">
                                    <?php if (!empty ($images)) { ?>
                                        <li><img src="/wp-content/themes/one-confluence/assets/camera-xs.png"></li>
                                    <?php }
                                    if (!empty ($vidUrl)) { ?>
                                        <li><img src="/wp-content/themes/one-confluence/assets/movie-xs.png"></li>
                                    <?php } 
                                    if (!empty ($podUrl)) { ?>
                                        <li><img src="/wp-content/themes/one-confluence/assets/mic_headphones-xs.png"></li>
                                    <?php } ?>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

        <?php } // END foreach 
    wp_reset_postdata();
    die($out);
}

add_action('wp_ajax_nopriv_all_post_ajax', 'all_post_ajax');
add_action('wp_ajax_all_post_ajax', 'all_post_ajax');

function disable_emojicons_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
        return array();
    }
}

function disable_wp_emojicons() {

    // all actions related to emojis
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

    // filter to remove TinyMCE emojis
    add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
add_action( 'init', 'disable_wp_emojicons' );
