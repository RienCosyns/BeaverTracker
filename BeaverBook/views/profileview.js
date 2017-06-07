var profileView = {
    name: "profileView",
    createProfilePage(beaver, arr1, arr2){
        //empty the home view
        document.body.removeChild(document.getElementById("myForm"));
        document.body.removeChild(document.getElementById("beaverList"));
        document.body.removeChild(document.getElementById("map"));
        document.body.removeChild(document.getElementById("aside"));

        document.body.classList.add("profileBody");
        
        this.displayAll(arr1);
        this.displayProfile(beaver);
        this.displayBuddies(arr2);
        
        //document.getElementById("beaverList").style
    },
    displayProfile: function(beaver){
        // create a div and display the beaver
        var beaverDiv = document.createElement("div");
        var profilePic = document.createElement("img");
        var beaverProfile = document.createElement("ul");

        beaverDiv.setAttribute("class", "profile");
        profilePic.setAttribute("src", beaver.imagesrc);
        profilePic.setAttribute("class", "profilePic");
        beaverProfile.setAttribute("class", "profileList");
        
        for (keys in beaver){
            if (keys !== "track" && keys !== "imagesrc"){
                var item = document.createElement("li");
                item.innerHTML = keys + ": " + beaver[keys];
                var editButton = document.createElement("button");
                editButton.setAttribute("class", "buttons");
                editButton.setAttribute("type", "submit");
                editButton.innerHTML = "<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>";
                item.appendChild(editButton);
                beaverProfile.appendChild(item);
            }
            
        }
        beaverDiv.appendChild(profilePic);
        beaverDiv.appendChild(beaverProfile);
        document.body.appendChild(beaverDiv);
    },
    displayAll: function(arr){
        // remove the list if it already exists
        if (document.getElementById("beaverGallery") !== null){
            document.body.removeChild(document.getElementById("beaverGallery"));
        }
        //recreate it
        var gallery = document.createElement("div");
        gallery.setAttribute("id", "beaverGallery");
        gallery.setAttribute("class", "allGallery");
        for (var i = 0; i < arr.length;i++){
            var img = document.createElement("img");
            img.setAttribute("src", arr[i].imagesrc);
            img.setAttribute("class","pics");
            gallery.appendChild(img);
        }
        document.body.appendChild(gallery); 
    },
    displayBuddies: function(arr){
        // remove the list if it already exists
        if (document.getElementById("buddyGalery") !== null){
            document.body.removeChild(document.getElementById("buddyGalery"));
        }
        //recreate it
        var buddyGallery = document.createElement("div");
        buddyGallery.setAttribute("id", "buddyGallery");
        buddyGallery.setAttribute("class", "gallery");

        for (var i = 0; i < arr.length;i++){
            var img = document.createElement("img");
            img.setAttribute("src", arr[i].imagesrc);
            img.setAttribute("class","pics");
            buddyGallery.appendChild(img);
        }
        document.body.appendChild(buddyGallery);

    },
    stringifyBeaver: function(beaverObj){
        var beaverString = "";
        beaverString = "<span>" + beaverObj.name + "(" + beaverObj.age + "), " + beaverObj.sex + 
                        "</span><span>" + "spotted in: " + beaverObj.location.join(", ") + ".</span><hr>";
        return beaverString;
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