
// 主线程console
function mainConsole(event, src, args) {
    event.sender.send("console", {src, args});
}

// 渲染线程接受主线程console
function rendererConsole(ipcRenderer) {
    ipcRenderer.on("console", (ev, data)=>{
        console.log(data.src, data.args);
    });
}

module.exports = {
    mainConsole : mainConsole,
    rendererConsole : rendererConsole,
}

