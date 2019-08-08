<template>
    <el-main>
        <el-row>
            <el-col :span="24">
                <div class="description">Welcome To Compressor</div>
            </el-col>
        </el-row>
        <el-row class="menu-row">
            <el-col :span="24">
                <vHeader :class-name="headerClass" />
            </el-col>
        </el-row>

    </el-main>

</template>

<script>

    import vHeader from "./header";
    export default {
        name: "index",
        data() {
            return {
                headerClass: "button-big"
            };
        },
        components: {
            vHeader
        },
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

<style scoped>

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
        margin: 15px auto 0;
    }
</style>
