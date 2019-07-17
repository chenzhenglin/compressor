<template>
    <el-main>
        <el-header>
            <el-row type="flex" justify="center">
                <el-col :span="24">
                    <el-button size="small" type="primary" @click="onCompressToggle">{{text.btnSelectTxt}}</el-button>
                    <el-button size="small" type="primary" @click="onDelete">选中移除</el-button>
                    <el-button size="small" @click="goHome">返回首页</el-button>
                    <el-button size="small" @click="goBack">返回</el-button>
                </el-col>
            </el-row>

        </el-header>
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <el-table
                        ref="multipleTable"
                        border
                        :data="tableData"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        @select="onSelect"
                        @select-all="onSelect">
                    <el-table-column
                            type="selection"
                            width="40">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="文件名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="日期"
                            sortable
                            width="150">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                            prop="path"
                            label="文件绝对路径"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="operate"
                            label="操作"
                            width="150px"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="onDeleteOne(scope.row.index)"
                                    type="danger"
                                    size="mini">
                                移除
                            </el-button>
                            <el-button
                                    @click.native.prevent="onRevertToggle(scope.row)"
                                    type="warning"
                                    :disabled="btnDisabled(scope.row.disabled)"
                                    size="mini">
                                {{text.btnOperationTxt}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            width="90px"
                            align="center"
                            show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

    </el-main>
</template>

<script>
    export default {
        name: "fileList",
        data() {
            return {
                tableData: [],
                selectedFiles: [],
                text: {
                    btnSelectTxt: "选中压缩",
                    btnOperationTxt: "撤销",
                    disabled: false
                },
                formData: null,
            }
        },
        created() {
            this.tableData = JSON.parse(sessionStorage.getItem("fileList"));
            this.formData = JSON.parse(window.decodeURIComponent(sessionStorage.getItem("compressSizeForm")));
            if("1" === this.formData.type) {
                // 解压
                this.text.btnSelectTxt      = "选中解压";
                this.text.btnOperationTxt   = "解压";
                this.tableData.forEach((v, i) => {
                    this.tableData[i]["status"] = "未解压";
                })
            }
            this.$electron.ipcRenderer.on("compassFileReply", (ev, data) => {
                this.tableData.forEach((v, i) => {
                    if (parseInt(data.index) === v.index) {
                        if (1 === parseInt(data.status)) { // 压缩成功
                            this.tableData[i]["status"] = "压缩成功";
                            this.tableData[i]["disabled"] = false;
                        } else if(0 === parseInt(data.status)) { // 压缩失败
                            this.tableData[i]["status"] = "压缩失败";
                            console.log("error msg::");
                        }
                        return false;
                    }
                })
            });

            this.$electron.ipcRenderer.on("releaseFileReply", (ev, data) => {
                if (1 === parseInt(data.status)) {
                    this.tableData.forEach((v, i) => {
                        if (parseInt(data.index) === v.index) {
                            console.log(this.tableData[i]);
                            if("1" === this.formData.type) {
                                this.tableData[i]["status"] = "还原成功";
                                this.tableData[i]["disabled"] = true;
                            } else {
                                this.tableData[i]["status"] = "撤销成功";
                                this.text.disabled = true;
                            }
                            return false;
                        }
                    })
                } else if (0 === parseInt(data.status)) {
                    console.log("fail");
                } else if (-1 === parseInt(data.status)) {
                    this.tableData.forEach((v, i) => {
                        if (parseInt(data.index) === v.index) {
                            console.log(this.tableData[i]);
                            if("1" === this.formData.type) {
                                this.tableData[i]["status"] = "还原失败";
                            } else {
                                this.tableData[i]["status"] = "撤销失败";
                            }
                            this.tableData[i]["disabled"] = true;
                            return false;
                        }
                    })
                }
            });
        },
        methods: {
            btnDisabled(disabled_){
                console.log(this.formData.type);
                if("1" === this.formData.type) {
                    return false;
                } else {
                    return disabled_;
                }
            },
            onCompressToggle() {
                let sizeForm = sessionStorage.getItem("compressSizeForm");
                let files = this.selectedFiles;
                let submitData = {
                    form: sizeForm,
                    files: files
                };
                if("1" === this.formData.type) {
                    this.$electron.ipcRenderer.send("releaseFile", submitData);
                } else {
                    this.$electron.ipcRenderer.send("compassFile", submitData);
                }
            },
            onRevertToggle(row) {
                let sizeForm = sessionStorage.getItem("compressSizeForm");
                let submitData = {
                    form: sizeForm,
                    files: [row]
                };
                this.$electron.ipcRenderer.send("releaseFile", submitData);
            },
            onDeleteOne(arrIndex) {
                this.tableData.forEach((v, i) => {
                    if (arrIndex === v.index) {
                        this.tableData.splice(i, 1);
                        return false;
                    }
                })
            },
            onDelete() {
                this.selectedFiles.forEach((value, index) => {
                    let arrIndex = value.index;
                    this.tableData.forEach((v, i) => {
                        if (arrIndex === v.index) {
                            this.tableData.splice(i, 1);
                            return false;
                        }
                    })
                });
                this.selectedFiles = [];
            },
            onSelect(selection, row) {
                this.selectedFiles = selection;
            },
            goHome() {
                this.$router.push({path: '/'});
            },
            goBack() {
                if("1" === this.formData.type) {
                    this.$router.push({path: '/uncompress'});
                } else {
                    this.$router.push({path: '/compress'});
                }
            },
            handleSelectionChange() {

            }
        },
    }
</script>

<style>
    .el-table th > .cell {
        color: #FFFFFF;
        text-align: center;
    }

    .el-table th, .el-table tr {
        background-color: rgba(43, 43, 43, .9);
        color: #BABABA;
    }

    .el-table th, .el-table tr:hover {
        color: #2B2B2B;
    }

    .el-table td, .el-table th {
        padding: 5px 0;
    }
</style>
