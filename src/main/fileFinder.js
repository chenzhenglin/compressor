let fs = require('fs');
let join = require('path').join;
let {dateFormat} = require('../common/common');
let log = require('electron-log');
let {mainConsole} = require("../common/console");
/**
 *
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findFileSync(startPath, extensions, event) {
    let result = [];

    function finder(path) {
        let files = fs.readdirSync(path);
        //log.info(files);

        files.filter(f=>{
            let _flag = false;
            extensions.forEach(val=>{
                if(f.endsWith(val)) {
                    _flag = true;
                    return false;
                }
            });

            return _flag;
        });

        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) {
                finder(fPath);
            }
            if (stats.isFile()) {
                let reStr = extensions.join("|");
                let re = new RegExp(reStr + "$", "g");
                //TODO 必须存一个变量判断
                let flag = re.test(fPath);
                if (flag) {
                    result.push({
                        path: fPath,
                        name: val,
                        date: dateFormat(new Date(stats.mtimeMs + 8 * 60 * 60 * 1000), "yyyy-MM-dd hh:mm:ss"),
                        index: result.length,
                        status: "未压缩",
                        disabled: true
                    });
                }
            }
        });
    }

    finder(startPath);
    return result;
}

module.exports = {
    findFileSync: findFileSync
}
