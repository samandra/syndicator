module.exports = function(grunt) {
    grunt.initConfig({
        syndicate : {
            "data" : 3
        }
    });

    grunt.registerTask('syndicate', function(){
        console.log('syndicating this shit');
        console.dir(this.options());
        var file = grunt.file.read("public/models/TodoModel.js");
        console.log("file is :", file);


    });

    grunt.registerTask('default', 'syndicate');

};