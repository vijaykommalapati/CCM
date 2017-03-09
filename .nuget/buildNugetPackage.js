var fs = require('fs');
var exec = require('child_process').exec;
var packageJson = require('../package.json');
var async = require('async');

var name = packageJson.name;
var version = packageJson.version;
if(process.env.BUILD_NUMBER != null) {
  version = version + '.' + process.env.BUILD_NUMBER;
}
var description = packageJson.description;
var author = packageJson.author;

var template = fs.readFileSync('.nuget/navigate-ui.nuspec.template', 'UTF-8');

var nuspec = template.replace("#VERSION#", version)
                     .replace("#ID#", name)
                     .replace("#DESCRIPTION#", description)
                     .replace("#AUTHORS#", author);

fs.writeFileSync('navigate-ui.nuspec', nuspec);

var child = exec('.nuget\\nuget.exe pack -OutputDirectory packages -NoDefaultExcludes', function(error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  if(stderr !== null) {
    console.log('stderr: ' + stderr);
  }
  if(error !== null) {
    console.log('exec error: ' + error);
  }
});
