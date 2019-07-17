<template>
    <div id="app">
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

    const {rendererConsole} = require("../common/console");

    export default {
        name: 'compressor',
        beforeCreate() {
            // 监听来自主进程的console并打印在控制台
            rendererConsole(this.$electron.ipcRenderer);
        }
    }
</script>

<style>
    #app {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .slide-enter-active {
        transition: all ease-in-out .5s;
    }

    .slide-enter, .slide-leave {
        transform: translate3d(0, 100%, 0);
    }
</style>
