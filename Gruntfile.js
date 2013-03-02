module.exports = function(grunt) {
    grunt.initConfig({
        syndicate : {
            "modelsFolder" : "public/models",
            "collectionsFolder" : "public/collections"
        }
    });

    grunt.registerTask('syndicate', function(a){



        console.log(arguments);

        console.dir(grunt.config);

        var modelsFolder = grunt.config('syndicate.modelsFolder');
        var collectionsFolders = grunt.config('syndicate.collectionsFolder');



        console.dir(this.files);

        // first read collections
        var file = grunt.file.read("public/models/TodoModel.js");

        var url = file.match(/url\s*\:\s*[\',\"](.*)[\',\"]\s*,/)[1] || "";

        console.log("url is :", url);

    });

    grunt.registerTask('default', 'syndicate');

};