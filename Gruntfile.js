module.exports = function(grunt) {
    grunt.initConfig({
        syndicate : {
            "data" : 3
        }
    });

    grunt.registerTask('syndicate', function(){
        console.log('syndicating this shit');
        console.dir(this.options);
    });

    grunt.registerTask('default', 'syndicate');

};