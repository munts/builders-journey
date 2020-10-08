<!-- Footer -->
<?php

if (function_exists('one_get_option')) {
    //Footer Info
    $footerPhone = one_get_option('phone_text');
    $footerEmail = one_get_option('foot_email');
    $footer_logo = one_get_option('logo2');
    $address_line1 = one_get_option('address_line1');
    $address_line2 = one_get_option('address_line2');
}

?>
<section id="footer" style="width:100%;padding:30px 0;margin:0 auto;background-color:#222222;color:#ccc;">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-4">
                <?php if ( is_active_sidebar( 'left-footer-side-bar' ) ) : ?>
                    <?php dynamic_sidebar( 'left-footer-side-bar' ); ?>
                <?php endif; ?>
            </div>
            <div class="col-xs-12 col-sm-4">
                <?php if ( is_active_sidebar( 'middle-footer-side-bar' ) ) : ?>
                    <?php dynamic_sidebar( 'middle-footer-side-bar' ); ?>
                <?php endif; ?></div>
            <div class="col-xs-12 col-sm-4">
                <?php if ( is_active_sidebar( 'right-footer-side-bar' ) ) : ?>
                    <?php dynamic_sidebar( 'right-footer-side-bar' ); ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>

<?php wp_footer(); ?>
</body>
</html>