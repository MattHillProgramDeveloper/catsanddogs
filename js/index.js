//needed elements
const elsubmit = document.querySelector("#submit");
const elresultsheader = document.querySelector(".resultsheader");
const elcatradbtn = document.querySelector("#cat");
const eldogradbtn = document.querySelector("#dog");
const elbirdradbtn = document.querySelector("#bird");
const elotherradbtn = document.querySelector("#other");
const elbarnyardradbtn = document.querySelector("#barnyard");
const elreptileradbtn = document.querySelector("#reptile");
const elsmallfurryradbtn = document.querySelector("#smallfurry");
const elhorseradbtn = document.querySelector("#horse");
const elzipcode = document.querySelector("#zipcode");

 let object =""; 

 function findPets(petType, zipCode){
 
    $.ajax({
        url:'http://api.petfinder.com/pet.find?format=json&key=b66b2fbbdcd11172493ed5c9c4a89365&animal='+petType+'&location='+zipCode,
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        success:function(json){
            // do stuff with json (in this case an array)
            console.log(json);
            object = json.petfinder.pets.pet;
            displayResults(json.petfinder.pets.pet,petType,zipCode);
        },
        //Need to put better error messages in here later #cont
        //Come back and check invalid geographic location at header.status.message
        error:function(){
            alert("Error");
        }      
   });
}

function displayResults(resultsArray,petType,zipCode){
    //update search results header
    elresultsheader.innerHTML = petType.toUpperCase()+'S NEAR '+zipCode;



    //loop through the list of pets making a figure for each one
        let petGrid = "";
        let wrapper = document.querySelector('.results');
    for (let i = 0; i < resultsArray.length; i++){
        console.log(i);

        let smallURL = "images/missing.jpg";
        let mediumURL = "images/missing.jpg";
        let largeURL = "images/missing.jpg";
        let largestURL = "images/missing.jpg";
        console.log(resultsArray[i].media.hasOwnProperty('photos'));
        if(resultsArray[i].media.hasOwnProperty('photos')){
            smallURL = resultsArray[i].media.photos.photo[0]["$t"];
            mediumURL = resultsArray[i].media.photos.photo[1]["$t"];
            largeURL = resultsArray[i].media.photos.photo[3]["$t"];
            largestURL = resultsArray[i].media.photos.photo[2]["$t"];
        }

        let petname = resultsArray[i].name["$t"];
        let cityLocation = resultsArray[i].contact.city["$t"];
        let stateLocation = resultsArray[i].contact.state["$t"];
        let age = resultsArray[i].age["$t"];
        let sizeCode = resultsArray[i].size["$t"];
        let size = "" ;
        let breed = resultsArray[i].breeds.breed["$t"];
        let sexCode = resultsArray[i].sex["$t"];
        let sex = "";

        if (sizeCode === "S"){
            size = "Small";
        };
        if (sizeCode === "M"){
            size = "Medium";
        };        if (sizeCode === "S"){
            size = "Large";
        };

        if(sexCode === "F"){
            sex = "Female"
        }
        if(sexCode === "M"){
            sex = "Male"
        }
        

        let description = size +' '+age+' '+sex+' '+breed;

        petGrid += '<article class="item">';
        petGrid += '<div class="pictureframe">'
        petGrid += '<img src="' + smallURL +'" srcset="'+smallURL+' 600w, '+mediumURL+' 1200w, '+largeURL+' 3240w" alt="' + description + '"/>';
        petGrid += '</div>';
        petGrid += '<div class="slideinfo">';
        //Just here to make testing the alt information easier.
        //petGrid += '<p class="name">'+description+'</p>';        
        petGrid += '<p class="name">'+petname+'</p>';
        petGrid += '<p class="location">'+cityLocation+', '+stateLocation+'</p>';

        petGrid += "</div></article>";
    }
    wrapper.innerHTML=petGrid;
    
}

function removeErrors() {
    let allErrors = document.getElementsByClassName("error");
    while (allErrors[0]) {
        allErrors[0].parentElement.removeChild(allErrors[0]);
    }
}

class Validator {
    constructor(input, type) {
        this.input = input;
        this.type = type;
        this.errors = [];
    }

    addError(message) {
        this.errors.push(message);
    }

    getMessages() {
        const status = this.input.validity;
        const fieldValue = this.input.value;

        if (status.patternMismatch && this.type === "zip") {
            this.addError("Please use your 5 digit zip code");
        }

        return this.errors;
    }
}


elsubmit.addEventListener("click", (event) => {

    //reset error count and displays
    let errorcount = 0;
    event.preventDefault();
    removeErrors();





    //check zip
    let validateZip = new Validator(elzipcode, "zip");
    let zipErrors = validateZip.getMessages();

    if (zipErrors.length > 0) {
        errorcount++;
        zipErrors.forEach((err) => {
            elzipcode.insertAdjacentHTML('afterend', "<p class='error'>" + err + "</p>")
        })
    }
    if(errorcount === 0){
        //determine the value of the type of pet searched for
        let petType = "cat"; //Cat is the default

        if(elcatradbtn.checked){
            petType = elcatradbtn.value;
        }
        if(eldogradbtn.checked){
            petType = eldogradbtn.value;
        }
        if(elbirdradbtn.checked){
            petType = elbirdradbtn.value;
        }
        if(elbarnyardradbtn.checked){
            petType = elbarnyardradbtn.value;
        }
        if(elreptileradbtn.checked){
            petType = elreptileradbtn.value;
        }
        if(elsmallfurryradbtn.checked){
            petType = elsmallfurryradbtn.value;
        }
        if(elhorseradbtn.checked){
            petType = elhorseradbtn.value;
        }

        //store the zipcode
        let zipCode = elzipcode.value;
        //pass both arguments to the find pets function
        findPets(petType, zipCode);

    }
});


console.log("index.js loaded")