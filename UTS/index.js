const electron = require("electron");
const uuid = require('uuid').v4;
uuid();
const {
    app, 
    BrowserWindow, 
    Menu, 
    ipcMain
} = electron ;

let homeWindow;
let mobilWindow;
let createWindow;
let listWindow;


let allAppointment = [];


app.on("ready", ()=> {
    homeWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title : "Rental Mobil"
    });

    homeWindow.loadURL(`file://${__dirname}/home.html`);
    homeWindow.on("closed", () => {

        app.quit();
        homeWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu); 

});

const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "All Appointments"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = null))
};

const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create Appointments"
    });

    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", () => (createWindow = null));
};



const mobilWindowCreator = () => {
    mobilWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "mobil Appointments"
    });

    mobilWindow.setMenu(null);
    mobilWindow.loadURL(`file://${__dirname}/mobil.html`);
    mobilWindow.on("closed", () => (mobilWindow = null))
};

ipcMain.on("appointment:create", (event, appointment) => {
    appointment["id"] = uuid();
    appointment["done"] = 0;
    allAppointment.push(appointment);

    createWindow.close();
    
    console.log(allAppointment);
});

ipcMain.on("appointment:request:list", event => {
   listWindow.webContents.send('appointment:response:list', allAppointment);
});

ipcMain.on("appointment:request:home", event => {
    console.log("here2");
});

ipcMain.on("appointment:done", (event, id) => {
    console.log("here3");
});

const menuTemplate = [{
    label: "Booking",
    submenu: [{
        label: "Sewa Mobil",

        click() {
            createWindowCreator();
        }
    },

    {   
        label: "Pesanan",
        click() {
            listWindowCreator();
        }
    },
    {
        label:"Quit",
        acclerato: process.platform === "darwin" ? "Comaand+Q" :
        "Ctrl + Q",
        click() {
            app.quit();
        }
    }
]
},
{
    label:"View",
    submenu: [{ role: "reload" }, { role: "toggledevtools"}]
},

{
    label:"Mobil",
    click() {
        mobilWindowCreator();
    }
}


]