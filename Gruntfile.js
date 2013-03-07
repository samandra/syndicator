module.exports = function(grunt) {
    grunt.initConfig({
        syndicate : {
            "models" : ["public/models/*"],
            "collections" : ["public/collections/*"],
            'dest' : "dist",
            'port' : 9080,
            'name' : 'Syndicate Test App',
            'version': '1'
        }
    });

    grunt.registerTask('syndicate', function(a){

        var conf = function(c){
            return grunt.config("syndicate." + c);
        }

        var Handlebars = require('Handlebars');
        var FILE_ENCODING = 'utf-8';

        /* create folder if not exists */
        var dest = conf('dest') || 'dist';
        if(!grunt.file.isDir(dest)){
            grunt.file.mkdir(dest);
        }
        
        /* generate app.js file */
        var appJSTemplate = grunt.file.read("templates/appJSTemplate.tmpl", {encoding: FILE_ENCODING});
        var port = 8080;
        if(conf("port")) {
            port = conf("port");
        }
        var appJSData = {port: port};
        var appJSResult = Handlebars.compile(appJSTemplate)(appJSData);
        grunt.file.write(conf("dest")+"/app.js", appJSResult, {encoding: FILE_ENCODING});
        console.log("app.js file generated");
        /* app.js file generated */

        /* generate package.json file */
        var packageJsonTemplate = grunt.file.read("templates/packageJsonTemplate.tmpl", {encoding: FILE_ENCODING});
        var name = conf('name') || 'Syndicator Generated App';
        var version = conf('version') || '0.1.0';
        var packageJsonData = {name: name, version: version};
        var packageJsonResult = Handlebars.compile(packageJsonTemplate)(packageJsonData);
        grunt.file.write(conf("dest")+"/package.json", packageJsonResult, {encoding: FILE_ENCODING});    
        console.log("package.json file generated");        
        /* package.json file generated */

/*        var appJSData = {port:port};
        var appJSResult = Handlebars.compile(ft)
        var modelFiles = grunt.file.expand(conf('models'));
        var collectionFiles = grunt.file.expand(conf("collections"));

        grunt.util._.each(modelFiles,function(modelFile){

            file = grunt.file.read(modelFile);
            console.log('file is :', modelFile);
            var url = file.match(/url\s*\:\s*[\',\"](.*)[\',\"]\s*,/)[1] || "";
            console.log("url is :", url);
            // grunt.file.write(conf("dest"), url);
        });


        
        var ftt = Handlebars.compile(ft);
        var data = {name: "Ali", shit: "Cüneyt"};
        var result = ftt(data);

        grunt.file.write(conf("dest")+"/firstshit", result, {encoding: FILE_ENCODING});
        console.log("file:", result);*/
    });

    grunt.registerTask('default', 'syndicate');

};