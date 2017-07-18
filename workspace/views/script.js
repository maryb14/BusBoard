function clickFunction(){
    var postcode = document.getElementById('postcode').value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/closestStops?postcode=" + postcode, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    deleteTables();
    try {
        var response = JSON.parse(xhttp.responseText);
        document.getElementById("firstBusStopName").innerHTML = response[0].busStopName;
        document.getElementById("secondBusStopName").innerHTML = response[1].busStopName;
        changeTable("firstBusStop",0,response);
        changeTable("secondBusStop",1,response);
    }
    catch (error) {
        document.getElementById("error").innerHTML = xhttp.responseText;
    }
}

function deleteTables(){
    while (document.getElementById("firstBusStop").rows.length > 0) {
        document.getElementById("firstBusStop").deleteRow(0)
    }
    while (document.getElementById("secondBusStop").rows.length > 0) {
        document.getElementById("secondBusStop").deleteRow(0)
    }
    document.getElementById("firstBusStopName").innerHTML = "";
    document.getElementById("secondBusStopName").innerHTML = "";
}

function changeTable(tableName, responseIndex, response){
    var tableRow = document.createElement("tr");
    var lineData = document.createElement("td");
    lineData.setAttribute("class", "header");
    var destinationData = document.createElement("td");
    destinationData.setAttribute("class", "header");
    var timeToArrival = document.createElement("td");
    timeToArrival.setAttribute("class", "header");
    lineData.innerHTML = "Line";
    destinationData.innerHTML = "Destination";
    timeToArrival.innerHTML = "Time to arrival"
    tableRow.appendChild(lineData);
    tableRow.appendChild(destinationData);
    tableRow.appendChild(timeToArrival);
    document.getElementById(tableName).appendChild(tableRow);
    for(var i = 0; i < 5 && i < response[responseIndex].busesArray.length;++i){
        var tableRow = document.createElement("tr");
        var lineData = document.createElement("td");
        var destinationData = document.createElement("td");
        var timeToArrival = document.createElement("td");
        lineData.innerHTML = response[responseIndex].busesArray[i].line;
        destinationData.innerHTML = response[responseIndex].busesArray[i].destination;
        var timeToArrivalNumber = Number(response[responseIndex].busesArray[i].timeToArrival);
        var zeroToAppend = "";
        if(timeToArrivalNumber % 60 < 10) {
            zeroToAppend = "0";
        }
        var timeToArrivalString = String(Math.floor(timeToArrivalNumber/60)) + ":" + zeroToAppend + String(timeToArrivalNumber%60)
        timeToArrival.innerHTML = timeToArrivalString;
        tableRow.appendChild(lineData);
        tableRow.appendChild(destinationData);
        tableRow.appendChild(timeToArrival);
        document.getElementById(tableName).appendChild(tableRow);    
    }
}