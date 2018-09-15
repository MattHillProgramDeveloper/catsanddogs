//needed elements
const elresultsheader = document.querySelector(".resultsheader");
const elsubmit = document.querySelector("#submit");
const elzipcode = document.querySelector("#zipcode");


 let object =""; 

 function findShelters(zipCode){
 
    $.ajax({
        url:'http://api.petfinder.com/shelter.find?format=json&key=b66b2fbbdcd11172493ed5c9c4a89365&location='+zipCode,
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        success:function(json){
            // do stuff with json (in this case an array)
            console.log(json);
            object = json.petfinder.shelters.shelter;
            displayResults(json.petfinder.shelters.shelter,"Shelter",zipCode);
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
        let shelterList = '<table><tr><th>Organization</th><th>Location</th><th>Phone</th><th>Email</th></tr>';
        let wrapper = document.querySelector('.results');
    for (let i = 0; i < resultsArray.length; i++){
        console.log(i);

        //get name
        let sheltername = resultsArray[i].name["$t"];

        //address algs
        let cityLocation = resultsArray[i].city["$t"];
        let stateLocation = resultsArray[i].state["$t"];
        let zipLocation = resultsArray[i].zip["$t"];
        let streetAddress;

        if(resultsArray[i].address1.hasOwnProperty('$t')){
            streetAddress = resultsArray[i].address1["$t"]+', ';
            console.log("address1");
        }else if(resultsArray[i].address2.hasOwnProperty('$t')){
            streetAddress = resultsArray[i].address2["$t"]+', ';
            console.log("address2");
        }else{
            streetAddress = "";
        }

        let fullAddress = streetAddress+cityLocation+', '+stateLocation+' '+zipLocation;

        //contact algs
        let email= "";
        let phone = "";

        if(resultsArray[i].email.hasOwnProperty('$t')){
            email = resultsArray[i].email["$t"];
        }
        if(resultsArray[i].phone.hasOwnProperty('$t')){
            phone = resultsArray[i].phone["$t"];
        }


        shelterList += '<tr>';
        shelterList += '<td>'+sheltername+'</td>';
        shelterList += '<td>'+fullAddress+'</td>';
        shelterList += '<td>'+phone+'</td>';
        shelterList += '<td>'+email+'</td>';
        shelterList += '</tr>';
    }
    shelterList += '</table>';
    wrapper.innerHTML=shelterList;
    
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
            this.addError(" Please use your 5 digit zip code ");
        }

        return this.errors;
    }
}


function submitSearch(){

    //reset error count and displays
    let errorcount = 0;
    event.preventDefault();
    removeErrors();

    
//check zip
    let validateZip = new Validator(elzipcode, "zip");
    //store the zipcode
    let zipCode = elzipcode.value;
     
    let zipErrors = validateZip.getMessages();

    if (zipErrors.length > 0) {
        errorcount++;
        zipErrors.forEach((err) => {
            elzipcode.insertAdjacentHTML('afterend', "<p class='error'>" + err + "</p>")
        })
    }
    if(errorcount === 0){
        //pass both arguments to the find pets function
        findShelters(zipCode);

    }
}

//This is the default NYC Shelter search that runs when the page loads. Ideally I'll patch this into an api that checks zip codes based on IP address.
    $.ajax({
        url:'http://api.petfinder.com/shelter.find?format=json&key=b66b2fbbdcd11172493ed5c9c4a89365&location=10001',
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        success:function(json){
            // do stuff with json (in this case an array)
            console.log(json);
            object = json.petfinder.shelters.shelter;
            displayResults(json.petfinder.shelters.shelter,"Shelter",10001);
        },
        //Need to put better error messages in here later #cont
        //Come back and check invalid geographic location at header.status.message
        error:function(){
            alert("Error");
        }      
   });


   elsubmit.addEventListener('click', function(){
    submitSearch();
});

console.log("index.js loaded")