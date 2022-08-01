// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `;
}

function validateInput(testInput) {
    if (testInput === '') {
        return 'Empty';
    } else if (!isNaN(parseInt(testInput))) {
        return 'Is a Number';
    } else if (isNaN(testInput)) {
        return 'Not a Number';
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {

    // let submission = {
    //     empty: false,
    //     invalid: false,
    // }

    if (
        validateInput(pilot.value) === 'Empty' ||
        validateInput(copilot.value) === 'Empty' ||
        validateInput(fuelLevel.value) === 'Empty' ||
        validateInput(cargoMass.value) === 'Empty'
    ) {
        alert('All fields are requied!');
        // submission.empty = true;
        // return submission;
    }
        
    if (
        validateInput(pilot.value) === 'Is a Number' ||
        validateInput(copilot.value) === 'Is a Number' ||
        validateInput(fuelLevel.value) === 'Not a Number' ||
        validateInput(cargoMass.value) === 'Not a Number'
    ) {
        alert('Make sure to enter valid information for each field!');
        // submission.invalid = true; 
        // return submission;
    }

    let faultyItems = document.getElementById('faultyItems');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');

    if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
        launchStatus.innerHTML = 'Shuttle is ready for launch.';
        launchStatus.style.color = 'green';
        faultyItems.style.visibility = 'hidden';
    };
    if (fuelLevel.value < 10000 && cargoMass.value <= 10000) {
        faultyItems.style.visibility = 'visible';
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        launchStatus.style.color = 'red';
        fuelStatus.innerHTML = 'Fuel level too low for launch.';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch.';
        pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch.`;
        copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch.`;
    };
    if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
        faultyItems.style.visibility = 'visible';
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        launchStatus.style.color = 'red';
        fuelStatus.innerHTML = 'Fuel level too low for launch.';
        cargoStatus.innerHTML = 'Cargo mass too high for launch.';
        pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch.`;
        copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch.`;
    };
    if (fuelLevel.value >= 10000 && cargoMass.value > 10000) {
        faultyItems.style.visibility = 'visible';
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        launchStatus.style.color = 'red';
        fuelStatus.innerHTML = 'Fuel level high enough for launch.';
        cargoStatus.innerHTML = 'Cargo mass too high for launch.';
        pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch.`;
        copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch.`;
    };

};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json()
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
