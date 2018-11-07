const {
    app,
    BrowserWindow
} = require('electron');
var io = require('socket.io-client');
var socket;
var fs = require('fs');
const os = require('os');
var ipc = require('electron').ipcMain;
var fn = "";
var mdata = {};
var fcache = 0;
var prepdata = [];
var exec = require('child_process').execFile;
var FilePath = 'C:\\Users\\' + os.userInfo().username + '\\Saved Games\\Frontier Developments\\Elite Dangerous';
if(os.arch() == "x64")
    var pat = "C:\\Program Files (x86)\\EDMarketConnector\\EDMarketConnector.exe";
else var pat = "C:\\Program Files\\EDMarketConnector\\EDMarketConnector.exe";
fs.exists(pat,()=>{
    exec(pat, function(err, data) {                    
    }); 
})
var receviedFromOthers=[];
var reqLP = "M";
var lastlocal = ["-", "Deep Space"];
var common = [{
    "id": "1",
    "name": "Agri-Medicines"
}, {
    "id": "3",
    "name": "Explosives"
}, {
    "id": "4",
    "name": "Hydrogen Fuel"
}, {
    "id": "5",
    "name": "Mineral Oil"
}, {
    "id": "6",
    "name": "Pesticides"
}, {
    "id": "7",
    "name": "Clothing"
}, {
    "id": "8",
    "name": "Consumer Technology"
}, {
    "id": "9",
    "name": "Domestic Appliances"
}, {
    "id": "10",
    "name": "Beer"
}, {
    "id": "11",
    "name": "Liquor"
}, {
    "id": "12",
    "name": "Narcotics"
}, {
    "id": "13",
    "name": "Tobacco"
}, {
    "id": "14",
    "name": "Wine"
}, {
    "id": "15",
    "name": "Algae"
}, {
    "id": "16",
    "name": "Animal Meat"
}, {
    "id": "17",
    "name": "Coffee"
}, {
    "id": "18",
    "name": "Fish"
}, {
    "id": "19",
    "name": "Food Cartridges"
}, {
    "id": "20",
    "name": "Fruit and Vegetables"
}, {
    "id": "21",
    "name": "Grain"
}, {
    "id": "22",
    "name": "Tea"
}, {
    "id": "23",
    "name": "Synthetic Meat"
}, {
    "id": "26",
    "name": "Polymers"
}, {
    "id": "27",
    "name": "Superconductors"
}, {
    "id": "28",
    "name": "Semiconductors"
}, {
    "id": "29",
    "name": "Crop Harvesters"
}, {
    "id": "31",
    "name": "Mineral Extractors"
}, {
    "id": "32",
    "name": "Chemical Waste"
}, {
    "id": "33",
    "name": "Basic Medicines"
}, {
    "id": "34",
    "name": "Combat Stabilisers"
}, {
    "id": "35",
    "name": "Performance Enhancers"
}, {
    "id": "36",
    "name": "Progenitor Cells"
}, {
    "id": "37",
    "name": "Aluminium"
}, {
    "id": "38",
    "name": "Beryllium"
}, {
    "id": "39",
    "name": "Cobalt"
}, {
    "id": "40",
    "name": "Copper"
}, {
    "id": "41",
    "name": "Gallium"
}, {
    "id": "42",
    "name": "Gold"
}, {
    "id": "43",
    "name": "Indium"
}, {
    "id": "44",
    "name": "Lithium"
}, {
    "id": "45",
    "name": "Palladium"
}, {
    "id": "46",
    "name": "Silver"
}, {
    "id": "47",
    "name": "Tantalum"
}, {
    "id": "48",
    "name": "Titanium"
}, {
    "id": "49",
    "name": "Imperial Slaves"
}, {
    "id": "50",
    "name": "Uranium"
}, {
    "id": "51",
    "name": "Bauxite"
}, {
    "id": "52",
    "name": "Bertrandite"
}, {
    "id": "53",
    "name": "Slaves"
}, {
    "id": "54",
    "name": "Toxic Waste"
}, {
    "id": "55",
    "name": "Coltan"
}, {
    "id": "56",
    "name": "Gallite"
}, {
    "id": "57",
    "name": "Indite"
}, {
    "id": "58",
    "name": "Lepidolite"
}, {
    "id": "59",
    "name": "Rutile"
}, {
    "id": "60",
    "name": "Uraninite"
}, {
    "id": "61",
    "name": "Advanced Catalysers"
}, {
    "id": "62",
    "name": "Animal Monitors"
}, {
    "id": "63",
    "name": "Aquaponic Systems"
}, {
    "id": "65",
    "name": "Auto-Fabricators"
}, {
    "id": "66",
    "name": "Bioreducing Lichen"
}, {
    "id": "67",
    "name": "Computer Components"
}, {
    "id": "68",
    "name": "H.E. Suits"
}, {
    "id": "69",
    "name": "Resonating Separators"
}, {
    "id": "70",
    "name": "Robotics"
}, {
    "id": "71",
    "name": "Land Enrichment Systems"
}, {
    "id": "72",
    "name": "Osmium"
}, {
    "id": "73",
    "name": "Leather"
}, {
    "id": "74",
    "name": "Natural Fabrics"
}, {
    "id": "75",
    "name": "Synthetic Fabrics"
}, {
    "id": "76",
    "name": "Biowaste"
}, {
    "id": "77",
    "name": "Scrap"
}, {
    "id": "78",
    "name": "Non-Lethal Weapons"
}, {
    "id": "79",
    "name": "Personal Weapons"
}, {
    "id": "80",
    "name": "Reactive Armour"
}, {
    "id": "81",
    "name": "Platinum"
}, {
    "id": "82",
    "name": "Water Purifiers"
}, {
    "id": "83",
    "name": "Power Generators"
}, {
    "id": "84",
    "name": "Painite"
}, {
    "id": "85",
    "name": "Microbial Furnaces"
}, {
    "id": "86",
    "name": "Marine Equipment"
}, {
    "id": "87",
    "name": "Atmospheric Processors"
}, {
    "id": "88",
    "name": "Battle Weapons"
}, {
    "id": "95",
    "name": "Bootleg Liquor"
}, {
    "id": "96",
    "name": "Nerve Agents"
}, {
    "id": "97",
    "name": "Surface Stabilisers"
}, {
    "id": "98",
    "name": "Synthetic Reagents"
}, {
    "id": "99",
    "name": "Evacuation Shelter"
}, {
    "id": "100",
    "name": "Ceramic Composites"
}, {
    "id": "101",
    "name": "Meta-Alloys"
}, {
    "id": "102",
    "name": "Building Fabricators"
}, {
    "id": "103",
    "name": "Geological Equipment"
}, {
    "id": "104",
    "name": "Skimmer Components"
}, {
    "id": "105",
    "name": "Thermal Cooling Units"
}, {
    "id": "106",
    "name": "Bismuth"
}, {
    "id": "107",
    "name": "Lanthanum"
}, {
    "id": "108",
    "name": "Thallium"
}, {
    "id": "109",
    "name": "Thorium"
}, {
    "id": "110",
    "name": "Cryolite"
}, {
    "id": "111",
    "name": "Goslarite"
}, {
    "id": "112",
    "name": "Pyrophyllite"
}, {
    "id": "116",
    "name": "Moissanite"
}, {
    "id": "117",
    "name": "Structural Regulators"
}, {
    "id": "118",
    "name": "Landmines"
}, {
    "id": "119",
    "name": "Muon Imager"
}, {
    "id": "120",
    "name": "Taaffeite"
}, {
    "id": "124",
    "name": "Hafnium 178"
}, {
    "id": "137",
    "name": "Liquid Oxygen"
}, {
    "id": "138",
    "name": "Hydrogen Peroxide"
}, {
    "id": "139",
    "name": "Water"
}, {
    "id": "140",
    "name": "CMM Composite"
}, {
    "id": "141",
    "name": "Insulating Membrane"
}, {
    "id": "142",
    "name": "Samarium"
}, {
    "id": "143",
    "name": "Praseodymium"
}, {
    "id": "144",
    "name": "Low Temperature Diamonds"
}, {
    "id": "145",
    "name": "Methane Clathrate"
}, {
    "id": "146",
    "name": "Methanol Monohydrate Crystals"
}, {
    "id": "147",
    "name": "Lithium Hydroxide"
}, {
    "id": "148",
    "name": "Bromellite"
}, {
    "id": "149",
    "name": "Energy Grid Assembly"
}, {
    "id": "150",
    "name": "HN Shock Mount"
}, {
    "id": "151",
    "name": "Heatsink Interlink"
}, {
    "id": "152",
    "name": "Magnetic Emitter Coil"
}, {
    "id": "153",
    "name": "Power Converter"
}, {
    "id": "154",
    "name": "Medical Diagnostic Equipment"
}, {
    "id": "155",
    "name": "Hardware Diagnostic Sensor"
}, {
    "id": "156",
    "name": "Micro Controllers"
}, {
    "id": "157",
    "name": "Military Grade Fabrics"
}, {
    "id": "158",
    "name": "Emergency Power Cells"
}, {
    "id": "159",
    "name": "Exhaust Manifold"
}, {
    "id": "160",
    "name": "Ion Distributor"
}, {
    "id": "161",
    "name": "Power Transfer Bus"
}, {
    "id": "162",
    "name": "Radiation Baffle"
}, {
    "id": "163",
    "name": "Reinforced Mounting Plate"
}, {
    "id": "164",
    "name": "Survival Equipment"
}, {
    "id": "165",
    "name": "Conductive Fabrics"
}, {
    "id": "166",
    "name": "Advanced Medicines"
}, {
    "id": "167",
    "name": "Nanobreakers"
}, {
    "id": "168",
    "name": "Jadeite"
}, {
    "id": "181",
    "name": "Modular Terminals"
}, {
    "id": "182",
    "name": "Articulation Motors"
}, {
    "id": "183",
    "name": "Neofabric Insulation"
}, {
    "id": "184",
    "name": "Telemetry Suite"
}, {
    "id": "185",
    "name": "Micro-Weave Cooling Hoses"
}, {
    "id": "10233",
    "name": "Platinum Alloy"
}];
var parsing = 0;
var wing = [
    [0, 0, 0],
    []
];
var name = "";
var tempdb = [];

function Mission1() {
    this.name = "";
    this.count = 0;
    this.delivered = 0;
    this.id = 0;
    this.Wing = false;
}
mdata.mission = [];

function createWindow() {
    win = new BrowserWindow({
        width: 450,
        height: 160,
        frame: false,
        alwaysOnTop: true,
        transparent: true
    })
    win.setResizable(false);
    win.setMaximizable(false);
    win.loadFile('index.html')
    var files = fs.readdirSync(FilePath);
    var flist = getNewestFile(files, FilePath);
    fn = FilePath + "\\" + flist[0].file;
    fcache = getLinesCount();
    for (var f = flist.length - 1; f >= 0; f--) {
        data = fs.readFileSync(FilePath + "\\" + flist[f].file);
        data2 = data.toString('utf8').split("\r\n");
        for (var i = 1; i < data2.length - 1; i++) {
            parser(JSON.parse(data2[i]));
        }
        parsing++;
        if (flist.length == parsing) {
            updateList(1);
            loaddata(tempdb);
        }
    }
    setInterval(() => {
        checkfile();
    }, 1000)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function getLinesCount() {
    data = fs.readFileSync(fn);
    data2 = data.toString('utf8').split("\r\n");
    return data2.length;
}


function getNewestFile(files, path) {
    var out = [];
    files.forEach(function (file) {
        var stats = fs.statSync(path + "/" + file);
        if (stats.isFile() && file.indexOf(".log") != -1) {
            out.push({
                "file": file
            });
        }
    });
    out.sort(function (a, b) {
        return b.file.split(".")[1] - a.file.split(".")[1];
    })
    return (out.length > 0) ? out : "";
}

function parser(data, inl = 0) {
    if (data.event == "MissionAccepted" && data.Commodity_Localised && mdata.mission.findIndex(x => x.id == data.MissionID) == -1 && data.Name.indexOf("Mission_Collect") != -1) {
        var mission = new Mission1();
        mission.name = data.Commodity_Localised;
        mission.count = data.Count;
        mission.id = data.MissionID;
        mission.delivered = 0;
        mission.Wing = data.Wing;
        mdata.mission.push(mission);
        updateList(inl);
    } else if (data.event == "CargoDepot" && mdata.mission.findIndex(x => x.id == data.MissionID) != -1 && (data.UpdateType == "Deliver" || data.UpdateType == "WingUpdate")) {
        index = mdata.mission.findIndex(x => x.id == data.MissionID);
        if (index > -1) mdata.mission[index].delivered = data.ItemsDelivered;
        updateList(inl);
    } else if (data.event == "MissionCompleted" && mdata.mission.findIndex(x => x.id == data.MissionID) != -1) {
        index = mdata.mission.findIndex(x => x.id == data.MissionID);
        mdata.mission.removeItem(index);
        updateList(inl);
    } else if ((data.event == "MissionAbandoned" || data.event == "MissionFailed") && mdata.mission.findIndex(x => x.id == data.MissionID) != -1) {
        index = mdata.mission.findIndex(x => x.id == data.MissionID);
        mdata.mission.removeItem(index);
        updateList(inl);
    } else if (data.event == "Docked") {
        lastlocal = [data.StarSystem, data.StationName];
    } else if (data.event == "Undocked") {
        loaddata(tempdb);
    } else if (data.event == "FSDJump") {
        lastlocal = [data.StarSystem, ""];
    } else if (data.event == "WingJoin") {
        wing[1] = data.Others;
    } else if (data.event == "Loadout"){
        if(["DIAMONDBACKXL","COBRAMKIII","EMPIRE_EAGLE","VULTURE","VIPER_MKIV","VIPER","SIDEWINDER","ADDER","DOLPHIN","HAULER","EAGLE","EMPIRE_COURIER","DIAMONDBACK","COBRAMKIV"].indexOf(data.Ship.toUpperCase())!=-1) reqLP = "S";
        else if(["PYTHON","ASP","FERDELANCE","ASP_SCOUT","TYPEX_3","TYPEX","TYPEX_2","FEDERATION_DROPSHIP_MKII","FEDERATION_DROPSHIP","FEDERATION_GUNSHIP","INDEPENDANT_TRADER","KRAIT_MKII","TYPE6"].indexOf(data.Ship.toUpperCase())!=-1) reqLP = "M";
        else if(["ANACONDA","CUTTER","FEDERATION_CORVETTE","BELUGALINER","ORCA","EMPIRE_TRADER","TYPE9_MILITARY","TYPE7","TYPE9"].indexOf(data.Ship.toUpperCase()!=-1)) reqLP = "L";
    } else if (data.event =="WingLeave"){
        wing[1] = [];
        updateList(inl);
    } else if (data.event == "WingAdd") {
        if (wing[1].indexOf(data.Name) == -1) wing[1].push(data.Name);
        if (inl > 0) {
            checkWing(wing[1])
            if (prepdata.length > 1 && wing[1].length > 0) socket.emit("Wing-Mission-prop", prepdata);
        };
    } else if (data.event == "Shutdown" || data.event == "WingLeave") {
        wing = [
            [0, 0, 0],
            []
        ];
        if (inl > 0) {
            win.webContents.send("wing-reply", ["#wing1", 2, "off"]);
            win.webContents.send("wing-status", ["#wing1", "off"]);
            win.webContents.send("wing-reply", ["#wing2", 3, "off"]);
            win.webContents.send("wing-status", ["#wing2", "off"]);
            win.webContents.send("wing-reply", ["#wing3", 4, "off"]);
            win.webContents.send("wing-status", ["#wing3", "off"]);
        }
        updateList(inl);
    } else if (data.event == "Commander" && name == "") {
        wing = [
            [0, 0, 0],
            []
        ];
        name = data.Name;
        socket = io("ws://ed-mission-helper.herokuapp.com:80");
        socket.on("Auth", (data) => {
            socket.emit("Auth-r", name);
            win.webContents.send("wing-name", ["#wingyou", name]);
        });
        socket.on("Auth-succ", (data) => {
            win.webContents.send("wing-reply", ["#wingyou", 1, "on"]);
            preparews();
            checkWing(wing[1]);
        })
        socket.on("disconnect", () => {
            win.webContents.send("wing-reply", ["#wingyou", 1, "off"]);
            win.webContents.send("wing-reply", ["#wing1", 2, "off"]);
            win.webContents.send("wing-status", ["#wing1", "off"]);
            win.webContents.send("wing-reply", ["#wing2", 3, "off"]);
            win.webContents.send("wing-status", ["#wing2", "off"]);
            win.webContents.send("wing-reply", ["#wing3", 4, "off"]);
            win.webContents.send("wing-status", ["#wing3", "off"]);
        })
    }
}
Array.prototype.removeItem = function (item) {
    if (item > -1) this.splice(item, 1);
}

function checkfile() {
    if (getLinesCount() != fcache) {
        fs.readFile(fn, (e, data) => {
            data2 = data.toString('utf8').split("\r\n");
            for (var i = 1; i < data2.length - 1; i++) {
                if (i >= fcache - 1) parser(JSON.parse(data2[i]), 1);
            }
            fcache = getLinesCount();
        })
    }
}

function updateList(p) {
    var db = [];

    function item() {
        this.name = "";
        this.count = 0;
    }
    if (p == 1) {
        prepdata = [wing[1]];
        for (var i = 0; i < mdata.mission.length; i++) {
            if (db.findIndex(x => x.name == mdata.mission[i].name) != -1) {
                index = db.findIndex(x => x.name == mdata.mission[i].name);
                db[index].count += mdata.mission[i].count - mdata.mission[i].delivered;
            } else {
                var newitem = new item();
                newitem.name = mdata.mission[i].name;
                newitem.count = mdata.mission[i].count - mdata.mission[i].delivered;
                db.push(newitem);
            }
            if (mdata.mission[i].Wing == true) {
                prepdata.push(mdata.mission[i]);
            } else if (wing[1].length > 0 && mdata.mission[i].received) {
                mdata.mission.splice(i, 1);
            }
        }
        if (prepdata.length > 1 && wing[1].length > 0) socket.emit("Wing-Mission-prop", prepdata);
        tempdb = db;
        var init = setInterval(() => {
            win.webContents.send("update-reply", JSON.stringify(db));
            ipc.once("test", function (event, data) {
                clearInterval(init);
            });
        }, 200);
    }
}
ipc.on('lb', function (event, data) {
    win.setSize(450, Number(data));
})
setInterval(() => {
    var files = fs.readdirSync(FilePath);
    fn = FilePath + "\\" + getNewestFile(files, FilePath)[0].file;
}, 5000)

function loaddata(db) {
    if (db.length > 0) {
        call(db);
    }
}

function call(db, i = 0) {
    var request = require("request");
    var cheerio = require('cheerio');
    var ilosc = db[i].count;
    request.post("https://inara.cz/galaxy-commodity/", {
            form: {
                "location": "galaxy-commodity",
                "formact": "SEARCH_COMMODITIES",
                "searchcommodity": common.find(x => x.name === db[i].name).id,
                "searchcommoditysystem": lastlocal[0]
            }
        },
        function (err, httpResponse, body) {
            var $ = cheerio.load(body);
            for (var t = 2; t < $("td.alignright").length; t += 5) {
                if ($("td.alignright").eq(t).text().replaceAll(",", "") >= ilosc && shipChecker($("td.minor").not(".alignright").eq((t + 3) / 5 - 1).text())) {
                    var index = (t + 3) / 5 - 1;
                    var text = $("span.uppercase.avoidwrap").eq(index).text() + " -> " + $("span.normal.avoidwrap").eq(index).text() + " (" + String(Number($("td.alignright").eq(t + 1).text().replaceAll(",", "").replace("Cr", "")) * Number(db[i].count)).split(/(?=(?:...)*$)/).join(",") + "Cr)";
                    break;
                } else {
                    var text = "E:404";
                }
            }
            var data = JSON.stringify({
                'id': i,
                "loc": text
            });
            win.webContents.send("location-reply", data);
            if (i + 1 < db.length) setTimeout(() => {
                call(db, i + 1);
            }, 500);
        });
}
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
function shipChecker(Lp){
    if (Lp=="S" && (reqLP=="S")) return true;
    else if (Lp=="M" && (reqLP=="S" || reqLP=="M")) return true;
    else if (Lp=="L" && (reqLP=="S" || reqLP=="M" || reqLP=="L")) return true;
    else return false;
}
function checkWing(wingdata) {
    if (wingdata.length >= 1) {
        win.webContents.send("wing-status", ["#wing1", "on"]);
        win.webContents.send("wing-name", ["#wing1", wingdata[0]]);
        win.webContents.send("wing-reply", ["#wing1", 2, "off"]);
    }
    if (wingdata.length >= 2) {
        win.webContents.send("wing-status", ["#wing2", "on"]);
        win.webContents.send("wing-name", ["#wing2", wingdata[1]]);
        win.webContents.send("wing-reply", ["#wing2", 3, "off"]);
    }
    if (wingdata.length >= 3) {
        win.webContents.send("wing-status", ["#wing3", "on"]);
        win.webContents.send("wing-name", ["#wing3", wingdata[2]]);
        win.webContents.send("wing-reply", ["#wing3", 4, "off"]);
    }
    socket.emit("check-wing", JSON.stringify(wingdata))
}

function preparews() {
    socket.on("Wing-Status", (data) => {
        var index = wing[1].indexOf(data.name);
        if (index != -1) {
            if (data.status == "Online") {
                console.log("Wingmate online: " + data.name);
                wing[0][index] = 1;
                win.webContents.send("wing-status", ["#wing" + Number(index + 1), "on"]);
                win.webContents.send("wing-reply", ["#wing" + Number(index + 1), index + 2, "on"]);
            } else if (data.status == "Offline") {
                console.log("Wingmate offline: " + data.name);
                wing[0][index] = 0;
                win.webContents.send("wing-reply", ["#wing" + Number(index + 1), index + 2, "off"]);
            }
        }
    });

    socket.on("Wing-Mission", (data) => {
        var acc = 0;
        if (data[0].indexOf(name) != -1) {
            for (var i = 1; i < data.length; i++) {
                if (mdata.mission.findIndex(x => x.id === data[i].id) == -1) {
                    data[i].received = true;
                    mdata.mission.push(data[i]);
                    acc++;
                }
            }
            if (acc > 0 && wing[1].length > 0) {updateList(1);loaddata(tempdb);}
        }
    });
}