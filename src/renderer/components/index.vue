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
                        <el-button @click="handleCompress" title="压缩" size="medium" icon="el-icon-files" circle>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="还原文件" placement="top">
                        <el-button @click="handleUncompress" title="还原" size="medium" type="primary" icon="el-icon-copy-document" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="日志" placement="top">
                        <el-button @click="handleLog" title="日志" size="medium" type="success" icon="el-icon-document" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="帮助" placement="top">
                        <el-button @click="handleHelper"  title="帮助" size="medium" type="info" icon="el-icon-bangzhu" circle></el-button>
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
            };
        },
        name: "index",
        methods: {
            handleCompress(key) {
                //console.log(key);
                this.$router.push({path: '/compress'});

            },
            handleUncompress(key, keyPath) {
                this.$router.push({path: '/uncompress'});
            },
            handleLog(key, keyPath) {
                console.log(key, keyPath);
            },
            handleHelper(key, keyPath) {

            },
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
</style>
