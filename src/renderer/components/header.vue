<template>
    <el-header class="header">
        <el-row>
            <el-col :span="24">
                <el-tooltip class="item" effect="dark" content="压缩文件" placement="top">
                    <el-button :class="className" @click="handleCompress" title="压缩" size="medium"
                               icon="el-icon-files" circle>
                    </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="还原文件" placement="top">
                    <el-button :class="className" @click="handleUncompress" title="还原" size="medium" type="primary"
                               icon="el-icon-copy-document" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="日志" placement="top">
                    <el-button :class="className" @click="handleLog" title="日志" size="medium" type="success"
                               icon="el-icon-document" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="帮助" placement="top">
                    <el-button :class="className" @click="handleHelper" title="帮助" size="medium" type="info"
                               icon="el-icon-bangzhu" circle></el-button>
                </el-tooltip>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    export default {
        name: "v-header",
        props: ['className'],
        methods: {
            handleCompress(key) {
                this.$router.push({path: '/compress'});

            },
            handleUncompress(key, keyPath) {
                this.$router.push({path: '/uncompress'});
            },
            handleLog(key, keyPath) {
                this.$router.push({path: '/log'});
            },
            handleHelper(key, keyPath) {
                console.log(key, keyPath);
            },
        }
    }
</script>

<style>
    .header {
        padding: 10px 20px;
    }

    .el-button--medium.is-circle,
    .el-button.is-circle {
        padding: 12px;
    }

    .button-medium {
        background-color: transparent;
        color: #FFFFFF;
        text-align: center;
    }

    .button-medium:hover {
        transform: scale(1.2) rotate(10deg);
    }

    .button-big {
        font-size: 32px;
        padding: 20px;
        background-color: transparent;
        color: #FFFFFF;
        text-align: center;
    }

    .button-big:hover {
        transform: scale(1.2) rotate(10deg);
    }
</style>
