// browser view version

var beaverBrowserViewer = {
    name: "beaverBrowserViewer",
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
        locationBtn.setAttribute("class", "locationButtons");
        locationBtn.appendChild(icon);
        listItem.appendChild(locationBtn);
    },
    addTrackButton: function(listItem, tracking){
        //code here
       var trackBtn = document.createElement("button");
       var icon = document.createElement("i");
       trackBtn.setAttribute("type", "submit");
       trackBtn.setAttribute("class", "trackButtons");
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