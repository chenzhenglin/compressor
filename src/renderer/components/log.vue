<template>
    <el-container>
        <vHeader :class-name="headerClass" />
    </el-container>


</template>

<script>

    import vHeader from './header'

    export default {
        data(){
            return {
                headerClass: "button-medium"
            }
        },
        name: "log",
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

</style>
