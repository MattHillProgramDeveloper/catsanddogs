
//public access key for unsplash
const pubKey = "b1932e62b44bf6eeec26b0234b0d535518f6a9c6b8aa2458833812514bc01439";
let logo = document.querySelector("#logo");

// function runXHR(){
//         // Create an AJAX or Fetch request that writes
//         // data to the #results section
//         let xhr = new XMLHttpRequest();

//         xhr.open('GET', 'https://api.unsplash.com/search/photos?client_id=b1932e62b44bf6eeec26b0234b0d535518f6a9c6b8aa2458833812514bc01439&page=1&per_page=9&query=cat', true);
//         xhr.send(null);
//         //onload  fires once the server has responded to the request
//         xhr.onload = function () {
//             if (xhr.status === 200) {
//                 console.log("we see the server");
//                 let responseObject = JSON.parse(xhr.responseText);
//                 console.log(responseObject);
//                 if (responseObject.total === 0) {
//                     alert("Something is wrong!<br>The database found no kitties! :(")
//                 }
//                 else {
//                     displayResults(responseObject.results);
//                 }
//             }
//         };
//     }

    function runXHR(){
        // Create an AJAX or Fetch request that writes
        // data to the #results section
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://api.petfinder.com/pet.find?format=json&key=b66b2fbbdcd11172493ed5c9c4a89365&callback='+Date.now()+'&animal=bird&location=30809', true);
        xhr.send(null);
        //onload  fires once the server has responded to the request
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("we see the server");
                let responseObject = JSON.parse(xhr.responseText);
                console.log(responseObject);
                if (responseObject.total === 0) {
                    alert("Something is wrong!<br>The database found no kitties! :(")
                }
                else {
                    displayResults(responseObject.petfinder.pet);
                }
            }
        };
    }

function displayResults(resultsArray){
    //loop through the list of kitties making a figure for each one
        let catGrid = "";
        let wrapper = document.querySelector('.results');
    for (let i = 0; i < resultsArray.length; i++){

        let smallURL = resultsArray[i].media.photos.photo[0].$t;
        let mediumURL = resultsArray[i].media.photos.photo[1].$t;
        let largeURL = resultsArray[i].media.photos.photo[3].$t;
        let largestURL = resultsArray[i].media.photos.photo[2].$t;

        let petname = resultsArray[i].petname.$t;
        let cityLocation = resultsArray[i].contact.city.$t;
        let stateLocation = resultsArray[i].contact.state.$t;
        let age = resultsArray[i].age.$t;
        let sizeCode = resultsArray[i].size.$t;
        let size = "" ;
        let breed = resultsArray[i].breed.$t;
        let sexCode = resultsArray[i].sex.$t;
        let sex = "";

        if (sizeCode === "S"){
            size = "small";
        };
        if (sizeCode === "M"){
            size = "medium";
        };        if (sizeCode === "S"){
            size = "large";
        };

        if(sexCode === "F"){
            sex = "female"
        }
        if(sexCode === "M"){
            sex = "male"
        }
        

        let description = 'Image of '+ age +'year old '+size+' '+sex+' '+breed;

        catGrid += '<article class="item">';
        catGrid += '<div class="pictureframe">'
        catGrid += '<img src="' + smallURL +'" srcset="'+smallURL+' 600w, '+mediumURL+' 1200w, '+largeURL+' 3240w" alt="' + description + '"/>';
        catGrid += '</div>';
        catGrid += '<div class="slideinfo">';
        catGrid += '<p class="name">'+petname+'</p>';
        catGrid += '<p class="location">'+cityLocation+', '+stateLocation+'</p>';
        catGrid += "</div></article>";
    }
    wrapper.innerHTML=catGrid;
    
}

runXHR();




console.log("index.js loaded")