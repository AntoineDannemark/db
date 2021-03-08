  // https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
// Careful, you need the absolut path to get the file stat. require('path').resolve(__dirname, file)
const os = require("os");
const fs = require('fs');
const { parse } = require('comment-parser/lib');
const JSFILE = './../handler.js';
const APIFILE = './index.ts';
const EOL = os.EOL;
const AWS_URL = "https://9lrwatxyfl.execute-api.eu-west-2.amazonaws.com/dev";

files = fs.readdirSync('.', {withFileTypes: true});
let dirs = files.filter(f => f.isDirectory()).map(f => f.name);

let dataCode = "// -start - don't remove this comment used to generate api code";
let apiCode = "// -start - don't remove this comment used to generate api code";
let apiObject = {};

const replaceInFile = (file, code) => {
    fs.existsSync(file) && fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        let  result = data.replace(/\/\/ -start.+\/\/ .+ -end/gs, code);
    
        fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
};

dirs.filter(dirname => !dirname.includes('.')).forEach(dir => {
    if(!fs.existsSync(`./${dir}/actions`)) {
        return;
    }

    files = fs.readdirSync(`./${dir}/actions`);

    if(files.length) {
        apiObject[dir] = {};
    }

    files.filter(file => file[0] != file[0].toUpperCase() && file != 'index.ts').forEach(file => {
        console.log(dir, ':');
        console.log(file);

        let fileContent =  fs.readFileSync(`./${dir}/actions/${file}`, {encoding:'utf8', flag:'r'});
        const parsed = parse(fileContent);
        
        if(parsed.length) {
            let routeTag = parsed[0].tags.find(tag => tag.tag === 'name'), route = routeTag ? routeTag.name: null;
            let methodTag = parsed[0].tags.find(tag => tag.tag === 'method'), method = methodTag ? methodTag.name: null;
            
            if(route && method) {
                dataCode += `${EOL}app.${method.toLowerCase()}("/api/${route}", async (req, res) => {let result = await api.${dir}.${file.split(".")[0]}(req.body); res.send(result)});${EOL}`;

                apiObject[dir][file.split(".")[0]] = `async o => await fetch('${AWS_URL}/api/${route}', {method:'${method}', body: JSON.stringify(o)})`;
            };
        }
    });
});   

let apiObjectCode = JSON.stringify(apiObject, null, "\t").split('"').join('').substring(1).slice(0, -1).trim();

apiCode += apiObjectCode;

dataCode += `${EOL}// don't remove this comment used to generate api code -end`;
apiCode += `${EOL}// don't remove this comment used to generate api code -end`;

replaceInFile(APIFILE, apiCode);
replaceInFile(JSFILE, dataCode);


