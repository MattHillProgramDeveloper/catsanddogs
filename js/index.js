
//public access key for unsplash
const pubKey = "b1932e62b44bf6eeec26b0234b0d535518f6a9c6b8aa2458833812514bc01439";
let logo = document.querySelector("#logo");

 let object ="";   
    $.ajax({
        url:'http://api.petfinder.com/pet.find?format=json&key=b66b2fbbdcd11172493ed5c9c4a89365&animal=dog&location=30809',
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        success:function(json){
            // do stuff with json (in this case an array)
            console.log(json);
            object = json.petfinder.pets.pet;
            displayResults(json.petfinder.pets.pet);
        },
        //Need to put better error messages in here later #cont
        error:function(){
            alert("Error");
        }      
   });

    

function displayResults(resultsArray){
    //loop through the list of kitties making a figure for each one
        let catGrid = "";
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

        catGrid += '<article class="item">';
        catGrid += '<div class="pictureframe">'
        catGrid += '<img src="' + smallURL +'" srcset="'+smallURL+' 600w, '+mediumURL+' 1200w, '+largeURL+' 3240w" alt="' + description + '"/>';
        catGrid += '</div>';
        catGrid += '<div class="slideinfo">';
        //Just here to make testing the alt information easier.
        catGrid += '<p class="name">'+description+'</p>';        
        catGrid += '<p class="name">'+petname+'</p>';
        catGrid += '<p class="location">'+cityLocation+', '+stateLocation+'</p>';

        catGrid += "</div></article>";
    }
    wrapper.innerHTML=catGrid;
    
}




console.log("index.js loaded")