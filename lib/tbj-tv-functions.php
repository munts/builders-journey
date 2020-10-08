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

add_action( 'cmb2_admin_init', 'cws_confluence_register_video_metabox' );
/**
 * Hook in and add a demo metabox. Can only happen on the 'cmb2_admin_init' or 'cmb2_init' hook.
 */
function cws_confluence_register_video_metabox()
{

    // Start with an underscore to hide fields from custom fields list
    $prefix = '_confluence_two_col_video_';

    /**
     * Sample metabox to demonstrate each field type included
     */
    $cmb_demo = new_cmb2_box(array(
        'id' => $prefix . 'metabox',
        'title' => __('Two Column video Layout Custom Fields', 'cmb2'),
        'object_types'  => array( 'vids', ), // Post type
        //'show_on'      => array( 'key' => 'page-template', 'value' => 'tbj-tv-channel.php' ),
        //'show_on_cb' => '_be_confluence_frontpage_show_if_front_page', // function should return a bool value
        // 'context'    => 'normal',
        // 'priority'   => 'high',
        // 'show_names' => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // true to keep the metabox closed by default
    ));

    $cmb_demo->add_field(array(
        'name' => __('Custom Hero Image image', 'cmb2'),
        'desc' => __('Upload an image or enter a URL.  This will be the image that shows up next to the Welcome Message - 1400x900', 'cmb2'),
        'id' => $prefix . 'custom_image',
        'type' => 'file',
    ));

    $cmb_demo->add_field(array(
        'name' => __('video Category to query', 'cmb2'),
        'desc' => __('field description (optional)', 'cmb2'),
        'id' => $prefix . 'category',
        'type' => 'text'
    ));

    $cmb_demo->add_field( array(
        'name' => __( 'Thumbnail Image', 'cmb2' ),
        'desc' => __( 'This is the thumbnail that gets displayed in next to the Video.', 'cmb2' ),
        'id'   => $prefix . 'vid_thumbnail',
        'type' => 'file',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'iframe URL', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'iframe_url',
        'type' => 'text_url',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name' => __( 'Video Episode ID', 'cmb2' ),
        'desc' => __( 'field description (optional)', 'cmb2' ),
        'id'   => $prefix . 'episode_id',
        'type' => 'text',
        // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
        // 'repeatable' => true,
    ) );

    $cmb_demo->add_field( array(
        'name'    => __( 'Video Notes Content', 'cmb2' ),
        'desc'    => __( 'This is where you enter the Video Notes provided by Travis.', 'cmb2' ),
        'id'      => $prefix . 'description',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 5, ),
    ) );
    $cmb_demo->add_field( array(
        'name'    => __( 'Video Short Description Content', 'cmb2' ),
        'desc'    => __( 'This is where you enter a short description of the Video.', 'cmb2' ),
        'id'      => $prefix . 'short_description',
        'type'    => 'wysiwyg',
        'options' => array( 'textarea_rows' => 2, ),
    ) );

    // end fields

}
