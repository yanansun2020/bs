const process = require('process');
let http = require('http');
const request = require('request');
let S = require('string')
let urlPrefix = "http://localhost:9000/";

export function cli(args) {
    let command = process.argv[2].slice(2);
    if (command === "targets") {
        processTargets(command, process.argv);
    } else if (command === "executions") {
        processExecute(command, process.argv)
    } else if (command === "results") {
        processResult(command, process.argv);
    }
}

function processTargets(command, args) {
    let id = processAsJson(args).id;
    let parameter = combineParameter(args);
    sendGetToServer(command, id == null ? '' : id, parameter)
}


function processResult(command, args) {
    let id = processAsJson(args).id;
    let parameter = combineParameter(args);
    sendGetToServer(command, id == null ? '' : id, parameter)
}


function processExecute(command, args) {
    let arg = processAsJson(args);
    if (isExecuteScript(args)) {
        let body = JSON.parse(arg.payload);
        encodeBody(body);
        sendPostToServer(command, body);
    } else {
        console.log("arg is " + JSON.stringify(arg))
        let id = arg.id == null ? '' : arg.id;
        let parameter = combineParameter(args);
        sendGetToServer(command, id, parameter);
    }
}

function encodeBody(body){
    let script = body.payload.script;
    let buff = Buffer.from(script);
    let base64script = buff.toString('base64');
    body.payload.script = base64script;
}

function combineParameter(processArgs) {
    let parameter = "";
    for (let j = 3; j < processArgs.length; j++) {
        if(!processArgs[j].startsWith("id=")){
            parameter += processArgs[j] + "&";
        }
    }
    return parameter;
}

function isExecuteScript() {
    let isExecute = false;
    process.argv.forEach((processArgs, index) => {
        if (`${processArgs}`.startsWith('payload')) {
            isExecute = true;
        }
    });
    return isExecute;
}

function processAsJson(processArgs) {
    let result = {};
    for (let j = 3; j < processArgs.length; j++) {
        let pair = processArgs[j];
        let index = pair.indexOf('=');
        let key = pair.slice(0, index);
        let value = pair.slice(index + 1);
        result[key] = decodeURIComponent(value || '');
    }
    return result;
}

function sendGetToServer(requestName, id, parameter) {
    let url = urlPrefix + requestName + "/" + id + "?" + parameter;
    console.log("start to get url is " + url);
    http.get(url, function (req, res) {
        let result = '';
        req.on('data', function (data) {
            result += data;
        });
        req.on('end', function () {
            console.log(result);
        });
    });
}

function sendPostToServer(requestName, parameter) {
    let url = urlPrefix + requestName;
    request.post(url, {
        json: parameter
    }, (error, res, body) => {
        if (error) {
            console.error(error)
            return
        }
        console.log(`statusCode: ${res.statusCode}`)
    })
}