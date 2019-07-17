'use strict';
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const notify = require('gulp-notify');
const replace = require('gulp-replace');
const uuidV4 = require('uuid/v4');
const nodePath = require('path');
const through = require('through2');
const {dateFormat} = require("../common/common");

function _getFileRelativePath(absoluteDir, filePath) {
    let absoluteDirArr = absoluteDir.split("\\");
    let filePathArr = filePath.split("\\");
    let arr = [];
    absoluteDirArr.filter(val=>!(val === "\\"));
    absoluteDirArr.forEach((val, index)=>{
        filePathArr.forEach((val2, index)=>{
            if(val === val2) {
                filePathArr.splice(index, 1);
            }
        });
    });
    filePathArr.pop();
    return filePathArr.join("\\");

}

module.exports = {
    /**
     * 压缩文件
     * @param file
     * @param form
     * @param cb
     */
    convertToMin(file, form, cb) {

        let uid = uuidV4().replace(/-/g, "");
        let formJson = JSON.parse(decodeURIComponent(form));
        let fileName = file.path;

        let descArr = [];
        descArr.push(`/**`);
        descArr.push(`*@description:compressor自动打包，勿改勿删`);
        descArr.push(`*@version:${formJson.version}`);
        descArr.push(`*@handler:${formJson.author}`);
        descArr.push(`*@createTime:${dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss")}`);
        descArr.push(`*@compressorId:${uid}`);
        descArr.push(`*/\r\n`);

        let version = descArr.join('\r\n');
        let basename = nodePath.basename(fileName).replace(/\.js/, "");
        let relaPath = _getFileRelativePath(formJson.selectDir, file.path);

        gulp.src(fileName)
            .pipe(rename({extname: `.${uid}.js`}))
            .pipe(gulp.dest(formJson.srcSaveDir))
            .pipe(uglify())
            .on('error', (err) => {
                console.log("error:" + err);
                // TODO 错误处理
                cb(0);
            })
            .pipe(rename({basename: basename}))
            .pipe(header(version))
            .pipe(gulp.dest(formJson.buildSaveDir+"\\"+relaPath))
            .on('end', () => {
                //console.log("success");
                cb(1);
            })
    },
    /**
     * 还原文件
     * @param file
     * @param form
     * @param cb_
     */
    convertToSrc(file, form, cb_) {

        let formJson = JSON.parse(decodeURIComponent(form));
        let relaPath = _getFileRelativePath(formJson.selectDir, file.path); // 文件相对路径
        let zipFileDir = formJson.selectDir+"\\"+relaPath; // 压缩文件路径
        let relaseFileDir = formJson.buildSaveDir+"\\"+relaPath; // 释放文件路径
        gulp.src(zipFileDir+"\\"+file.name)
            .pipe(through.obj((chunk, enc, cb) => {
                let {contents, path} = chunk;
                let tagArr = contents.toString().split("\r\n");
                let uid = "";
                tagArr.forEach((val, i) => {
                    if (-1 < val.indexOf("@compressorId")) {
                        uid = val.split(":")[1];
                        return false;
                    }
                });

                if("" === uid) {
                    cb_(-1); // 不具备解压条件
                    return;
                }

                let basename = nodePath.basename(path).replace(/\.js/, "");
                let uidFile = `${formJson.srcSaveDir}\\${basename + "." + uid.replace(/^\s+|\s+$/g, "")}.js`;

                gulp.src(uidFile)
                    .pipe(rename({basename: basename}))
                    .pipe(gulp.dest(relaseFileDir))
                    .on('error', (err) => {
                        // TODO 错误处理
                        //console.log("error:" + err);
                        cb_(0);
                    })
                    .on('end', () => {
                        cb_(1);
                        //console.log("success");
                    });

            }))
    }
};


