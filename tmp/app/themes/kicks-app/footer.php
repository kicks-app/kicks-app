<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "site-content" div and all content after.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?>
        </div><!-- .site-content -->
      </div><!-- .col-* -->
    </div><!-- .row -->
  </div><!-- .container -->
</div><!-- .site -->

<footer id="colophon" class="site-footer navbar navbar-dark bg-inverse" role="contentinfo">
  <div class="container">
    <ul class="nav navbar-nav">
      <li class="nav-item"><a class="nav-link" href="<?php echo esc_url( __( 'https://wordpress.org/', 'twentyfifteen' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'twentyfifteen' ), 'WordPress' ); ?></a></li>
    </ul>
  </div><!-- .container -->
</footer><!-- .site-footer -->



<?php wp_footer(); ?>

</body>
</html>
