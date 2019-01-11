module.exports = function(grunt) {
    grunt.task.registerTask('log-pkg-version', 'Logs the pkg version', function() {
        var pkg = grunt.config.get('pkg');
        grunt.log.writeln('Building ' + pkg.version);
    });
};