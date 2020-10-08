<?php
/**
 * The Header for the ONE Confluence Theme blog page and post page
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 **/

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js" style="">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Plumb Kendall Solutions - Strategic Partnerships, Project Management, Custom Builder</title>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php wp_head();

    $site_logo='';
    $header_bg_color='';

    if (function_exists('one_get_option')) {
        $site_logo = one_get_option('logo');
        $header_bg_color = one_get_option('header_bg_color');
    }

    setup_google_fonts();

    $font = setup_google_fonts();

    if (!empty($font)){ ?>
        <link href="https://fonts.googleapis.com/css?family=<?= $font; ?>" rel="stylesheet">
    <?php }  ?>

</head>
<body id="page-top" data-spy="scroll" data-target=".navbar" data-offset="50" <?php body_class(); ?> >
<section id="purpose" data-title="REMODELING" style="background-color: <?= $header_bg_color; ?>">
    <div class="container purpose">
        <div class="row">
            <div class="col-xs-6 col-xs-push-3 col-sm-4 col-sm-push-4">
                <a href="/"><img src="<?= $site_logo; ?>" class="logo-responsive" /></a>
            </div>
        </div>

    </div>
</section>

<div id="header" class="header navbar-fixed-top2 unstuck" style="">
    <div class="header-container container">
        <!-- Navigation -->
        <nav id="pnav" class="navbar navbar-default navbar-left main-menu" role="navigation">
            <a id="home-link" class="hidden-xs" href="/"></a>
            <div id="menu-left" class="menu">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <?php
                        one_front_nav_two();
                    ?>
                </div><!-- /.navbar-collapse -->
            </div>
        </nav>
        <nav id="pnav-right" class="navbar navbar-default navbar-right main-menu">
            <div id="menu-right" class="menu2">
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                    <?php
                    echo one_right_nav();
                    ?>
                </div><!-- /.navbar-collapse -->
            </div>
        </nav>
    </div>
</div>
<!-- /Header Content -->
<script type="text/javascript">
    jQuery( document ).ready(function() {
        jQuery('.navbar-collapse a').click(function(){
            jQuery('.navbar-collapse').css('height', '0');
            jQuery('.navbar-collapse').removeClass('in');
        });
    });
</script>
