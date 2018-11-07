var lodash = require('lodash');
var os = require('os');
var fs = require('fs');
var fcache = 0;
var KnownFiles = [];
function Player() {
    this.Money = 0;
    this.Loan = 0;
    this.Ranks = {
        "Empire": 0,
        "Federation": 0,
        "Combat": 0,
        "Trade": 0,
        "Explore": 0,
        "CQC": 0
    };
    this.Cargo = [];
    this.Materials = {
        "Encoded": [],
        "Manufactured": [],
        "Raw": []
    };
    this.Location = "";
    this.Missions = [];
    this.Name = "";
    this.Wing = [];
}
var player = new Player();
var key = "5cy5h8qrnf0oowooc0wwk0cc0wccg48og0ogsck";
const template = {
    "header": {
        "appName": "EDMissionHelper",
        "appVersion": "1.01",
        "isDeveloped": true,
        "APIkey": key,
        "commanderName": ""
    },
    "events": []
};
var ArrayToSend = template;

function INARAparser(data) {
    if (data.event == "NewCommander") {
        //{ "timestamp":"2018-08-31T13:38:41Z", "event":"NewCommander", "Name":"Lobod", "Package":"Default" }
        player.Name = data.Name;
        ArrayToSend.header.commanderName = data.Name;
    } else if (data.event == "MissionAccepted") {
        //{ "timestamp":"2018-09-02T07:21:14Z", "event":"MissionAccepted", "Faction":"Brotherhood of the Dragon", "Name":"Mission_Courier_Elections", "LocalisedName":"Courier required for sensitive poll data", "TargetFaction":"BD+01 3657 Domain", "DestinationSystem":"GD 215", "DestinationStation":"Faraday Orbital", "Expiry":"2018-09-03T07:18:24Z", "Wing":false, "Influence":"Med", "Reputation":"Med", "Reward":96218, "MissionID":415668897 }
    } else if (data.event == "MissionFailed") {
        //{ "timestamp":"2018-09-19T06:29:37Z", "event":"MissionFailed", "Name":"Mission_Collect_name", "MissionID":419368792 }
    } else if (data.event == "MissionCompleted") {
        //{ "timestamp":"2018-09-06T18:29:00Z", "event":"MissionCompleted", "Faction":"Lords of Arabakti", "Name":"Mission_Delivery_Boom_name", "MissionID":416762879, "Commodity":"$Explosives_Name;", "Commodity_Localised":"Explosives", "Count":3, "TargetFaction":"Lowat Yuan as one", "DestinationSystem":"Lowat Yuan", "DestinationStation":"Tuan Base", "Reward":44007, "FactionEffects":[ { "Faction":"Lowat Yuan as one", "Effects":[ { "Effect":"$MISSIONUTIL_Interaction_Summary_boom_up;", "Effect_Localised":"$#MinorFaction; are experiencing increased growth that could lead to an economic boom", "Trend":"UpGood" } ], "Influence":[ { "SystemAddress":3382387413730, "Trend":"UpGood" } ], "Reputation":"UpGood" }, { "Faction":"Lords of Arabakti", "Effects":[ { "Effect":"$MISSIONUTIL_Interaction_Summary_boom_up;", "Effect_Localised":"$#MinorFaction; are experiencing increased growth that could lead to an economic boom", "Trend":"UpGood" } ], "Influence":[ { "SystemAddress":4820840745331, "Trend":"UpGood" } ], "Reputation":"UpGood" } ] }
    } else if (data.event == "MissionAbandoned") {
        //{ "timestamp":"2018-09-05T14:05:04Z", "event":"MissionAbandoned", "Name":"Mission_Mining_Boom_name", "MissionID":416085530 }
    } else if (data.event == "Docked") {
        //{ "timestamp":"2018-09-02T06:48:21Z", "event":"Docked", "StationName":"Descartes Gateway", "StationType":"Outpost", "StarSystem":"LTT 15574", "SystemAddress":670149191105, "MarketID":3230441216, "StationFaction":"LTT 15574 Holdings", "FactionState":"Election", "StationGovernment":"$government_Corporate;", "StationGovernment_Localised":"Corporate", "StationAllegiance":"Federation", "StationServices":[ "Dock", "Autodock", "Commodities", "Contacts", "Exploration", "Missions", "Repair", "Workshop", "MissionsGenerated", "FlightController", "StationOperations", "Powerplay", "SearchAndRescue" ], "StationEconomy":"$economy_Industrial;", "StationEconomy_Localised":"Industrial", "StationEconomies":[ { "Name":"$economy_Industrial;", "Name_Localised":"Industrial", "Proportion":0.620000 }, { "Name":"$economy_Extraction;", "Name_Localised":"Extraction", "Proportion":0.380000 } ], "DistFromStarLS":384.414154 }
    } else if (data.event == "FSDJump") {
        //{ "timestamp":"2018-09-02T07:24:30Z", "event":"FSDJump", "StarSystem":"LFT 1448", "SystemAddress":3107442397922, "StarPos":[-53.90625,-0.68750,60.18750], "SystemAllegiance":"Federation", "SystemEconomy":"$economy_Industrial;", "SystemEconomy_Localised":"Industrial", "SystemSecondEconomy":"$economy_None;", "SystemSecondEconomy_Localised":"None", "SystemGovernment":"$government_Corporate;", "SystemGovernment_Localised":"Corporate", "SystemSecurity":"$SYSTEM_SECURITY_medium;", "SystemSecurity_Localised":"Medium Security", "Population":3311098, "JumpDist":4.756, "FuelUsed":0.237537, "FuelLevel":1.762463, "Factions":[ { "Name":"Democrats of LTT 15574", "FactionState":"War", "Government":"Democracy", "Influence":0.022863, "Allegiance":"Federation", "PendingStates":[ { "State":"Boom", "Trend":1 } ] }, { "Name":"LFT 1448 Independents", "FactionState":"Bust", "Government":"Democracy", "Influence":0.107356, "Allegiance":"Federation", "PendingStates":[ { "State":"Boom", "Trend":0 } ] }, { "Name":"Pilots Federation Local Branch", "FactionState":"None", "Government":"Democracy", "Influence":0.000000, "Allegiance":"PilotsFederation" }, { "Name":"LFT 1448 Federal Industries", "FactionState":"Boom", "Government":"Corporate", "Influence":0.128231, "Allegiance":"Independent" }, { "Name":"Gold United Systems", "FactionState":"War", "Government":"Corporate", "Influence":0.094433, "Allegiance":"Independent", "RecoveringStates":[ { "State":"Boom", "Trend":1 } ] }, { "Name":"LFT 1448 Gold Clan", "FactionState":"War", "Government":"Anarchy", "Influence":0.141153, "Allegiance":"Independent", "PendingStates":[ { "State":"Boom", "Trend":1 }, { "State":"CivilUnrest", "Trend":1 }, { "State":"Lockdown", "Trend":1 } ], "RecoveringStates":[ { "State":"Bust", "Trend":1 } ] }, { "Name":"LFT 1448 Dominion", "FactionState":"War", "Government":"Dictatorship", "Influence":0.009940, "Allegiance":"Independent", "PendingStates":[ { "State":"Boom", "Trend":1 } ] }, { "Name":"Adle's Armada", "FactionState":"Boom", "Government":"Corporate", "Influence":0.496024, "Allegiance":"Federation" } ], "SystemFaction":"Adle's Armada", "FactionState":"Boom" }
    } else if (data.event == "WingJoin") {
        //{ "timestamp":"2018-09-10T19:29:10Z", "event":"WingJoin", "Others":[] }
    } else if (data.event == "WingAdd") {
        //{ "timestamp":"2018-09-10T19:29:10Z", "event":"WingAdd", "Name":"Lobod" }
    } else if (data.event == "WingLeave") {
        //{ "timestamp":"2018-09-10T21:18:26Z", "event":"WingLeave" }
    } else if (data.event == "Commander") {
        //{ "timestamp":"2018-09-05T10:47:14Z", "event":"Commander", "Name":"Lobod" }
        player.Name = data.Name;
        ArrayToSend.header.commanderName = data.Name;
    } else if (data.event == "Materials") {
        //{ "timestamp":"2018-11-01T14:32:45Z", "event":"Materials", "Raw":[  ], "Manufactured":[ { "Name":"shieldemitters", "Name_Localised":"Shield Emitters", "Count":6 }, { "Name":"phasealloys", "Name_Localised":"Phase Alloys", "Count":6 }, { "Name":"focuscrystals", "Name_Localised":"Focus Crystals", "Count":3 }, { "Name":"guardian_powercell", "Name_Localised":"Guardian Power Cell", "Count":48 }, { "Name":"guardian_sentinel_wreckagecomponents", "Name_Localised":"Guardian Wreckage Components", "Count":24 }, { "Name":"guardian_sentinel_weaponparts", "Name_Localised":"Guardian Sentinel Weapon Parts", "Count":30 }, { "Name":"guardian_powerconduit", "Name_Localised":"Guardian Power Conduit", "Count":24 }, { "Name":"guardian_techcomponent", "Name_Localised":"Guardian Technology Component", "Count":12 } ], "Encoded":[ { "Name":"shieldsoakanalysis", "Name_Localised":"Inconsistent Shield Soak Analysis", "Count":45 }, { "Name":"shieldcyclerecordings", "Name_Localised":"Distorted Shield Cycle Recordings", "Count":36 }, { "Name":"bulkscandata", "Name_Localised":"Anomalous Bulk Scan Data", "Count":29 }, { "Name":"shielddensityreports", "Name_Localised":"Untypical Shield Scans ", "Count":45 }, { "Name":"emissiondata", "Name_Localised":"Unexpected Emission Data", "Count":27 }, { "Name":"shieldpatternanalysis", "Name_Localised":"Aberrant Shield Pattern Analysis", "Count":39 }, { "Name":"decodedemissiondata", "Name_Localised":"Decoded Emission Data", "Count":12 }, { "Name":"scandatabanks", "Name_Localised":"Classified Scan Databanks", "Count":12 }, { "Name":"scanarchives", "Name_Localised":"Unidentified Scan Archives", "Count":15 }, { "Name":"encodedscandata", "Name_Localised":"Divergent Scan Data", "Count":3 }, { "Name":"archivedemissiondata", "Name_Localised":"Irregular Emission Data", "Count":3 }, { "Name":"ancientculturaldata", "Name_Localised":"Pattern Beta Obelisk Data", "Count":3 }, { "Name":"ancienthistoricaldata", "Name_Localised":"Pattern Gamma Obelisk Data", "Count":3 }, { "Name":"guardian_vesselblueprint", "Name_Localised":"Guardian Vessel Blueprint Segment", "Count":1 }, { "Name":"guardian_weaponblueprint", "Name_Localised":"Guardian Weapon Blueprint Segment", "Count":2 }, { "Name":"ancientlanguagedata", "Name_Localised":"Pattern Delta Obelisk Data", "Count":3 } ] }
        if (!lodash.isEqual(player.Materials.Manufactured, data.Manufactured) || !lodash.isEqual(player.Materials.Raw, data.Raw) || !lodash.isEqual(player.Materials.Encoded, data.Encoded)) {
            player.Materials.Manufactured = data.Manufactured;
            player.Materials.Raw = data.Raw;
            player.Materials.Encoded = data.Encoded;
            INARAsetMaterials(data.timestamp);
        }
    } else if (data.event == "LoadGame") {
        //{ "timestamp":"2018-09-02T06:47:54Z", "event":"LoadGame", "Commander":"Lobod", "Horizons":false, "Ship":"SideWinder", "ShipID":0, "ShipName":"", "ShipIdent":"", "FuelLevel":0.532232, "FuelCapacity":2.000000, "GameMode":"Open", "Credits":60044, "Loan":0 }
        player.Name = data.Commander;
        ArrayToSend.header.commanderName = data.Commander;
        player.Money = data.Credits;
        player.Loan = data.Loan;
    } else if (data.event == "Rank") {
        //{ "timestamp":"2018-09-02T06:47:54Z", "event":"Rank", "Combat":0, "Trade":1, "Explore":0, "Empire":0, "Federation":0, "CQC":0 }
        if (player.Ranks.Empire != data.Empire) {
            player.Ranks.Empire = data.Empire;
            INARAsetRank("Empire", data.Empire, data.timestamp);
        } else if (player.Ranks.Federation != data.Federation) {
            player.Ranks.Federation = data.Federation;
            INARAsetRank("Federation", data.Federation, data.timestamp);
        } else if (player.Ranks.Combat != data.Combat) {
            player.Ranks.Combat = data.Combat;
            INARAsetRank("Combat", data.Combat, data.timestamp);
        } else if (player.Ranks.Trade != data.Trade) {
            player.Ranks.Trade = data.Trade;
            INARAsetRank("Trade", data.Trade, data.timestamp);
        } else if (player.Ranks.Explore != data.Explore) {
            player.Ranks.Explore = data.Explore;
            INARAsetRank("Explore", data.Explore, data.timestamp);
        } else if (player.Ranks.CQC != data.CQC) {
            player.Ranks.CQC = data.CQC
            INARAsetRank("CQC", data.CQC, data.timestamp);
        }
    } else if (data.event == "Progress") {

    } else if (data.event == "Reputation") {
        //{ "timestamp":"2018-11-02T19:56:37Z", "event":"Reputation", "Empire":97.420700, "Federation":76.843697, "Alliance":70.090797 }
        if (data.Empire) setReputation("Empire",parseFloat(data.Empire/100).toFixed(2),data.timestamp);
        else if (data.Federation) setReputation("Federation",parseFloat(data.Federation/100).toFixed(2),data.timestamp);
        else if (data.Alliance) setReputation("Alliance",parseFloat(data.Alliance/100).toFixed(2),data.timestamp);
    } else if (data.event == "Loadout") {} else if (data.event == "Missions") {} else if (data.event == "Cargo") {} else if (data.event == "Statistics") {} else if (data.event == "ReceiveText") {} else if (data.event == "DockingDenied") {} else if (data.event == "DockingRequested") {} else if (data.event == "DockingGranted") {} else if (data.event == "Promotion") {
        if (data.Empire) {
            player.Ranks.Empire = data.Empire;
            INARAsetRank("Empire", data.Empire, data.timestamp);
        } else if (data.Federation) {
            player.Ranks.Federation = data.Federation;
            INARAsetRank("Federation", data.Federation, data.timestamp);
        } else if (data.Combat) {
            player.Ranks.Combat = data.Combat;
            INARAsetRank("Combat", data.Combat, data.timestamp);
        } else if (data.Trade) {
            player.Ranks.Trade = data.Trade;
            INARAsetRank("Trade", data.Trade, data.timestamp);
        } else if (data.Explore) {
            player.Ranks.Explore = data.Explore;
            INARAsetRank("Explore", data.Explore, data.timestamp);
        } else if (data.CQC) {
            player.Ranks.CQC = data.CQC;
            INARAsetRank("CQC", data.CQC, data.timestamp);
        }
    }
}

function addMission(data) {
    //{ "timestamp":"2018-09-02T07:21:14Z", "event":"MissionAccepted", "Faction":"Brotherhood of the Dragon", "Name":"Mission_Courier_Elections", "LocalisedName":"Courier required for sensitive poll data", "TargetFaction":"BD+01 3657 Domain", "DestinationSystem":"GD 215", "DestinationStation":"Faraday Orbital", "Expiry":"2018-09-03T07:18:24Z", "Wing":false, "Influence":"Med", "Reputation":"Med", "Reward":96218, "MissionID":415668897 }
}

function INARAsetRank(name, rank, timestamp) {
    ArrayToSend.events.push({
        "eventName": "setCommanderRankPilot",
        "eventTimestamp": timestamp,
        "eventData": {
            "rankName": name,
            "rankValue": rank
        }
    });
}

function addPermit(starsystemName, timestamp) {
    ArrayToSend.events.push({
        "eventName": "addCommanderPermit",
        "eventTimestamp": timestamp,
        "eventData": {
            "starsystemName": starsystemName
        }
    });
}
function setReputation(force , rep, timestamp){
    ArrayToSend.events.push({
        "eventName": "setCommanderReputationMajorFaction",
        "eventTimestamp": timestamp,
        "eventData": {
            "majorfactionName": force,
            "majorfactionReputation": rep
        }
     });
}
function INARAsetMaterials(timestamp) {
        var temp = [];
        for (var i = 0; i < player.Materials.Raw.length; i++) {
            temp.push({
                "itemName": player.Materials.Raw[i].Name,
                "itemCount": player.Materials.Raw[i].Count
            });
        }
        for (var i = 0; i < player.Materials.Manufactured.length; i++) {
            temp.push({
                "itemName": player.Materials.Manufactured[i].Name,
                "itemCount": player.Materials.Manufactured[i].Count
            });
        }
        for (var i = 0; i < player.Materials.Encoded.length; i++) {
            temp.push({
                "itemName": player.Materials.Encoded[i].Name,
                "itemCount": player.Materials.Encoded[i].Count
            });
        }
        ArrayToSend.events.push({
            "eventName": "setCommanderInventoryMaterials",
            "eventTimestamp": timestamp,
            "eventData": temp
        });
}
function INARAcheckTime(time){
    var tempdate = new Date(time);
    var today = new Date();
    var timeDiff = Math.abs(today.getTime() - tempdate.getTime());
    var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if(dayDifference < 30) return true;
    else return false;
}
function getLinesCount() {
    data = fs.readFileSync(fn);
    data2 = data.toString('utf8').split("\r\n");
    return data2.length;
}

function INARAgetNewestFiles(files, path) {
    var out = [];
    files.forEach(function (file) {
        var stats = fs.statSync(path + "/" + file);
        if (stats.isFile() && file.indexOf(".log") != -1) {
            out.push(file);
        }
    });
    out.sort(function (a, b) {
        return b.split(".")[1] - a.split(".")[1];
    })
    return (out.length > 0) ? out : "";
}
function INARAmainLoop(){
if (fs.existsSync("KF.txt")) {
    data = fs.readFileSync("KF.txt");
    KnownFiles = data.toString('utf8').split("\r\n");
}
ArrayToSend = template;
var parsing = 0;
var FilePath = 'C:\\Users\\' + os.userInfo().username + '\\Saved Games\\Frontier Developments\\Elite Dangerous';
var files = fs.readdirSync(FilePath);
var flist = INARAgetNewestFiles(files, FilePath);
fn = FilePath + "\\" + flist[0];
for (var f = flist.length - 1; f >= 0; f--) {
    if (KnownFiles.indexOf(flist[f]) == -1||(f == 0 && getLinesCount() > fcache)) {
        data = fs.readFileSync(FilePath + "\\" + flist[f]);
        data2 = data.toString('utf8').split("\r\n");
        for (var i = 1; i < data2.length - 1; i++) {
            INARAparser(JSON.parse(data2[i]));
        }
        KnownFiles.push(flist[f]);
    }
    fcache = getLinesCount();
    parsing++;
    if (flist.length == parsing) {
        if (fs.existsSync("KF.txt")) {
            data = fs.readFileSync("KF.txt");
            KnownFiles1 = data.toString('utf8').split("\r\n");
            if (KnownFiles1 != KnownFiles) fs.writeFileSync("KF.txt", KnownFiles.join("\r\n"));
        } else fs.writeFileSync("KF.txt", KnownFiles.join("\r\n"));
        makeRequest(ArrayToSend);
    }
}
}
function INARAcheckrequest(array){
    var temp =[];
    for(var i =0;i<array.length;i++){
        if(INARAcheckTime(array[i].eventTimestamp)) temp.push(array[i]);
    }
    return temp;
}

function INARAlogdata(data){
    console.log("[INARA]: "+Number(data.events.length+1)+" events sent to INARA");
}

function makeRequest(ArrayToSend) {
    ArrayToSend.header.commanderName = "EDMHTest";
    ArrayToSend.events=INARAcheckrequest(ArrayToSend.events);
    if (ArrayToSend.events.length > 0) {
        INARAlogdata(ArrayToSend);
        fs.writeFileSync("data.log",JSON.stringify(ArrayToSend));
        var request = require("request");
        request.post("https://inara.cz/inapi/v1/", {
            form: JSON.stringify(ArrayToSend)
        }, function (err, httpResponse, body) {
            console.log(body);
        });
    }
}
INARAmainLoop()
setInterval(() => {
    INARAmainLoop();
}, 600000);