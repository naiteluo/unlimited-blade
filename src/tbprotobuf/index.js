var ProtoBuf = require('protobufjs');
var cmdData = require('./cmd').cmdData;

function getPtrByNameFuzzy (ptr, name) {
    for (var key in ptr) {
        if (key.toLowerCase() === name.toLowerCase()) {
            console.log(key);
            return ptr[key];
        }
    }
    return null;
}

/**
 * build by fuzzy path
 * @param  {[type]} path path
 * @return {[type]}      [description]
 */
ProtoBuf.Builder.prototype.buildFuzzy = function (path) {
    this.reset();
    if (!this.resolved)
        this.resolveAll(),
        this.resolved = true,
        this.result = null; // Require re-build
    if (this.result === null) // (Re-)Build
        this.result = this.ns.build();
    if (!path)
        return this.result;
    var part = typeof path === 'string' ? path.split(".") : path,
        ptr = this.result; // Build namespace pointer (no hasChild etc.)
    for (var i=0; i<part.length; i++) {
        var tempPtr = getPtrByNameFuzzy(ptr, part[i]);
        if (tempPtr)
            ptr = tempPtr;
        else {
            ptr = null;
            break;
        }
    }
    return ptr;
};

function getMessage (type, cmdNo) {
    var isRes = (type === 'res');
    var cmdInfo = cmdData[cmdNo];
    console.log(cmdInfo);
    var builder = ProtoBuf.loadProtoFile({
        root: './proto',
        file: isRes ? cmdInfo.resPath : cmdInfo.reqPath
    });
    var MessageClass = builder.build(isRes ? cmdInfo.resMessageName : cmdInfo.reqMessageName);
    return MessageClass;
}

exports.decode = function(type, cmdNo, buf) {
    var MessageClass = getMessage(type, cmdNo);
    return MessageClass.decode(buf);
};
