module.exports = function(grunt) {
    grunt.initConfig({
        syndicate : {
            "models" : ["public/models/*"],
            "collections" : ["public/collections/*"],
            'dest' : ["dest/"],

        }
    });

    grunt.registerTask('syndicate', function(a){

        var conf = function(c){
            return grunt.config("syndicate." + c);
        }

        var modelFiles = grunt.file.expand(conf('models'));
        var collectionFiles = grunt.file.expand(conf("collections"));

        grunt.util._.each(modelFiles,function(modelFile){
            file = grunt.file.read(modelFile);
            console.log('file is :', modelFile);
            var url = file.match(/url\s*\:\s*[\',\"](.*)[\',\"]\s*,/)[1] || "";
            console.log("url is :", url);
            grunt.file.write(conf("dest"), url);
        });


    });

    grunt.registerTask('default', 'syndicate');

};