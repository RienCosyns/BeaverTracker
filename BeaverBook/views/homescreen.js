var homeScreen = {
    name: "homeScreen",
    createHomePage: function(){
        // add body
        var homeBody = document.body;
        while (homeBody.firstChild) {
            homeBody.removeChild(homeBody.firstChild);
        }
        document.body.classList.remove("profileBody");
        // add form and children
        var form = document.createElement("form");
        form.setAttribute("id", "myForm");
        form.setAttribute("class", "addForm");
        form.setAttribute("onsubmit", "return false;");
        //labels and inputs
        var formLabels = ["nameLabel", "ageLabel", "sexLabel", "locationLabel"];
        var formInputs = ["nameInput", "ageInput", "sexInput", "locationInput"];
        var values = ["Name: ", " Age: ", " Sex: ", " Location: "];
        var placeholders = ["Beafy", 5, "Male", "Beaverton"];

        for (var i = 0; i < 4; i++){
            var label = document.createElement("label");
            var input = document.createElement("input");
            label.setAttribute("for", formInputs[i]);
            input.setAttribute("id", formInputs[i]);
            input.setAttribute("name", formInputs[i]);
            input.setAttribute("value", "");
            label.innerHTML = values[i];
            input.setAttribute("placeholder", placeholders[i]);

            form.appendChild(label);
            form.appendChild(input);
        }

        // buttons
        var buttonDiv = document.createElement("div");
        buttonDiv.setAttribute("id", "buttons");
        var addButton = document.createElement("button");
        var trackAllButton = document.createElement("button");
        var untrackAllButton = document.createElement("button");

        addButton.setAttribute("type", "submit");
        trackAllButton.setAttribute("type", "submit");
        untrackAllButton.setAttribute("type", "submit");

        addButton.setAttribute("id", "addButton");
        trackAllButton.setAttribute("id", "trackAllButton");
        untrackAllButton.setAttribute("id", "untrackAllButton");

        addButton.setAttribute("class", "buttons");
        trackAllButton.setAttribute("class", "buttons");
        untrackAllButton.setAttribute("class", "buttons");

        addButton.innerHTML = "<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>";
        trackAllButton.innerHTML = "Track All";
        untrackAllButton.innerHTML = "Untrack All";

        buttonDiv.appendChild(trackAllButton);
        buttonDiv.appendChild(addButton);
        buttonDiv.appendChild(untrackAllButton);

        form.appendChild(buttonDiv);

        homeBody.appendChild(form);

        // aside => messages

        var aside = document.createElement("aside");
        aside.setAttribute("id", "aside");
        homeBody.appendChild(aside);

        // map div
        var mapDiv = document.createElement("div");
        var mapHolder = document.createElement("div");
        mapDiv.setAttribute("id", "map");
        mapHolder.setAttribute("class", "collapsed");
        mapHolder.setAttribute("id", "mapHolder");
        mapDiv.appendChild(mapHolder);
        homeBody.appendChild(mapDiv);

    },
    displayBeavers: function(arr){

        // remove the list
        if (document.getElementById("beaverList") !== null){
        
            var beaverList = document.getElementById("beaverList");
            document.body.removeChild(beaverList);
        }

        // recreate the list after every call
         beaverList = document.createElement("ul");
         beaverList.setAttribute("id", "beaverList");
         var map = document.getElementById("map");
         document.body.insertBefore(beaverList, map);

         for (var i = 0; i < arr.length; i++){
             var text = this.stringifyBeaver(arr[i]);
             
             var beaverItem = document.createElement("li");
             beaverList.appendChild(beaverItem);
             beaverItem.innerHTML = text;
             beaverItem.setAttribute("id", i);
             this.addLocationButton(beaverItem);
             this.addTrackButton(beaverItem, arr[i].track);
             this.addProfileButton(beaverItem);
             this.createInput(beaverItem);
         }
    },
    stringifyBeaver: function(beaverObj){
        var beaverString = "";
        beaverString = "<span>" + beaverObj.name + "(" + beaverObj.age + "), " + beaverObj.sex + 
                        "</span><span>" + "spotted in: " + beaverObj.location.join(", ") + ".</span><hr>";
        return beaverString;
    },
    addLocationButton: function(listItem){
        //code here
        var locationBtn = document.createElement("button");
        var icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-map-marker");
        icon.setAttribute("aria-hidden", "true");
        locationBtn.setAttribute("type", "submit");
        locationBtn.setAttribute("class", "locationButtons buttons");
        locationBtn.appendChild(icon);
        listItem.appendChild(locationBtn);
    },
    addTrackButton: function(listItem, tracking){
        //code here
       var trackBtn = document.createElement("button");
       var icon = document.createElement("i");
       trackBtn.setAttribute("type", "submit");
       trackBtn.setAttribute("class", "trackButtons buttons");
       if (tracking){
           //trackBtn.innerHTML = "Untrack";
           icon.setAttribute("class", "fa fa-ban");
       }else{
           //trackBtn.innerHTML = "Track";
           icon.setAttribute("class", "fa fa-binoculars");  
       }
       icon.setAttribute("aria-hidden", "true");
       trackBtn.appendChild(icon);
       listItem.appendChild(trackBtn);

    },
    addProfileButton: function(listItem){
        var profileBtn = document.createElement("button");
        profileBtn.setAttribute("type", "submit");
        profileBtn.setAttribute("class", "profileButtons buttons");
        profileBtn.innerHTML= "<i class=\"fa fa-user\" aria-hidden=\"true\"></i>";

        listItem.appendChild(profileBtn);
    },
    displayMessages: function(message){
        // remove the list
        if (document.getElementById("messageBoard") !== null){
            var messageBoard = document.getElementById("messageBoard");
            document.getElementById("aside").removeChild(messageBoard);
        }

         messageBoard = document.createElement("p");
         messageBoard.setAttribute("id", "messageBoard");
         document.getElementById("aside").appendChild(messageBoard);

         var text = message;
         messageBoard.innerHTML = text;
    
    },
    showMapButton: function(){
        var mapButton = document.createElement("button");
        var map = document.getElementById("map");
        mapButton.setAttribute("type", "button");
        mapButton.setAttribute("id", "mapButton");
        mapButton.setAttribute("class", "buttons mapButton");
        mapButton.innerHTML = 'Show Current Position';
        map.insertBefore(mapButton, document.getElementById("mapHolder"));
        // document.getElementById("mapHolder").style.display = "none";
    },
    showPosition: function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var myPosition = new google.maps.LatLng(lat, lon);
        var geoCoder = new google.maps.Geocoder();
        var coordinates = {
            center: myPosition,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
        var map = new google.maps.Map(document.getElementById("mapHolder"), coordinates);
        var marker = new google.maps.Marker({position:myPosition,map:map,title:"You are here!"
                        });

        if (geoCoder){
            geoCoder.geocode({'latLng': myPosition}, function(results, status){
                if (status !== google.maps.GeocoderStatus.OK){
                    alert("Geocoding failed: " + status);
                }
            })
        }
    },
    createInput: function(item){
        var inputLocation = document.createElement("input");

        inputLocation.setAttribute("class", "locationInput");
        inputLocation.setAttribute("type", "text");
        inputLocation.style.display = "none";

        item.appendChild(inputLocation);
    }
}