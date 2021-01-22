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

require_once WPMU_PLUGIN_DIR . '/cmb2-attached-posts-master/cmb2-attached-posts-field.php';

add_action( 'cmb2_admin_init', 'cws_confluence_register_post_metabox' );
/**
 * Hook in and add a demo metabox. Can only happen on the 'cmb2_admin_init' or 'cmb2_init' hook.
 */
function cws_confluence_register_post_metabox()
{

    // Start with an underscore to hide fields from custom fields list
    $prefix = '_confluence_post_';

    /**
     * Sample metabox to demonstrate each field type included
     */
    $cmb_demo = new_cmb2_box(array(
        'id' => $prefix . 'metabox',
        'title' => __('Blog Post Custom Fields', 'cmb2'),
        'object_types' => array('post'), // Post type
        //'show_on'      => array( 'key' => 'page-template', 'value' => 'tbj-secondary.php' ),
        //'show_on_cb' => '_be_confluence_frontpage_show_if_front_page', // function should return a bool value
        'context'      => 'normal', //  'normal', 'advanced', or 'side'
        'priority'     => 'high',  //  'high', 'core', 'default' or 'low'
        // 'show_names' => true, // Show field names on the left
        // 'cmb_styles' => false, // false to disable the CMB stylesheet
        // 'closed'     => true, // true to keep the metabox closed by default
    ));

    // // Classic CMB2 declaration
    // $cmb_demo = new_cmb2_box( array(
    //     'id'           => 'prefix-metabox-id',
    //     'title'        => __( 'Post Info' ),
    //     'object_types' => array( 'post', ), // Post type
    // ) );

    // // Add new field
    // $cmb_demo->add_field( array(
    //     'name'        => __( 'Related post' ),
    //     'id'          => 'prefix_related_post',
    //     'type'        => 'post_search_text', // This field type
    //     // post type also as array
    //     'post_type'   => 'post',
    //     // Default is 'checkbox', used in the modal view to select the post type
    //     //'select_type' => 'radio',
    //     // Will replace any selection with selection from modal. Default is 'add'
    //     'select_behavior' => 'replace',
    // ) );

    // $cmb_demo->add_field( array(
    //     'name' => __( 'Podcast Post ID', 'cmb2' ),
    //     'desc' => __( 'Does this blog post have a podcast associated with it', 'cmb2' ),
    //     'id'   => $prefix . 'pod_id',
    //     'type' => 'text',
    //     // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
    //     // 'repeatable' => true,
    // ) );

    // $cmb_demo->add_field( array(
    //     'name' => __( 'Video Post ID', 'cmb2' ),
    //     'desc' => __( 'Does this blog post have a video associated with it', 'cmb2' ),
    //     'id'   => $prefix . 'vid_id',
    //     'type' => 'text',
    //     // 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
    //     // 'repeatable' => true,
    // ) );

    // end fields

    $cmb_demo = new_cmb2_box( array(
		'id'           => 'cmb2_attached_posts_field',
		'title'        => __( 'Attached Posts', 'yourtextdomain' ),
		'object_types' => array( 'post' ), // Post type
		'context'      => 'normal',
		'priority'     => 'high',
		'show_names'   => false, // Show field names on the left
	) );

    $cmb_demo->add_field( array(
		'name'    => __( 'Attached Podcast', 'yourtextdomain' ),
		'desc'    => __( 'Drag posts from the left column to the right column to attach them to this page.<br />You may rearrange the order of the posts in the right column by dragging and dropping.', 'yourtextdomain' ),
		'id'      => 'attached_cmb2_attached_podcasts',
		'type'    => 'custom_attached_posts',
		'column'  => true, // Output in the admin post-listing as a custom column. https://github.com/CMB2/CMB2/wiki/Field-Parameters#column
		'options' => array(
			'show_thumbnails' => true, // Show thumbnails on the left
			'filter_boxes'    => true, // Show a text box for filtering the results
			'query_args'      => array(
				'posts_per_page' => 10,
				'post_type'      => 'podcasts',
			), // override the get_posts args
		),
    ) );
    
    $cmb_demo->add_field( array(
		'name'    => __( 'Attached Video', 'yourtextdomain' ),
		'desc'    => __( 'Drag posts from the left column to the right column to attach them to this page.<br />You may rearrange the order of the posts in the right column by dragging and dropping.', 'yourtextdomain' ),
		'id'      => 'attached_cmb2_attached_vids',
		'type'    => 'custom_attached_posts',
		'column'  => true, // Output in the admin post-listing as a custom column. https://github.com/CMB2/CMB2/wiki/Field-Parameters#column
		'options' => array(
			'show_thumbnails' => true, // Show thumbnails on the left
			'filter_boxes'    => true, // Show a text box for filtering the results
			'query_args'      => array(
				'posts_per_page' => 10,
				'post_type'      => 'vids',
			), // override the get_posts args
		),
	) );

    // $cmb_demo->add_field( array(
	// 	'name'    => __( 'Attached Users', 'yourtextdomain' ),
	// 	'desc'    => __( 'Drag users from the left column to the right column to attach them to this page.<br />You may rearrange the order of the users in the right column by dragging and dropping.', 'yourtextdomain' ),
	// 	'id'      => 'attached_cmb2_attached_users',
	// 	'type'    => 'custom_attached_posts',
	// 	'column'  => true, // Output in the admin post-listing as a custom column. https://github.com/CMB2/CMB2/wiki/Field-Parameters#column
	// 	'options' => array(
	// 		'show_thumbnails' => true, // Show thumbnails on the left
	// 		'filter_boxes'    => true, // Show a text box for filtering the results
	// 		'query_users'     => true, // Do users instead of posts/custom-post-types.
	// 	),
	// ) );

}
