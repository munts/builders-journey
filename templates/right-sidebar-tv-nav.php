<?php
/**
 * Created by PhpStorm.
 * User: circdominic
 * Date: 9/24/20
 * Time: 4:33 PM
 */
?>

<div class="sidebar-nav">Archived Episodes</div>
<div class="sidebar-nav"><a href="/trade-partner-tuesdays/">Monday Funday</a></div>
<div class="sidebar-nav"><a href="/wildcard-wednesdays/">TGIF TBJTV</a></div>
<div class="sidebar-nav">Blooper Reel (Un-Cut)</div>
<div class="card" style="width: 18rem;margin-top:30px;">
    <img class="card-img-top img-responsive" src="http://tbj.flywheelsites.com/wp-content/uploads/2020/09/PlumbKendall_PodcastArt-490x480px_April2019.jpg" alt="Podcast Logo">
    <div class="card-body">
        <h5 class="card-title">Subscribe!!!</h5>
        <p class="card-text">Don't Miss Out!  Get email notifications as new episodes are released.</p>
        <?php gravity_form( 2, false, false, false, '', false ); ?>
    </div>
</div>


