// naam: Nikki Bruls

window.addEventListener("load", handleWindowload);

function handleWindowload() {
    createSelect();
    let getShipsButton = document.getElementById("get_ships");
    getShipsButton.addEventListener("click", handleGetShips);
}

function createSelect() {
    let url = 'http://localhost:3000/country/';
    let selectDiv = document.getElementById("div_select");
    let selectCountry = document.createElement("select");
    selectCountry.id = "select_country";
    let output = document.getElementById("div_output");
    makeElementEmpty(output);
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .then((countries) => {
            for (let country of countries) {
                let option = document.createElement("option");
                let name = document.createTextNode(country.name);
                option.value = country.id;
                option.appendChild(name);
                selectCountry.appendChild(option)
            }
            selectDiv.appendChild(selectCountry);
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}

function handleGetShips() {
    let url = 'http://localhost:3000/ship/';
    let countryId = document.getElementById("select_country").value;
    let output = document.getElementById("div_output");
    makeElementEmpty(output);
    fetch(`${url}?country_id=${countryId}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .then((ships) => {
            let shipList = document.createElement("ul");
            let data = [];
            let fastestSpeed = 0;
            let fastestShip = [];
            for (let ship of ships) {
                data.push([ship.id, ship.name]);
                if (ship.speed >= fastestSpeed) {
                    fastestSpeed = ship.speed;
                    fastestShip.push(ship.id);
                }
            }
            for (let i = 0; i < data.length; i++) {
                let id = data[i][0];
                let naam = data[i][1];
                let shipListItem = document.createElement("li");
                shipListItem.appendChild(document.createTextNode(`${id}, ${naam}`));
                if (fastestShip.includes(id)){
                    shipListItem.style.color = "red";
                }
                shipList.appendChild(shipListItem);
            }
            output.appendChild(shipList);
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}

function makeElementEmpty(element) {
    while (element.hasChildNodes()){
        element.removeChild(element.firstChild);
    }
}
