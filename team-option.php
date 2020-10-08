<?php
if ($whatsInaNameOption === 'doc') { ?>
    <a href="<?= $whatsInaNamePDF; ?>" class="view-pdf"><img style="width:40%;margin:0 auto;" class="img-responsive" src="<?= $whatsInaNameImg; ?>"></a>
    <?php
} else { ?>
    <a href="#" data-toggle="modal" data-target="#textModal" class=""><img style="width:40%;margin:0 auto;" class="img-responsive" src="<?= $whatsInaNameImg; ?>"></a>
<?php } ?>


<section id="team" class="row" data-title="<?= $dataTitleTeam; ?>">
    <div class="col-xs-12 team_div" style="background-image: url('<?= $team_bg; ?>');">
        <div class="row">
            <div class="col-xs-10 col-xs-push-1">
                <div class="owl-carousel owl-theme">
                    <?php
                    $team2 = get_post_meta( $team_id, 'pks_team_group', true ); // this particular instance spits out 33 which is entered into a field in wp-admin
                    foreach( (array) $team2 as $team ){
                        // Default all variables in case they are not defined in the dataset.
                        $name = '';
                        $title = '';
                        $bio = '';
                        $img = '';
                        if ( isset( $team['name'] ) )
                            $name = esc_html( $team['name'] );
                        if ( isset( $team['title'] ) )
                            $title = esc_html( $team['title'] );
                        if ( isset( $team['bio'] ) )
                            $bio = esc_html( $team['bio'] );
                        if ( isset( $team['image_id'] ) ) {
                            $img = wp_get_attachment_image($team['image_id'], 'share-pick', null, array(
                                'class' => 'thumb  img-responsive grayscale',
                            ));
                        } ?>
                        <div class="team-member">
                            <div class="col-xs-12 col-sm-4 col-md-5 team-photo"><?= $img; ?></div>
                            <div class="col-xs-12 col-sm-8 col-md-7 details">
                                <h3><?= $name; ?></h3>
                                <h4><?= $title; ?></h4>
                                <p><?= $bio; ?></p>
                            </div>
                        </div>
                    <?php } // END foreach ?>
                </div>
            </div>
        </div>
    </div>
</section>
