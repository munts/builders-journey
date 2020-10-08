<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 */
get_header();
?>

    <section id="art" class="section_1">
        <div class="services_div">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h1>Art</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="science" class="section_2" >
        <div class="science_div">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h1>Science</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="creative" class="section_3">
        <div class="screative_div">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h1>Creative</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="team" class="section_4">
        <div class="team_div">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h1>Team</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section id="solutions" class="section_5">
        <div class="solutions_div">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h1>Solutions</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="section_6">
        <div class="services_div">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <h1>Contact</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <div class="homepage_nav_title section" id="contact2">
        <div class="container_24">
            <div class="index_titles blog single"><?php if ( function_exists( 'onepage_breadcrumbs' ) ) onepage_breadcrumbs(); ?></div>
        </div>
    </div>
    <div class="clear"></div>


    <!-- blog title ends -->

    <div class="blog_pages_wrapper default_bg">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <!--post start-->
                    <!--Start Post-->
                    <?php get_template_part( 'loop' ); ?>
                    <div class="clear"></div>
                    <?php one_pagination(); ?>
                    <!--End Post-->
                </div>
            </div>
        </div>
        <!--Sidebar-->
        <div class="col-md-4">
            <!--Start Sidebar-->
            <?php //get_sidebar(); ?>
            <!--End Sidebar-->
        </div>
        <div class="clear"></div>
    </div>
    <div class="clear"></div>



<?php get_footer(); ?>