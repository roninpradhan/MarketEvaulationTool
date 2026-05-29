const calculateButton = document.querySelector("#calculateButton");

// MAX VALUES FOR LATEST MODELS ---------------------------------------

let estimatedValue = 0;

let ninja300Base = 4500
let ninja400Base = 8000;
let ninja500Base = 10412;
let ninja650Base = 13553;
let yamahaR3Base = 9500;
let yamahaR7Base = 16000;
let cbr500rBase = 10222;
let cbr650Base = 14445;
let cfmoto450srBase = 9590;
let cfmoto675srrBase = 11790;


// WEBSITE ERROR ALERTS ---------------------------------------

calculateButton.addEventListener("click", function () {
    const selectedCondition = document.querySelector('input[name="cosmetic"]:checked');
    const selectedManufacturer = document.querySelector("#brand").value;
    const selectedModel = document.querySelector("#model").value;
    const selectedYear = document.querySelector("#year").value;
    const selectedMileage = document.querySelector("#mileage").value.trim();
    const selectedRestriction = document.querySelector("#derestriction").value;
    const selectedMinorModificationValue = document.querySelector("#extraMods").value.trim();

    const givenMileage = Number(selectedMileage);
    const givenMinorModificationValue = Number(selectedMinorModificationValue);

    if(selectedModel === "YZF-R7LA" || selectedModel === "CBR650R") {
        if(!selectedRestriction) {
            alert("Please select a restriction option.");
            return;
        }
    }
    
    if (!selectedManufacturer) {
        alert("Please select a manufacturer.");
        return;
    }

    if(!selectedModel) {
        alert("Please select a model.");
        return;
    }

    if(!selectedYear) {
        alert("Please select a year.");
        return;
    }

    if(!selectedMileage) {
        alert("Please enter the mileage.");
        return;
    }

    if(!Number.isFinite(givenMileage)) {
        alert("Give the mileage in numeric value.");
        return;
    }

    if(!Number.isFinite(givenMinorModificationValue)) {
        alert("Give the minor modification estimation in numeric value")
        return;
    }

    if (!selectedCondition) {
        alert("Please Select a Cosmetic Condition.");
        return;
    }

    if (hasAftermarketExhaust() && !getExhaustType()) {
    alert("Please select an exhaust type.");
    return;
    }

    if (hasRemainingRegistration() && !getRemainingRegistration()) {
    alert("Please select the remaining registration duration.");
    return;
    }

    calculateEstimatedValue();
    document.querySelector("#estimationDisplay").textContent = "$" + estimatedValue;

});


// HELPER FUNCTIONS ---------------------------------------

// Helper functions for the type of exhaust system (slipon or full system)

function hasAftermarketExhaust() {
    return document.querySelector("#aftermarketExhaust").checked;
}

function getExhaustType() {
    return document.querySelector("#exhaustType").value;
}

function hasSlipOnExhaust() {
    return hasAftermarketExhaust() && getExhaustType() === "slipOn";
}

function hasFullSystemExhaust() {
    return hasAftermarketExhaust() && getExhaustType() === "fullSystem";
}

// Helper functions for remaining registration
function hasRemainingRegistration() {
    return document.querySelector("#regoRemaining").checked;
}

function getRemainingRegistration() {
    return document.querySelector("#rego").value;
}

function hasThreeMonthsRego() {
    return hasRemainingRegistration() && getRemainingRegistration() === "threeMonths";
}

function hasSixMonthsRego() {
    return hasRemainingRegistration() && getRemainingRegistration() === "sixMonths";
}

function hasNineMonthsRego() {
    return hasRemainingRegistration() && getRemainingRegistration() === "nineMonths";
}

function hasTwelveMonthsRego() {
    return hasRemainingRegistration() && getRemainingRegistration() === "twelveMonths";
}


// Single select helper functions

function hasTwoKeys() {
    const twoKeysCheckbox = document.querySelector("#twoKeys");
    return twoKeysCheckbox.checked;
}

function hasServiceLogbook() {
    const serviceLogbookCheckbox = document.querySelector("#logbook");
    return serviceLogbookCheckbox.checked;
}

function hasClearRegistrationConcession() {
    const clearRegistrationCheckbox = document.querySelector("#registrationConcession");
    return clearRegistrationCheckbox.checked;
}

function bikeAge() {
    const selectedModel = document.querySelector("#model").value;
    const selectedYear = document.querySelector("#year").value;

    const latestModelYears = {
    "Ninja 300": 2023,
    "Ninja 400": 2024,
    "Ninja 500": 2026,
    "Ninja 650": 2026,
    "YZF-R3": 2026,
    "YZF-R7LA": 2026,
    "CBR500R": 2026,
    "CBR650R": 2026,
    "450SR": 2026,
    "675SR-R": 2026
    };

    const latestYear = latestModelYears[selectedModel];
    const selectedYearNumber = Number(selectedYear);

    return latestYear - selectedYearNumber;
}

function bikeMileage() {
    const selectedMileage = document.querySelector("#mileage").value.trim();
    const givenMileage = Number(selectedMileage);

    if(givenMileage <= 5000){
        return 0.05
    } else if (givenMileage <= 10000){
        return 0.1
    } else if (givenMileage <= 15000){
        return 0.10
    } else if (givenMileage <= 20000){
        return 0.15
    } else if (givenMileage <= 25000){
        return 0.25
    } else if (givenMileage <= 30000){
        return 0.3
    } 

    return 0.45 
}

// Main estimation calculation
function calculateEstimatedValue() {
    const selectedCondition = document.querySelector('input[name="cosmetic"]:checked').value;
    const selectedModel = document.querySelector("#model").value;
    const selectedMinorModificationValue = document.querySelector("#extraMods").value.trim();
    const givenMinorModificationValue = Number(selectedMinorModificationValue);
    const selectedRestriction = document.querySelector("#derestriction").value;
    const selectedYear = document.querySelector("#year").value;
    const selectedMileage = document.querySelector("#mileage").value.trim();

    const modelBasePrices = {
    "Ninja 300": ninja300Base,
    "Ninja 400": ninja400Base,
    "Ninja 500": ninja500Base,
    "Ninja 650": ninja650Base,
    "YZF-R3": yamahaR3Base,
    "YZF-R7LA": yamahaR7Base,
    "CBR500R": cbr500rBase,
    "CBR650R": cbr650Base,
    "450SR": cfmoto450srBase,
    "675SR-R": cfmoto675srrBase
    };   

    estimatedValue = modelBasePrices[selectedModel];

    if(selectedMileage){
        estimatedValue -= estimatedValue * (bikeMileage())
    }

    if(selectedYear){
        estimatedValue -= estimatedValue * (bikeAge() * 0.02)
    }

    if(selectedRestriction === "yes"){
        estimatedValue += 1200
    }

    if(selectedCondition === "good"){
        estimatedValue = (estimatedValue * 0.9)
    } else if (selectedCondition === "fair") {
        estimatedValue = (estimatedValue * 0.8)
    } else if (selectedCondition === "rough") {
        estimatedValue = (estimatedValue * 0.7)
    } else if (selectedCondition === "projectPoor") {
        estimatedValue = (estimatedValue * 0.55)
    }

    // A slipon adds $100 while a full system adds $500
    if(hasAftermarketExhaust()){
        if(hasSlipOnExhaust()){
            estimatedValue += 100;
        } else {
            estimatedValue += 500;
        }
    }
    
    // If it has rego add value, if not loses
    if(!hasRemainingRegistration()){
        estimatedValue -= 700
    } else {
        if(hasThreeMonthsRego()){
            estimatedValue += 103;

        } else if (hasSixMonthsRego()) {
            estimatedValue += 206;

        } else if (hasNineMonthsRego()) {
            estimatedValue += 300;

        } else {
            estimatedValue += 300;
        }
    }

    // If it has two keys add $50 of value
    if(hasTwoKeys()){
        estimatedValue += 50;
    }

    // Extra modifications only retain about 35% of face value
    if (givenMinorModificationValue) {
        estimatedValue += (givenMinorModificationValue * 0.35)
    }

    // If it has a recorded registration concession it can half the overall value
    if(!hasClearRegistrationConcession()){
        estimatedValue = estimatedValue / 2
    }

    return estimatedValue;
}
