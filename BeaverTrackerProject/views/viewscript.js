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
             if (arr[i].track){
                 text = text + " Tracking.";
             }else{
                 text = text + " Not tracking."
             }
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
        beaverString = beaverObj.name + "(" + beaverObj.age + "), " + beaverObj.sex + 
                        ", spotted in " + beaverObj.location.join(", ") + ".";
        return beaverString;
    },
    addLocationButton: function(listItem){
        //code here
        var locationBtn = document.createElement("button");
        locationBtn.setAttribute("type", "submit");
        locationBtn.setAttribute("class", "locationButtons");
        locationBtn.innerHTML = "Add Location";
        listItem.appendChild(locationBtn);
    },
    addTrackButton: function(listItem, tracking){
        //code here
       var trackBtn = document.createElement("button");
       trackBtn.setAttribute("type", "submit");
       trackBtn.setAttribute("class", "trackButtons");
       if (tracking){
           trackBtn.innerHTML = "Untrack";
       }else{
           trackBtn.innerHTML = "Track";
       }

       listItem.appendChild(trackBtn);

    }
}