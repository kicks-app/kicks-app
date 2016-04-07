module.exports = function(grunt) {
 
  var pkg = grunt.file.readJSON('package.json');
  var environment = grunt.option("environment")  || 'development';
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-shell');
  
  grunt.loadNpmTasks('grunt-bowerrc');
  grunt.loadNpmTasks('grunt-mincerrc');
  
  grunt.initConfig({
    phpbin: "/Applications/MAMP/bin/php/php5.6.2/bin/php",
    dist: grunt.option('output') || 'dist',
    pkg: pkg,
    clean: {
      'dist': "<%= dist %>",
      'tmp': ['tmp'],
      'assets': "<%= dist %>/wp-content/themes/**/_assets"
    },
    sync: {
      'dist': {
        dot: true,
        expand: true,
        cwd: '.',
        src: ['app/**/*', 'wp/**/*', 'vendor/**/*', 'index.php', 'wp-config.php', '.htaccess'], 
        dest: grunt.option('output') || "<%= dist %>"
      },
      'wordpress': {
        dot: true,
        expand: true, 
        cwd: 'vendor/lib/wordpress',
        src: ['**/*', '!wp-content'], 
        dest: grunt.option('output') || "<%= dist %>"
      },
      'app': {
        dot: true,
        expand: true, 
        cwd: 'app',
        src: ['**/*'], 
        dest: grunt.option('output') && (grunt.option('output') + "/wp-content") || "<%= dist %>/wp-content"
      },
      'themes': {
        dot: true,
        expand: true, 
        cwd: 'app/themes',
        src: ['**/*'], 
        dest: grunt.option('output') && (grunt.option('output') + "/wp-content/themes") || "<%= dist %>/wp-content/themes"
      },
      'languages': {
        dot: true,
        expand: true, 
        cwd: 'app/languages',
        src: ['**/*'], 
        dest: grunt.option('output') && (grunt.option('output') + "/wp-content/languages") || "<%= dist %>/wp-content/languages"
      },
      'plugins': {
        dot: true,
        expand: true, 
        cwd: 'app/plugins',
        src: ['**/*'], 
        dest: grunt.option('output') && (grunt.option('output') + "/wp-content/plugins") || "<%= dist %>/wp-content/plugins"
      },
      'mu-plugins': {
        dot: true,
        expand: true, 
        cwd: 'app/mu-plugins',
        src: ['**/*'], 
        dest: grunt.option('output') && (grunt.option('output') + "/wp-content/mu-plugins") || "<%= dist %>/wp-content/mu-plugins"
      },
      'vendor': {
        dot: true,
        expand: true, 
        cwd: 'vendor',
        src: ['**/*', '!**/.git', '!**/.svn'], 
        dest: grunt.option('output') && (grunt.option('output') + "/vendor") || "<%= dist %>/vendor"
      },
      'files': {
        dot: true,
        expand: true, 
        cwd: '.',
        src: ['index.php'], 
        dest: grunt.option('output') || "<%= dist %>"
      }
    },
    shell: {
      options: {
          stderr: false
      },
      composer_get: {
        command: 'curl -sS https://getcomposer.org/installer | php'
      },
      composer_install: {
        command: 'php composer.phar install'
      },
      composer_update: {
        command: 'php composer.phar update'
      }
    },
    curl: {
      'composer': {
        src: 'https://getcomposer.org/installer',
        dest: 'composer.phar'
      }
    },
    template: {
      'dist': {
        options: {
          data: function() {
            return {
              pkg: pkg,
              environment: environment,
              salt: grunt.file.readYAML('config/salt.yml')[environment],
              database: grunt.file.readYAML('config/database.yml')[environment]  
            };
          }
        },
        src: 'config/wp-config.php',
        dest: ( grunt.option('output') || "<%= dist %>" ) + "/wp-config.php"
      }
    },
    php: {
      serve: {
        options: {
          bin: "<%= phpbin %>",
          base: 'dist',
          keepalive: false,
          open: true,
          //port: 5053
        }
      }
    },
    watch: {
      files: ['app/**/*', '!app/**/_assets/**/*'],
      tasks: ['clean:assets', 'themes:build', 'sync:app']
    },
    'mincerrc': {
      themes: {
        options: {
          clean: true,
          sourceMaps: false,
          enable: [
            //'autoprefixer'
          ],
          jsCompressor: grunt.option('environment') === 'production' ? 'uglify' : '',
          //cssCompressor: grunt.option('environment') === 'production' ? 'csswring' : ''
        },
        cwd: 'app/themes',
        src: ['**/.mincerrc']
      }
    },
    'bowerrc': {
      themes: {
        cwd: 'app/themes',
        src: ['**/.bowerrc']
      }
    }
  });
  
  grunt.registerTask('composer', 'Basic composer integration', function() {
    switch (this.args[0]) {
      case 'get':
        grunt.task.run('shell:composer_get');
        break;
      case 'install':
        grunt.task.run('shell:composer_install');
        break;
      case 'update':
        grunt.task.run('shell:composer_update');
        break;
      default:
        grunt.task.run('curl:composer', 'shell:composer_install');
    }
    
  });
  
  grunt.registerTask('themes', 'Theme builder', function() {
    switch (this.args[0]) {
      case 'install':
        grunt.task.run('bowerrc:themes');
        break;
      case 'build':
        grunt.task.run('mincerrc');
        break;
      default:
        grunt.task.run('install', 'build');
    }
  });
  
  grunt.registerTask('install', [
    'composer:get',
    'composer:install',
    'themes:install'
  ]);
  
  grunt.registerTask('build', [
    'themes:build',
    'clean:assets',
    'sync:wordpress',
    'sync:app',
    'template:dist'
  ]);
  
  grunt.registerTask('serve', ['build', 'php:serve', 'watch']);
  
  
};