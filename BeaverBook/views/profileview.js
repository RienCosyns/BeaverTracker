var profileView = {
    name: "profileView",
    createProfilePage(beaver){
        //empty the home view
        document.body.removeChild(document.getElementById("myForm"));
        document.body.removeChild(document.getElementById("beaverList"));
        document.body.removeChild(document.getElementById("map"));
        document.body.removeChild(document.getElementById("aside"));

        this.displayProfile(beaver);

        //document.getElementById("beaverList").style
    },
    displayProfile: function(beaver){
        // create a div and display the beaver
        var beaverDiv = document.createElement("div");
        var profilePic = document.createElement("img");
        var beaverProfile = document.createElement("ul");

        beaverDiv.setAttribute("class", "profile");
        profilePic.setAttribute("src", "images/Paddy.jpg");
        profilePic.setAttribute("class", "profilePic");
        beaverProfile.setAttribute("class", "profileList");
        
        for (keys in beaver){
            var item = document.createElement("li");
            item.innerHTML = keys + ": " + beaver[keys];
            var editButton = document.createElement("button");
            editButton.setAttribute("class", "buttons");
            editButton.setAttribute("type", "submit");
            editButton.innerHTML = "<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>";
            item.appendChild(editButton);
            beaverProfile.appendChild(item);
        }
        beaverDiv.appendChild(profilePic);
        beaverDiv.appendChild(beaverProfile);
        document.body.appendChild(beaverDiv);
    },
    displayAll: function(arr){
        // remove the list
        if (document.getElementById("beaverList") !== null){
        
            var beaverList = document.getElementById("beaverList");
            document.body.removeChild(beaverList);
        }

        // recreate the list after every call
         beaverList = document.createElement("ul");
         beaverList.setAttribute("id", "beaverList");
        //  var map = document.getElementById("map");
        //  document.body.insertBefore(beaverList, map);

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
    displayRelation: function(){

    },
    stringifyRelation: function(){

    },
    createRequestButton: function(){

    },
    createUnfriendButton: function(){

    },
    createMessageButton: function(){

    },
    createModifyButton: function(){

    },
}