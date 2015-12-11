/**
 * process tieba's proto files, exports a map of command number to command info;
 */

var fs = require('fs');
var glob = require('glob');

var cmdData = {};

var protoFilePaths = glob.sync('./proto/**/*.proto');
var basePath = './proto'

protoFilePaths.forEach(function (path) {
    var content = fs.readFileSync(path).toString();
    var cmdNo = content.match(/cmd\s*:(\d+)\n*/);
    cmdNo = cmdNo && cmdNo[1];
    if (cmdNo) {
        var url = content.match(/url\s*:(.+)\n*/);
        url = url && url[1];
        var packagePath = content.match(/package\s*(.+);\n*/)[1];
        var packageInfo = packagePath.split('.');
        var packageName = packageInfo[1];
        var parentName = packageInfo[0];
        var isRes = !!path.match(/Res\.proto/);
        if (!cmdData[cmdNo]) {
            cmdData[cmdNo] = {
                url: url,
                path: packagePath,
                name: packageName
            };
        }
        if (isRes) {
            cmdData[cmdNo].resPath = path.replace('./proto/', '');
            cmdData[cmdNo].resMessageName = packagePath + '.' + packageName + 'ResIdl';
        } else {
            cmdData[cmdNo].reqPath = path.replace('./proto/', '');
            cmdData[cmdNo].reqMessageName = packagePath + '.' + packageName + 'ReqIdl';
        }
    }
});

exports.cmdData = cmdData;
