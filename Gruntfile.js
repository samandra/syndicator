module.exports = function(grunt) {
    grunt.initConfig({
        syndicate : {
            "models" : ["public/models/*"],
            "collections" : ["public/collections/*"],
            'dest' : "dist",
            'port' : 9080,
            'name' : 'SyndicateTestApp',
            'version': '0.0.1',

            //mongoDB configuration
            'dbname': 'kiks',
            'dbport': 10081,
            'dbhost': "dharma.mongohq.com",
            'dbuser': 'admin',
            'dbpassword': 'pass'

        }
    });

    grunt.registerTask('syndicate', function(a){

        var conf = function(c){
            return grunt.config("syndicate." + c);
        }


        var Handlebars = require('Handlebars');
        var FILE_ENCODING = 'utf-8';
        var DESTINATION = conf('dest') || 'dist';


        /* create folder if not exists */
        if(!grunt.file.isDir(DESTINATION)){
            grunt.file.mkdir(DESTINATION);
        }
        /* create punlic and server folders under dist */
        grunt.file.mkdir(DESTINATION+"/public");
        grunt.file.mkdir(DESTINATION+"/server");
        grunt.file.mkdir(DESTINATION+"/server/controllers");

        var modelFiles = grunt.file.expand(conf('models'));
        var collectionFiles = grunt.file.expand(conf("collections"));

        var models = [], collections = [];

        console.log("model fies", modelFiles);
        grunt.util._.each(modelFiles,function(modelFile){

            file = grunt.file.read(modelFile);
            console.log('file is :', modelFile);
            try{
                var url = file.match(/url\w*\s*:\s*[\'\"](.*)[\'\"]/)[1] || "";
                console.log("genareted url name: ", url);
            } catch(e){
                console.log("error could not read url from model file");
            }
            //console.log(file.match(/url\s*\:\s*[\',\"](.*)\/?[\',\"]\s*,/), file);
            try {
                var modelName = file.match(/var\s*(\S*)\s*=/)[1] || false;
                console.log("generated model name", modelName);
            } catch(e){
                console.log("error could not read model name from model file");
            }

            // remove extra / in url
            if(url[url.length-1] == "/"){
                url = url.substr(0,url.length-1);
            }

            if (modelName!==false){
                models.push({
                    name: modelName,
                    url: url
                });
            }

            var controllerTemplate = grunt.file.read("templates/modelControllerTemplate.tmpl");
            var controllerResult = Handlebars.compile(controllerTemplate)({
                name: modelName,
                url: url
            });
            grunt.file.write(
                DESTINATION + "/server/controllers/" + modelName + "Controller.js",
                controllerResult,
                {encoding: FILE_ENCODING}
            );
        });

        /* generate app.js file */
        var appJSTemplate = grunt.file.read("templates/appJSTemplate.tmpl", {encoding: FILE_ENCODING});
        var port = conf("port") || 8080;

        var appJSData = {
            port: port,
            models: models,
            dbname: conf("dbname"),
            dbhost: conf("dbhost"),
            dbport: conf("dbport"),
            dbuser: conf("dbuser"),
            dbpassword: conf("dbpassword")
        };
        var appJSResult = Handlebars.compile(appJSTemplate)(appJSData);
        grunt.file.write(DESTINATION+"/app.js", appJSResult, {encoding: FILE_ENCODING});
        console.log("app.js file generated");
        /* app.js file generated */

        /* generate package.json file */
        var packageJsonTemplate = grunt.file.read("templates/packageJsonTemplate.tmpl", {encoding: FILE_ENCODING});
        var name = conf('name') || 'Syndicator Generated App';
        var version = conf('version') || '0.1.0';
        var packageJsonData = {name: name, version: version};
        var packageJsonResult = Handlebars.compile(packageJsonTemplate)(packageJsonData);

        grunt.file.write(DESTINATION+"/package.json", packageJsonResult, {encoding: FILE_ENCODING});
        console.log("package.json file generated");

        var sys = require('sys');
        var exec = require('child_process').exec;
        function puts(error, stdout, stderr) { sys.puts(stdout); }
        exec("cd "+DESTINATION+";npm install", puts);

        /* package.json file generated */




    });

    grunt.registerTask('default', 'syndicate');

};