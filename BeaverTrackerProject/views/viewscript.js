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
             // console.log(text);
             var beaverItem = document.createElement("li");
             beaverList.appendChild(beaverItem);
             beaverItem.innerHTML = text;
             beaverItem.setAttribute("id", i);
         }
    },
    stringifyBeaver: function(beaverObj){
        var beaverString = "";
        beaverString = beaverObj.name + "(" + beaverObj.age + "), " + beaverObj.sex + 
                        ", spotted in " + beaverObj.location.join(", ") + ".";
        return beaverString;
    },
    addLocationButton: function(){
        //code here
        
    },
    addTrackButton: function(){
        //code here
       
    },
    untrackAllButton: function(){
        //code here
        
    },
    trackAllButton: function(){
        //code here
        
    }
}