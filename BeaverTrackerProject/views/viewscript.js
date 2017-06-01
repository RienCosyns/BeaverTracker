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
         document.body.appendChild(beaverList);

         for (var i = 0; i < arr.length; i++){
             var text = this.stringifyBeaver(arr[i]);
             
             var beaverItem = document.createElement("li");
             beaverList.appendChild(beaverItem);
             beaverItem.innerHTML = text;
             beaverItem.setAttribute("id", i);
             this.addLocationButton(beaverItem);
             this.addTrackButton(beaverItem, arr[i].track);
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

    }
}