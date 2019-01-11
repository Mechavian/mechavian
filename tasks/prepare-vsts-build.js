module.exports = function(grunt) {
    const vsoUpdateBuildNumber = '##vso[build.updatebuildnumber]';
    
    grunt.task.registerTask('prepare-vsts-build', 'Updates the VSTS Build number', function() {
        var pkg = grunt.config.get('pkg');
        grunt.log.writeln(vsoUpdateBuildNumber + pkg.version);

        grunt.config.set('config.buildType', 'official');
    });
};