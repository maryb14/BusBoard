function clickFunction(){
    var postcode = document.getElementById('postcode').value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/closestStops?postcode=" + postcode, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    document.getElementById("display").innerHTML = xhttp.responseText
}