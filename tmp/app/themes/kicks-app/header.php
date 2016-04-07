<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'twentyfifteen' ); ?></a>
	
	
  <header id="masthead" class="site-header navbar navbar-fixed-top navbar-dark bg-inverse">
    <div class="container">
      <!-- Toggle Button -->
      <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#nav-content">
      ☰
      </button> <a class="navbar-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
        
      <!-- Nav Content -->
      <div class="collapse navbar-toggleable-xs" id="nav-content">
        <?php
            // Primary navigation menu.
            wp_nav_menu( array(
              'menu'              => 'primary',
              'theme_location'    => 'primary'
            ));
          ?>
     
        </div>
     </div>
   </header>
		
  <?php if (is_front_page()): ?>
    <div class="container">
      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron">
        <h1 class="display-3"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
        <?php
          $description = get_bloginfo( 'description', 'display' );
          if ( $description || is_customize_preview() ) : ?>
            <p class="site-description"><?php echo $description; ?></p>
          <?php endif;
        ?>
      </div>
  </div>
  <?php endif; ?>
  
  
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <!-- sidebar -->
        <div id="sidebar" class="sidebar">
          <?php get_sidebar(); ?>
        </div><!-- .sidebar -->
      </div>
      <div class="col-md-9">
        <!-- site-content -->
        <div id="content" class="site-content">
        
        
  

	
	  
