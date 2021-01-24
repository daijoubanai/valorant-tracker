// script

let isVis = 0;

var top = document.getElementById('topLayer');
var js_panel_trigger = document.getElementById('js-trigger');

// toggle panel visibility
function changeVis() 
{
    console.log("changeVis");
    if (isVis == 0)
    {
        document.getElementById("topLayer").style.visibility = "hidden";
        isVis = 1;
        console.log(isVis);
    }
    else if (isVis ==1)
    {
        document.getElementById("topLayer").style.visibility = "visible";
        isVis = 0;
        console.log(isVis);
    }
}

// popup window for adding data
function popup()
{
    console.log("popup")
    var popup = document.getElementById('dataPopup');
    console.log(popup.style.display)
    if (popup.style.display == "none")
    {
        popup.style.display = "block";
    }
    else
    {
        popup.style.display = "none";
    }
}


// add data to db
function submitData()
{
    console.log("data");

    var gameType = document.getElementById("gameType").value
    var result = document.getElementById("result").value
    var map = document.getElementById("map").value
    var agent = document.getElementById("agent").value
    var hs = document.getElementById("hs").value
    var adr = document.getElementById("adr").value
    var combatScore = document.getElementById("combatScore").value

    var gameData = {
        gameType: gameType,
        result: result,
        map: map,
        agent: agent,
        hs: hs,
        adr: adr,
        combatScore: combatScore
    };

    //post
    fetch('/getData', 
    {
        //declare type of data
        headers: {
            'Content-Type': 'application/json'
        },
        //specify method
        method: 'POST',
        //json payload
        body: JSON.stringify({
            gameData
        })

    })
    .then(function (response) { //flask has printed json
        if (response.status !== 200) {
            console.log("looks like there was a problem: ${response.status}")
            return;
        }
        response.json().then(function(data) {
            console.log("response function");
            console.log(data);

        });
    })
    .catch(function(error) {
        console.log("fetch error: " + error);
    });
}

// get data from db
function returnData() 
{

    mode = 'competitive';

    fetch('/returnData', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            mode
        })
    })
    .then(function (response) {
        response.json().then(function(data) {
            console.log(data);
            panelText.append(data);
        })
    })
    .catch(function(error) {
        console.log("fetch error: " + error)
    })

    var panelText = document.getElementById('topText');
    //panelText.append(queryData.initial);
}

//initial data load
function initialData()
{
    var info = 'competitive';
    fetch('summaryData', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            info
        })
    })
    .then(function (response) {
        response.json().then(function(info) {
            console.log(info);
        })
    })
    .catch(function(error) {
        console.log("fetch error: " + error)
    })

    //var panelText = document.getElementById('topText');
    //panelText.innerHTML = "initial";
}

/*
window.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('topText').addEventListener("change", initialData);
});
*/


document.getElementById("js-trigger").onclick = changeVis;
document.getElementById("insert-data-popup").onclick = popup;
document.getElementById("submit-data").onclick = submitData;
document.getElementById("get-from-db").onclick = returnData;
document.getElementById("get-wr").onclick = initialData;
