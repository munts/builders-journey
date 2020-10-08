<?php
/**
 * CMB2 Theme Options
 * @version 0.1.0
 */
class one_Admin {

    /**
     * Option key, and option page slug
     * @var string
     */
    private $key = 'pks_options';

    /**
     * Options page metabox id
     * @var string
     */
    private $metabox_id = 'pks_option_metabox';

    /**
     * Options Page title
     * @var string
     */
    protected $title = '';

    /**
     * Options Page hook
     * @var string
     */
    protected $options_page = '';

    /**
     * Holds an instance of the object
     *
     * @var Myprefix_Admin
     **/
    private static $instance = null;

    /**
     * Constructor
     * @since 0.1.0
     */
    private function __construct() {
        // Set our title
        $this->title = __( 'Site Options', 'pks' );
    }

    /**
     * Returns the running object
     *
     * @return Myprefix_Admin
     **/
    public static function get_instance() {
        if( is_null( self::$instance ) ) {
            self::$instance = new one_Admin();
            self::$instance->hooks();
        }
        return self::$instance;
    }

    /**
     * Initiate our hooks
     * @since 0.1.0
     */
    public function hooks() {
        add_action( 'admin_init', array( $this, 'init' ) );
        add_action( 'admin_menu', array( $this, 'add_options_page' ) );
        add_action( 'cmb2_admin_init', array( $this, 'add_options_page_metabox' ) );
    }


    /**
     * Register our setting to WP
     * @since  0.1.0
     */
    public function init() {
        register_setting( $this->key, $this->key );
    }

    /**
     * Add menu options page
     * @since 0.1.0
     */
    public function add_options_page() {
        $this->options_page = add_menu_page( $this->title, $this->title, 'manage_options', $this->key, array( $this, 'admin_page_display' ) );

        // Include CMB CSS in the head to avoid FOUC
        add_action( "admin_print_styles-{$this->options_page}", array( 'CMB2_hookup', 'enqueue_cmb_css' ) );
    }

    /**
     * Admin page markup. Mostly handled by CMB2
     * @since  0.1.0
     */
    public function admin_page_display() {
        ?>
        <div class="wrap cmb2-options-page <?php echo $this->key; ?>">
            <h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
            <?php cmb2_metabox_form( $this->metabox_id, $this->key ); ?>
        </div>
        <?php
    }

    /**
     * Add the options metabox to the array of metaboxes
     * @since  0.1.0
     */
    function add_options_page_metabox() {

        // hook in our save notices
        add_action( "cmb2_save_options-page_fields_{$this->metabox_id}", array( $this, 'settings_notices' ), 10, 2 );

        $cmb = new_cmb2_box( array(
            'id'         => $this->metabox_id,
            'hookup'     => false,
            'cmb_styles' => false,
            'show_on'    => array(
                // These are important, don't remove
                'key'   => 'options-page',
                'value' => array( $this->key, )
            ),
        ) );

        // Set our CMB2 fields

        $cmb->add_field( array(
            'name' => __( 'Phone Number:', 'one' ),
            'desc' => __( 'This is the number that will get used/displayed in the footer. NOTE: if you enter it like, 867-5309, that is how it will get displayed.', 'one' ),
            'id'   => 'phone_text',
            'type' => 'text',
            'after' => 'examples: (970)-376-####, 970-376-####, 970.376.####,',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Address Line 1:', 'one' ),
            'desc' => __( 'PO Box or physical address (Physical address is better for SEO)', 'one' ),
            'id'   => 'address_line1',
            'type' => 'text',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Address Line 2:', 'one' ),
            'desc' => __( 'City, State, and zip code', 'one' ),
            'id'   => 'address_line2',
            'type' => 'text',
        ) );

        $cmb->add_field( array(
            'name'    => 'Email Address',
            'desc'    => 'This is the email address that you want to display in the footer',
            'id'   => 'foot_email',
            'type' => 'text_email',
        ) );

        // file uploader for the header logo
        $cmb->add_field( array(
            'name'    => 'Site Header Logo',
            'desc'    => 'Upload an image or enter an URL.',
            'id'      => 'logo',
            'type'    => 'file',
            // Optionally hide the text input for the url:
            'options' => array(
                'url' => false,
            ),
        ) );

        // file uploader for the right Title Block logo
        $cmb->add_field( array(
            'name'    => 'Right Title Block Logo',
            'desc'    => 'Upload an image or enter an URL.',
            'id'      => 'title-Block-logo',
            'type'    => 'file',
            // Optionally hide the text input for the url:
            'options' => array(
                'url' => false,
            ),
        ) );

        // file uploader for the footer logo if different from the header logo
        $cmb->add_field( array(
            'name'    => 'Footer Logo',
            'desc'    => 'Upload an image or enter an URL.',
            'id'      => 'logo2',
            'type'    => 'file',
            // Optionally hide the text input for the url:
            'options' => array(
                'url' => false,
            ),
        ) );
        // End Footer Info

        //Start Title Block info (Consulting, Project Management, Customer Builder...

        $cmb->add_field( array(
            'name' => __( 'Title Block One', 'one' ),
            'desc' => __( 'Ex: Project Management or something, but remember it needs to one-two words.', 'one' ),
            'id'   => 'one_titleblock_one',
            'type' => 'text',
            'before_row' => '<p style="padding-bottom:15px;font-weight:bold;font-size:1.25em;">These are the three subjects or areas of expertise that you want to promote in the left Title Block</p>'
        ) );

        $cmb->add_field( array(
            'name' => __( 'Title Block Two', 'one' ),
            'desc' => __( 'Ex: Consulting', 'one' ),
            'id'   => 'one_titleblock_two',
            'type' => 'text',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Title Block Three', 'one' ),
            'desc' => __( 'Ex: Custom Builder, General Contractor...', 'one' ),
            'id'   => 'one_titleblock_three',
            'type' => 'text',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Middle Title Block Top Title', 'one' ),
            'desc' => __( 'Ex: Built On...', 'one' ),
            'id'   => 'one_middleTitleblock_top',
            'type' => 'text',
            'before_row' => '<p style="padding-bottom:15px;font-weight:bold;font-size:1.25em;">These are the two titles in the Middle Title Block container.  Ie. Built On and Since 1994</p>'
        ) );
        $cmb->add_field( array(
            'name' => __( 'Middle Title Block Top Title', 'one' ),
            'desc' => __( 'Ex: Since 1994', 'one' ),
            'id'   => 'one_middleTitleblock_bottom',
            'type' => 'text',
        ) );

        //Social Media Urls - These aren't currently in use.

        $cmb->add_field( array(
            'name' => __( 'Facebook URL', 'one' ),
            'desc' => __( 'Facebook Page url', 'one' ),
            'id'   => 'one_facebook_url',
            'type' => 'text_url',
            'before_row' => '<p style="padding-bottom:15px;font-weight:bold;font-size:1.25em;">Add Social Media Urls if you have them.  If not, leave them blank.  I check to see if a value is entered and only diplay them if found.</p>'
        ) );

        $cmb->add_field( array(
            'name' => __( 'LinkedIn URL', 'one' ),
            'desc' => __( 'LinkedIn Page url', 'one' ),
            'id'   => 'one_LinkedIn_url',
            'type' => 'text_url',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Twitter URL', 'one' ),
            'desc' => __( 'Add Twitter url', 'one' ),
            'id'   => 'one_twitter_url',
            'type' => 'text_url',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Pinterest URL', 'one' ),
            'desc' => __( 'Add Pinterest url', 'one' ),
            'id'   => 'one_pin_url',
            'type' => 'text_url',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Instagram URL', 'one' ),
            'desc' => __( 'Add Instagram url', 'one' ),
            'id'   => 'one_instagram_url',
            'type' => 'text_url',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Google Plus URL', 'one' ),
            'desc' => __( 'Add G Plus url', 'one' ),
            'id'   => 'one_gplus_url',
            'type' => 'text_url',
        ) );

        $cmb->add_field( array(
            'name' => __( '"Wildcard" Social Media URL', 'one' ),
            'desc' => __( 'This is a spare field for a url such as LinkedIn or Houzz...', 'one' ),
            'id'   => 'one_wildcard_url',
            'type' => 'text_url',
        ) );

        $cmb->add_field( array(
            'name' => __( '"Wildcard" Social Media Icon', 'one' ),
            'desc' => __( 'This needs to be a Font Awesome Icon', 'one' ),
            'id'   => 'one_wildcard_icon',
            'type' => 'text',
            'after_row' => '<p style="padding-bottom:15px;">If you can find your icon at <a href="http://fontawesome.io/icons/" target="_blank">http://fontawesome.io/icons/</a> then copy the icon code here.  The icon code will look like: fa fa-bandcamp</p>'
        ) );

       /* $cmb->add_field( array(
            'name' => __( 'Font Source URL for the Welcome Quote/Intro Message', 'one' ),
            'desc' => __( 'This should be a url from Google Fonts, Font Squirrel...', 'one' ),
            'id'   => 'one_quote_font_url',
            'type' => 'text_url',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Font Name', 'one' ),
            'desc' => __( 'Must be spelled correctly', 'one' ),
            'id'   => 'one_font_name',
            'type' => 'text',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Font Weight', 'one' ),
            'desc' => __( 'Just one weight, but should be a number such as 300, 400, 500, 600 - 900', 'one' ),
            'id'   => 'one_font_weight',
            'type' => 'text',
        ) );*/





        $cmb->add_field( array(
            'name'    => 'Header Background Color Picker',
            'id'      => 'header_bg_color',
            'type'    => 'colorpicker',
            'default' => '#d7d5d5',
            'before_row' => '<p style="padding-top:15px;font-weight:bold;font-size:1.25em;">This color picker allows you to change the background color in the header (behind the logo)</p>',
            'after'  => 'This is currently set to #d7d5d5 (default).  This changes the background color behind the header logo.',
            'after_row'  => '<p>Quoting Ben Parker, aka. Uncle Ben from Spider-Man, "with great power comes great responsibility".  The purpose of adding this quote, is to remind you the user, 
                            that although you have been given the power to change all sorts of things in this theme, just remember, that you can also make a mess, so proceed with caution.</p>
                            <p>Enjoy this theme. - ST</p>',
        ) );

        $cmb->add_field( array(
            'name' => __( 'Font Picker', 'one' ),
            'desc' => __( 'Select the font and styles you want to use here.', 'one' ),
            'id'   => 'typography',
            'type' => 'typography',
            'fields' => array (
                    'font-family' => true,
                    'font-size' => true,
                    'font-weight' => true,
                    'color' => true,
                    'background' => true,
                    'text-align' => true,
                    'text-transform' => true,
                    'line-height' => true,
            )
        ) );

        $cmb->add_field( array(
            'name'             => esc_html__( 'Font Style', 'cmb2' ),
            'desc'             => esc_html__( 'Bold, Italic, Normal', 'cmb2' ),
            'id'               => 'font-style',
            'type'             => 'select',
            'show_option_none' => true,
            'options'          => array(
                'normal' => esc_html__( 'Normal', 'cmb2' ),
                'bold'   => esc_html__( 'Bold', 'cmb2' ),
                'italic'     => esc_html__( 'Italics', 'cmb2' ),
            ),
        ) );

        //These footer widgets are no longer being used.  Keeping them here in case we go back to them.
        /*$cmb->add_field( array(
            'name'    => __( 'Left Footer WYSIWYG', 'cmb2' ),
            'desc'    => __( 'This is content that goes in left footer', 'cmb2' ),
            'id'      => 'leftFoot',
            'type'    => 'wysiwyg',
            'options' => array( 'textarea_rows' => 5, ),
        ) );

        $cmb->add_field( array(
            'name'    => __( 'Right Footer WYSIWYG', 'cmb2' ),
            'desc'    => __( 'This is content that goes in footer', 'cmb2' ),
            'id'      => 'rightFoot',
            'type'    => 'wysiwyg',
            'options' => array( 'textarea_rows' => 5, ),
        ) );*/

    }

    /**
     * Register settings notices for display
     *
     * @since  0.1.0
     * @param  int   $object_id Option key
     * @param  array $updated   Array of updated fields
     * @return void
     */
    public function settings_notices( $object_id, $updated ) {
        if ( $object_id !== $this->key || empty( $updated ) ) {
            return;
        }

        add_settings_error( $this->key . '-notices', '', __( 'Settings updated.', 'one' ), 'updated' );
        settings_errors( $this->key . '-notices' );
    }

    /**
     * Public getter method for retrieving protected/private variables
     * @since  0.1.0
     * @param  string  $field Field to retrieve
     * @return mixed          Field value or exception is thrown
     */
    public function __get( $field ) {
        // Allowed fields to retrieve
        if ( in_array( $field, array( 'key', 'metabox_id', 'title', 'options_page' ), true ) ) {
            return $this->{$field};
        }

        throw new Exception( 'Invalid property: ' . $field );
    }

}

/**
 * Helper function to get/return the Myprefix_Admin object
 * @since  0.1.0
 * @return Myprefix_Admin object
 */
function one_admin() {
    return one_Admin::get_instance();
}

/**
 * Wrapper function around cmb2_get_option
 * @since  0.1.0
 * @param  string  $key Options array key
 * @return mixed        Option value
 */
function one_get_option( $key = '' ) {
    return cmb2_get_option( one_admin()->key, $key );
}

// Get it started
one_admin();