const { app, BrowserWindow } = require('electron')

const path = require('path')

const createWindow = () => {
    // 创建浏览窗口
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // __dirname 字符串指向当前正在执行脚本的路径
            // path.join API 将多个路径联结在一起
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    // 监听 app 的 activate 事件，确认没有窗口打开，则调用 createWindow() 方法
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})

// 当关闭所有窗口时，要退出应用程序
// 如果是 Mac 则使用 window-all-closed
// 如果不是 Mac 则使用 app.quit()
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
