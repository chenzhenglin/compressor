<template>
    <transition name="slide-top" :duration="2000">
        <el-main>
            <el-row>
                <el-col :span="24">
                    <div class="description">Welcome To Compressor</div>
                </el-col>
            </el-row>
            <el-row class="menu-row">
                <el-col :span="24">
                    <el-tooltip class="item" effect="dark" content="压缩文件" placement="top">
                        <el-button @click="handleCompass" title="压缩" size="medium" icon="el-icon-files" circle>
                            <!--<router-link :to="compressFile"></router-link>-->
                        </el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="还原文件" placement="top">
                        <el-button title="还原" size="medium" type="primary" icon="el-icon-copy-document" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="日志" placement="top">
                        <el-button title="日志" size="medium" type="success" icon="el-icon-document" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="帮助" placement="top">
                        <el-button title="帮助" size="medium" type="info" icon="el-icon-bangzhu" circle></el-button>
                    </el-tooltip>
                </el-col>
            </el-row>

        </el-main>

    </transition>
</template>

<script>
    export default {
        data() {
            return {
                slideTop : "slide-top",
                compressFile: "/compressFile",
                dialogVisible: false,
                isCollapse: true,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            };
        },
        name: "navMenu",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {

            },
            handleCompass(key) {
                console.log(key);
                this.$router.push({path: '/compress'});

            }
        }
    }
</script>

<style scoped>

    .el-button--medium {
        font-size: 30px;
        padding: 20px;
        background-color: transparent;
        color: #FFFFFF;
        text-align: center;
    }
    .el-button--medium:hover{
        transform: scale(1.2) rotate(10deg);
        color: cornflowerblue;
    }
    .description {
        color: #8cc5ff;
        text-align: center;
        height: 200px;
        line-height: 200px;
        font-size: 40px;
        opacity: 0.5;
    }

    .menu-row {
        width: 330px;
        /*57.5*/
        margin: 50px auto 0;
    }

    .nav-aside {
        background-color: rgba(87,124,149,0.9);
        overflow: hidden;
        height: 100000px;
    }

    .nav-el-menu:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .submenu {
    }
</style>
