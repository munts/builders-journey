<?php
/**
 * Include and setup custom metaboxes and fields. (make sure you copy this file to outside the CMB2 directory)
 *
 * Be sure to replace all instances of 'yourprefix_' with your project's prefix.
 * http://nacin.com/2010/05/11/in-wordpress-prefix-everything/
 *
 * @category YourThemeOrPlugin
 * @package  Demo_CMB2
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/WebDevStudios/CMB2
 */

/**
 * Get the bootstrap! If using the plugin from wordpress.org, REMOVE THIS!
 */

if ( file_exists( dirname( __FILE__ ) . '/cmb2/init.php' ) ) {
    require_once dirname( __FILE__ ) . '/cmb2/init.php';
} elseif ( file_exists( dirname( __FILE__ ) . '/CMB2/init.php' ) ) {
    require_once dirname( __FILE__ ) . '/CMB2/init.php';
}

/**
 * Conditionally displays a metabox when used as a callback in the 'show_on_cb' cmb2_box parameter
 *
 * @param  CMB2 object $cmb CMB2 object
 *
 * @return bool             True if metabox should show
 */
function one_front_show_if_front_page( $cmb ) {
    // Don't show this metabox if it's not the front page template
    if ( $cmb->object_id !== get_option( 'page_on_front' ) ) {
        return false;
    }
    return true;
}

add_action( 'cmb2_admin_init', 'one_register_frontpage_metabox' );
/**
 * Hook in and add a demo metabox. Can only happen on the 'cmb2_admin_init' or 'cmb2_init' hook.
 */
function one_register_frontpage_metabox() {
    $prefix = '_one_front_';

    /**
     * Sample metabox to demonstrate each field type included
     */
    $cmb_demo = new_cmb2_box( array(
        'id'            => $prefix . 'metabox',
        'title'         => __( 'Front Page Featured Blocks/Sections', 'cmb2' ),
        'object_types'  => array( 'page', ), // Post type
        'show_on'      => array( 'key' => 'page-template', 'value' => 'front-page.php' ),
        //'show_on_cb' => 'show_if_front_page', // function should return a bool value
        'context'    => 'normal',
        'priority'   => 'high',
        'show_names' => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // true to keep the metabox closed by default
    ) );

    // Static Hero vs. Slider toggle
    $cmb_demo->add_field( array(
        'name'    => 'This Radio button determines which layout to use for the top of the site',
        'id'      => $prefix .'hero_layout',
        'type'    => 'radio_inline',
        'options' => array(
            'hero' => __( 'Static Hero', 'cmb2' ),
            'slider'   => __( 'Slider/Carousel', 'cmb2' ),
        ),
        'default' => 'hero',
    ) );

    // This is the Slider ID
    $cmb_demo->add_field( array(
        'name' => __( 'Post ID for the Homepage Slider', 'cmb2' ),
        'desc' => __( 'This is the post id of the Homepage Slider section that is to be used on the homepage, if a static hero image is not selected.', 'cmb2' ),
        'id'   => $prefix . 'slider_id',
        'type' => 'text',
        'before_row'   => '<div style="padding:30px 0;">This is the To Slider Section that puts a slider at the top of the website:  <b>"POST ID"</b></div>',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Block One: Image', 'cmb2' ),
        'desc' => __( 'This is the main intro/hero image at the top of the page.', 'cmb2' ),
        'id'   => $prefix . 'one_image',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Block One: Top Title', 'cmb2' ),
        'desc' => __( 'This is the title that gets displayed in the middle Title Block container.  Ie. Purpose, but it can be changed to love or passion, etc.', 'cmb2' ),
        'id'   => $prefix . 'one_top',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Block One: Sub-Heading Title', 'cmb2' ),
        'desc' => __( 'This is a sub heading that goes just below the Top Title.  This is an H2.', 'cmb2' ),
        'id'   => $prefix . 'one_bottom',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Seven Step Button: Image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'seven_step_button',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Seven Step File URL', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'seven_step_url',
        'type' => 'text_url',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );
    $cmb_demo->add_field( array(
        'name'    => __( 'Seven Step Content', 'cmb2' ),
        'desc'    => __( 'This is where you enter the form shortcode or other content you want to display for the Seven Step Prcess.', 'cmb2' ),
        'id'      => $prefix . 'seven_step_wysiwyg',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'One wysiwyg', 'cmb2' ),
        'desc'    => __( 'This is where you would put SEO rich welcome content.', 'cmb2' ),
        'id'      => $prefix . 'one_wysiwyg',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    /*$cmb_demo->add_field( array(
        'name' => __( 'Block One: URL', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'one_url',
        'type' => 'text_url',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );*/

    $cmb_demo->add_field( array(
        'name' => __( 'Block two: Top Title', 'cmb2' ),
        'desc' => __( 'H1 heading for the second block/section', 'cmb2' ),
        'id'   => $prefix . 'two_top',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    /*$cmb_demo->add_field( array(
        'name' => __( 'Block two: Bottom Title/Subheading', 'cmb2' ),
        'desc' => __( 'Sub Heading title - H2', 'cmb2' ),
        'id'   => $prefix . 'two_bottom',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );*/

    //Originally, we were using an image for the heading, but changed this to be a text field to render a text title.  Leaving this in just in case we go back to an image.
    /*$cmb_demo->add_field( array(
        'name' => __( 'Block two: Header Image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'two_header',
        'type' => 'file',
    ) );*/

    $cmb_demo->add_field( array(
        'name' => __( 'Block two: Image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'two_image',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'two wysiwyg', 'cmb2' ),
        'desc'    => __( 'This is the field for copy/content', 'cmb2' ),
        'id'      => $prefix . 'two_wysiwyg',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

        $cmb_demo->add_field( array(
        'name' => __( 'Block three: Top Title', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'three_top',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

   /* $cmb_demo->add_field( array(
        'name' => __( 'Block three: Bottom Title/Subheading', 'cmb2' ),
        'desc' => __( 'Sub Heading title - H2', 'cmb2' ),
        'id'   => $prefix . 'three_bottom',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) ); */

    $cmb_demo->add_field( array(
        'name' => __( 'Block three: Image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'three_image',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'three wysiwyg', 'cmb2' ),
        'desc'    => __( 'content field', 'cmb2' ),
        'id'      => $prefix . 'three_wysiwyg',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );


    $cmb_demo->add_field( array(
        'name' => __( 'Block four: Top Title', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'four_top',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    /* $cmb_demo->add_field( array(
        'name' => __( 'Block four: Bottom Title', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'four_bottom',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) ); */

    $cmb_demo->add_field( array(
        'name' => __( 'Block four: Image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'four_image',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Four wysiwyg', 'cmb2' ),
        'desc'    => __( 'content field', 'cmb2' ),
        'id'      => $prefix . 'four_wysiwyg',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    // This is the Team Post ID
    $cmb_demo->add_field( array(
        'name' => __( 'Post ID for the Team Carousel', 'cmb2' ),
        'desc' => __( 'This is the post id of the Team section that is to be used on the homepage.', 'cmb2' ),
        'id'   => $prefix . 'team_id',
        'type' => 'text',
        'before_row'   => '<div style="padding:30px 0;">This is the Carousel Section that pulls content from the Team Custom Post Type:  <b>"POST ID"</b></div>',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    // This is the Gallery Post ID
    $cmb_demo->add_field( array(
        'name' => __( 'Post ID for the Gallery Carousel', 'cmb2' ),
        'desc' => __( 'This is the post id of the Gallery section that is to be used on the homepage.', 'cmb2' ),
        'id'   => $prefix . 'gallery_id',
        'type' => 'text',
        'before_row'   => '<div style="padding:30px 0;">This is the Carousel Section that pulls content from the Gallery Custom Post Type:  <b>"POST ID"</b></div>',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    // _team layout toggle
    $cmb_demo->add_field( array(
        'name'    => 'This Radio button determines which layout to use for the Gallery section',
        'id'      => 'gallery_layout',
        'type'    => 'radio_inline',
        'options' => array(
            'boxed' => __( 'Boxed Layout', 'cmb2' ),
            'fluid'   => __( 'Fluid/Full Width Layout file', 'cmb2' ),
        ),
        'default' => 'boxed',
    ) );

    /* $cmb_demo->add_field( array(
        'name' => __( 'Gallery Data Title Attribute', 'cmb2' ),
        'desc' => __( 'This is the word that shows up in the middle title block container when a user is in this section.', 'cmb2' ),
        'id'   => $prefix . 'gallery_title',
        'type' => 'text',
        'after'   => '<div style="padding:10px 0;">All of the other section pull from the Title that gets entered above the description, but this section is slightly different.  So, you can change this from team to passion, etc.</div>',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) ); */

    // _team layout toggle
    $cmb_demo->add_field( array(
        'name'    => 'This Radio button determines which layout to use for the team section',
        'id'      => 'team_layout',
        'type'    => 'radio_inline',
        'options' => array(
            'boxed' => __( 'Boxed Layout', 'cmb2' ),
            'fluid'   => __( 'Fluid/Full Width Layout file', 'cmb2' ),
        ),
        'default' => 'boxed',
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Team Data Title Attribute', 'cmb2' ),
        'desc' => __( 'This is the word that shows up in the middle title block container when a user is in this section.', 'cmb2' ),
        'id'   => $prefix . 'team_title',
        'type' => 'text',
        'after'   => '<div style="padding:10px 0;">All of the other section pull from the Title that gets entered above the description, but this section is slightly different.  So, you can change this from team to passion, etc.</div>',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Team Background Image: Image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'team_background_image',
        'type' => 'file',
        'after'   => '<div style="padding-bottom:30px;"></div>',
        'after_row'   => '<p style="font-style: italic;">Restart the content sections/blocks.</p>',
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Block five: Top Title', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'five_top',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

   /* $cmb_demo->add_field( array(
        'name' => __( 'Block five: Bottom Title', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'five_bottom',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) ); */

    $cmb_demo->add_field( array(
        'name' => __( 'Block five: Image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'five_image',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'five wysiwyg', 'cmb2' ),
        'desc'    => __( 'field description (optional)', 'cmb2' ),
        'id'      => $prefix . 'five_wysiwyg',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );


    // New What's in a name custom fields - New as of Oct-2018 -
    // These use the 3-4 paragraphs of text with the plumb bob, Navigate the stars, Eiffel Tower...
    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Plumb Bob image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'name_plumb_bob',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Contact image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'name_contact_image',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Signature image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'name_signature_image',
        'type' => 'file',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Paragraph 1', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'name_paragraph_one',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );
    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Paragraph 2', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'name_paragraph_two',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Paragraph 3', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'name_paragraph_three',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Paragraph 4', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'name_paragraph_four',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );


    // old What's in a name fields - pre Oct-2018 - these tools used the modal to display a letter/pdf...
    /*$cmb_demo->add_field( array(
        'name' => __( 'Whats in a name: Data Attribute Title', 'cmb2' ),
        'desc' => __( 'This is the name that gets displayed in Middle Title Block container', 'cmb2' ),
        'id'   => $prefix . 'name_title',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );*/

    // _one_front_name_radio_toggle
   /* $cmb_demo->add_field( array(
        'name'    => 'This Radio button determines which method to use within the pop-up modal',
        'id'      => 'name_radio_toggle',
        'type'    => 'radio_inline',
        'options' => array(
            'text' => __( 'Text', 'cmb2' ),
            'doc'   => __( 'Image or PDF file', 'cmb2' ),
        ),
        'default' => 'doc',
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Whats in a name image:', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'name_image',
        'type' => 'file',
        'after' => 'This is the image that is used as a button to trigger the modal window.',
    ) );

    // New What's in a name custom fields - New as of Oct-2018 -
    // These use the 3-4 paragraphs of text with the plumb bob, Navigate the stars, Eiffel Tower...

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Paragraph 1', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'name_paragraph_one',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );
    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Paragraph 2', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'name_paragraph_two',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Paragraph 3', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'name_paragraph_three',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a name Paragraph 4', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'name_paragraph_four',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Whats in a name PDF file:', 'cmb2' ),
        'desc' => __( 'Upload PDF or enter a URL.', 'cmb2' ),
        'id'   => $prefix . 'name_pdf',
        'type' => 'file',
        'after' => 'This is the pdf or image that will open in the modal if the text option is not used.',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Whats in a Name wysiwyg', 'cmb2' ),
        'desc'    => __( 'This should only be used if you are not using a pdf file here.', 'cmb2' ),
        'id'      => $prefix . 'name_copy_wysiwyg',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
        'after' => 'If this text option is chosen, make sure to enable this option above.',
    ) ); */

    //Block Six/"Bookend" section

   /*  $cmb_demo->add_field( array(
        'name' => __( 'Block Six: Top Title', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'six_top',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Block six: Background Image', 'cmb2' ),
        'desc' => __( 'Upload an image or enter a URL.  The image should be at least 1280 pixels wide and 900 pixels tall', 'cmb2' ),
        'id'   => $prefix . 'six_image',
        'type' => 'file',
        'before_row'   => '<div style="text-align:center;padding:30px 0;"><b>This final section does not use a top and bottom title.  This section was designed to be the bottom "bookend" with call to action text and footer info.</b></div>',
    ) ); */

    /*$cmb_demo->add_field( array(
        'name'    => __( 'Six wysiwyg', 'cmb2' ),
        'desc'    => __( 'field description (optional)', 'cmb2' ),
        'id'      => $prefix . 'six_wysiwyg',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );*/

   /* $cmb_demo->add_field( array(
        'name'    => __( 'Bookend/CTA Title One (ex: Why)', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'six_why_title',
        'type'    => 'text',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'CTA Content One', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'six_why',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Bookend/CTA Title Two (ex: How)', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'six_how_title',
        'type'    => 'text',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'CTA Content Two', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'six_how',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );


    $cmb_demo->add_field( array(
        'name'    => __( 'Bookend/CTA Title Three (ex: When)', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'six_when_title',
        'type'    => 'text',
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'CTA Content Three', 'cmb2' ),
        'desc'    => __( '', 'cmb2' ),
        'id'      => $prefix . 'six_when',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'CTA URL', 'cmb2' ),
        'desc'    => __( 'This can be a url to a page, a modal, a file or an external url', 'cmb2' ),
        'id'      => $prefix . 'cta_url',
        'type'    => 'text_url',
    ) ); */

}