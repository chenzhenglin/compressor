<template>
    <el-main>
        <el-row class="menu-row">
            <el-col :span="24">
                <div class="back-icon">
                    <span @click="goBack" class="el-icon-arrow-up"></span>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-form ref="form" :rules="rules" :model="sizeForm" label-width="80px" size="medium">
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-form-item label-width="100px" :label="selectFiles.label">
                            <el-input @input="onInputSelectDir" prop="selectFiles" :placeholder="selectFiles.placeholder"
                                      v-model="sizeForm.selectDir">
                                <el-select size="medium" class="extend-select" v-model="sizeForm.select" slot="prepend"
                                           placeholder="文件后缀">
                                    <el-option label=".js" value=".js"></el-option>
                                    <el-option :disabled="true" label=".css" value=".css"></el-option>
                                    <el-option :disabled="true" label=".js/.css" value=".js/.css"></el-option>
                                </el-select>
                                <el-button @click="openFolder(0)" slot="append"
                                           icon="el-icon-folder-opened"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-form-item label-width="100px" label="压缩文件保存">
                            <el-input prop="savePath"  placeholder="请输入压缩文件保存路径" v-model="sizeForm.buildSaveDir">
                                <el-select @change="onSelectOver" size="medium" class="extend-select" v-model="sizeForm.coverFile" slot="prepend"
                                           placeholder="是否覆盖现有文件">
                                    <el-option label="覆盖" value="0"></el-option>
                                    <el-option label="不覆盖" value="1"></el-option>
                                </el-select>
                                <el-button :disabled="'0' === sizeForm.coverFile" @click="openFolder(1)" slot="append"
                                           icon="el-icon-folder-opened"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-form-item label-width="100px" label="备份文件保存">
                            <el-input prop="savePath" placeholder="请输入备份文件保存路径" v-model="sizeForm.srcSaveDir">
                                <el-button @click="openFolder(2)" slot="append"
                                           icon="el-icon-folder-opened"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-form-item label-width="100px" label="版本号">
                            <el-input prop="selecFiles" placeholder="请输入版本号" v-model="sizeForm.version"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-form-item label-width="100px" label="操作者">
                            <el-input prop="selecFiles" placeholder="请输入你的姓名" v-model="sizeForm.author"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-form-item label-width="100px" size="large">
                            <el-button type="primary" @click="onSubmit">确定</el-button>
                            <el-button @click="goBack">返回</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>

    </el-main>
</template>

<script>

    let data = {
        select: '1',
        selectedFolder: "",
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        trueFlag: true,
        falseFlag: false,
        selectFiles: {
            label: "文件夹路径",
            placeholder: "请输入压缩文件夹路径"
        },
        sizeForm: {
            selectDir: '',
            version: '',
            author: '',
            srcSaveDir: '',
            buildSaveDir: '',
            select: '.js',
            coverFile: '0',
            type: "0", // 压缩标识
        },
        rules: {}
    }

    export default {
        name: "compressFile",
        data() {
            return data;
        },
        created: function () {
            this.$electron.ipcRenderer.on("openFolderReply", (ev, args) => {
                if (0 === args.type) {
                    data.sizeForm.selectDir = args.folder;
                    this.onSelectOver(this.sizeForm.coverFile);
                } else if (1 === args.type) {
                    data.sizeForm.buildSaveDir = args.folder;
                } else if (2 === args.type) {
                    data.sizeForm.srcSaveDir = args.folder;
                }
            });

            this.$electron.ipcRenderer.on("getFilesReply", (ev, args) => {
                sessionStorage.setItem("fileList", JSON.stringify(args));
                sessionStorage.setItem("compressSizeForm", window.encodeURIComponent(JSON.stringify(data.sizeForm)));
                this.$router.push({path: '/fileList'});
            });
        },
        methods: {
            goBack() {
                this.$router.push({path: '/'});
            },
            onSubmit() {
                if (!this.sizeForm.select) {
                    alert("后缀名不能为空");
                    return;
                }
                if (!this.sizeForm.selectDir) {
                    alert("文件夹路径不能为空");
                    return;
                }
                if (!this.sizeForm.buildSaveDir) {
                    alert("保存路径不能为空");
                    return;
                }
                if (!this.sizeForm.srcSaveDir) {
                    alert("备份文件保存路径不能为空");
                    return;
                }
                if (!this.sizeForm.version) {
                    alert("版本号不能为空");
                    return;
                }
                if (!this.sizeForm.author) {
                    alert("用户名不能为空");
                    return;
                }
                this.$electron.ipcRenderer.send("getFiles", this.sizeForm);
            },
            onInputSelectDir(val) {
                this.onSelectOver(this.sizeForm.coverFile);
            },
            openFolder(type) {
                this.$electron.ipcRenderer.send("openFolder", type);
            },
            onSelectOver(val) {
                if("0" === val) {
                    // 覆盖
                    this.sizeForm.buildSaveDir = this.sizeForm.selectDir;
                } else if("1" === val) {
                    // 不覆盖
                    this.sizeForm.buildSaveDir = "";
                }
            }
        }
    }
</script>

<style>
    .extend-select {
        width: 90px;
    }

    .el-col-empty {
        visibility: hidden;
    }

    .el-radio__label, .el-form-item__label {
        color: #BABABA;
    }

    .el-checkbox-button__inner, .el-input__inner {
        background-color: rgba(54, 53, 53, .5);
        color: #EBEBEB;
    }

    .back-icon {
        position: relative;
        font-size: 40px;
        background-color: transparent;
        color: #FFFFFF;
        text-align: center;
        animation: backMove 1s linear infinite alternate;
        margin-bottom: 100px;
        /*transform: rotate(90deg);*/
    }

    @keyframes backMove {
        from {
            top: 0px;
            opacity: 1;
        }
        to {
            top: 12px;
            opacity: .5;
        }
    }

    .back-icon > span:hover {
        cursor: pointer;
        color: #3a8ee6;
    }
</style>
