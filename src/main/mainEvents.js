
let {ipcMain, dialog} = require("electron");
let {findFileSync} = require('./fileFinder');
let {convertToMin, convertToSrc} = require("./compressor");
let {mainConsole} = require("../common/console");
let i = 0;
function _compress(files, form, event) {
    convertToMin(files[i], form, status => {
        let replyData = {
            index: files[i].index,
            status: status, // 1：成功、0：失败
        };
        i++;
        event.sender.send("compassFileReply", replyData);

        if(i < files.length) {
            _compress(files, form, event);
        }
    });
}

function onEvents() {
    // 打开文件夹事件
    ipcMain.on("openFolder",(event, args)=>{
        dialog.showOpenDialog({
            properties:['openFolder', 'openDirectory'],
        }, (files) => {
            try {
                let dirObj = {status:0, folder: files[0], type: args};
                if (undefined !== typeof files) {
                    dirObj = {status:1, folder: files[0], type: args};
                }
                event.sender.send("openFolderReply", dirObj);
            } catch (e) {
                mainConsole(event,"openFolderError" , e);
            }
        });
    });

    // 获取文件列表事件
    ipcMain.on("getFiles",(event, args)=>{

        try {

            let files = findFileSync(args.selectDir, [args.select], event);
            event.sender.send("getFilesReply", files);

        }catch (e) {
            mainConsole(event,"getFilesError", "getFilesError");
        }
    });


    // 压缩文件
    ipcMain.on('compassFile', (event, arg) => {
        if (arg) {
            let files = arg.files;
            let form = arg.form;
            //_compress(files, form, event); // 同步策略
            files.forEach((item, index)=>{

                try {
                    convertToMin(item, form, status => {
                        let replyData = {
                            index: item.index,
                            status: status, // 1：成功、0：失败
                        };
                        event.sender.send("compassFileReply", replyData);
                    });

                }catch (e) {
                    let replyData = {
                        status: 0, // 1：成功、0：失败
                        msg: "文件非法"
                    };
                    event.sender.send("compassFileReply", replyData);
                    mainConsole(event,'compassFileError', e);
                }
            });
        } else {
            let replyData = {
                status: 0, // 1：成功、0：失败
                msg: "传入参数不对"
            };
            event.sender.send("compassFileReply", replyData);
        }
    });

    // 解压文件
    ipcMain.on('releaseFile', (event, arg) => {
        console.log(arg);

        if (arg) {
            let files = arg.files;
            let form = arg.form;
            files.forEach((item, index)=>{
                convertToSrc(item, form, status => {
                    console.log(status);
                    let replyData = {
                        index: item.index,
                        status: status, // 1：成功、0：失败
                    };
                    event.sender.send("releaseFileReply", replyData);
                });
            });
        } else {
            let replyData = {
                status: 0, // 1：成功、0：失败
                msg: "传入参数不对"
            };
            event.sender.send("releaseFileReply", replyData);
        }
    });
}

module.exports = onEvents;
