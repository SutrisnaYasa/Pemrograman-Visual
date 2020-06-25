const electron = require('electron');
const { v4 : uuidv4 } = require('uuid');
uuidv4();

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    ipcRenderer
} = electron;

let todayWindow;
let daftarmobilWindow;
var daftarsewamobil = [];
var daftarbayar = [];
var datamobil= [];


process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

app.on("ready", () => {
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }, 
        title : "My Rental"
    });

    todayWindow.loadURL(`file://${__dirname}/index.html`);
    todayWindow.on("closed", () => {

        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});


const daftarmobilWindowCreator = () => {
    daftarmobilWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },
        width: 600,
        height: 600,
        title: "Daftar Mobil"
    });

    daftarmobilWindow.setMenu(null);
    daftarmobilWindow.loadURL(`file://${__dirname}/daftarmobil.html`);
    daftarmobilWindow.on("closed", () => (daftarmobilWindow = null));
};


ipcMain.on('sewamobil', (event, arg) =>{
    todayWindow.webContents.send('update', arg);
});

ipcMain.on('infomobil', (event, arg) =>{
    datamobil.push(arg);
    console.log(datamobil);
    todayWindow.loadURL(`file://${__dirname}/pembayaran.html`);
});


ipcMain.on("datakirim", function(){
    todayWindow.loadURL(`file://${__dirname}/pembayaran.html`)
})

ipcMain.on("booknow", function(){
    todayWindow.loadURL(`file://${__dirname}/sewabaru.html`);
});

ipcMain.on("carimobil", function(){
    daftarmobilWindowCreator();
});

ipcMain.on("avansa", function(){
    avansaWindowCreator();
});

ipcMain.on("sewa:create", (event, pesan) => {
    pesan["id"] = uuidv4();
    daftarsewamobil.push(pesan);
    console.log(daftarsewamobil);

});






ipcMain.on("mobil:request:list", event =>{
    todayWindow.webContents.send('mobil:response:list', datamobil)
});



const menuTemplate = [{
        label : "Beranda",
        click(){
            todayWindow.loadURL(`file://${__dirname}/index.html`);
        }
        
    },

    {
        label: "Mobil",
        click(){
            todayWindow.loadURL(`file://${__dirname}/mobil.html`);
        }
    },

    {
        label : "About",
        click(){
            todayWindow.loadURL(`file://${__dirname}/about.html`);
        }
    },

    {
        label : "Booking",
     
            click(){
                todayWindow.loadURL(`file://${__dirname}/sewabaru.html`);
            }
    
    },

    {
        label: "View",
        submenu: [
            { role: "reload" },
             { role: "toggledevtools" }]
    },

    {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl + Q",
        click() {
            app.quit();
        }
    }
]