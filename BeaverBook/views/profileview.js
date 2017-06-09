var profileView = {
    name: "profileView",
    createProfilePage(beaver, arr1, arr2){
        //empty the home view
        document.body.removeChild(document.getElementById("myForm"));
        document.body.removeChild(document.getElementById("beaverList"));
        document.body.removeChild(document.getElementById("map"));
        document.body.removeChild(document.getElementById("aside"));

        document.body.classList.add("profileBody");

        //create nav
        var nav = document.createElement("nav");
        nav.setAttribute("id", "nav");
        this.createHomeButton(nav);
        document.body.appendChild(nav);

        //create messages area
        this.createMessageArea(document.body);

        //display different sections
        this.displayOthers(arr1);
        this.displayProfile(beaver);
        this.displayBuddies(arr2);
        
        //document.getElementById("beaverList").style
    },
    updateProfilePage: function(arr1, arr2, beaver, profileMessages){
        this.displayProfileMessages(profileMessages, beaver.name);
        this.displayOthers(arr1);
        this.displayProfile(beaver);
        this.displayBuddies(arr2);
    },
    displayProfile: function(beaver){
        // create a div and display the beaver

        if (document.getElementsByClassName("profile").length !== 0){
            document.body.removeChild(document.getElementsByClassName("profile")[0]);
        }
        var beaverDiv = document.createElement("div");
        var profilePic = document.createElement("img");
        var beaverProfile = document.createElement("ul");

        beaverDiv.setAttribute("class", "profile");
        beaverDiv.setAttribute("id", beaver.id);
        profilePic.setAttribute("src", beaver.imagesrc);
        profilePic.setAttribute("class", "profilePic");
        beaverProfile.setAttribute("class", "profileList");
        
        for (keys in beaver){
            if (keys !== "track" && keys !== "imagesrc" && keys !== "id"
                && keys !== "profileMessages"){
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
    displayOthers: function(arr){
        // remove the list if it already exists
        if (document.getElementById("beaverGallery") !== null){
            document.body.removeChild(document.getElementById("beaverGallery"));
        }
        //recreate it
        var gallery = document.createElement("div");
        gallery.setAttribute("id", "beaverGallery");
        gallery.setAttribute("class", "allGallery");
        for (var i = 0; i < arr.length;i++){
            var container = document.createElement("div");
            container.setAttribute("class", "container");
            container.setAttribute("id", arr[i].id);
            var img = document.createElement("img");
            img.setAttribute("src", arr[i].imagesrc);
            img.setAttribute("class","pics");

            this.createProfileButton(container);
            container.appendChild(img)
            this.createMessageButton(container);
            this.createRequestButton(container);
            gallery.appendChild(container);
        }
        document.body.appendChild(gallery); 
    },
    displayBuddies: function(arr){
        // remove the list if it already exists
        if (document.getElementById("buddyGallery") !== null){
            var buddyGallery = document.getElementById("buddyGallery");
            document.body.removeChild(buddyGallery);
        }
        //recreate it
        buddyGallery = document.createElement("div");
        buddyGallery.setAttribute("id", "buddyGallery");
        buddyGallery.setAttribute("class", "gallery");

        for (var i = 0; i < arr.length;i++){
            var container = document.createElement("div");
            container.setAttribute("class", "container");
            container.setAttribute("id", arr[i].id);
            var img = document.createElement("img");
            img.setAttribute("src", arr[i].imagesrc);
            img.setAttribute("class","pics");

            this.createProfileButton(container);
            container.appendChild(img);
            this.createMessageButton(container);
            this.createUnfriendButton(container);
            buddyGallery.appendChild(container);
        }
        document.body.appendChild(buddyGallery);

    },
    stringifyBeaver: function(beaverObj){
        var beaverString = "";
        beaverString = "<span>" + beaverObj.name + "(" + beaverObj.age + "), " + beaverObj.sex + 
                        "</span><span>" + "spotted in: " + beaverObj.location.join(", ") + ".</span><hr>";
        return beaverString;
    },
    displayProfileMessages: function(messagesArray, beaverName){
        this.createMessageArea();
        this.createMessageBoxes(messagesArray, document.getElementById("messageArea"), beaverName);
    },
    stringifyRelation: function(){

    },
    createRequestButton: function(item){
        var friendBtn = document.createElement("button");
        friendBtn.setAttribute("type", "button");
        friendBtn.setAttribute("class", "buttons friendButtons");
        friendBtn.innerHTML = "<i class=\"fa fa-heart\" aria-hidden=\"true\"></i>";

        item.appendChild(friendBtn);
    },
    createUnfriendButton: function(item){
        var unfriendBtn = document.createElement("button");
        unfriendBtn.setAttribute("type", "buttons");
        unfriendBtn.setAttribute("class", "buttons unfriendButtons");
        unfriendBtn.innerHTML = "<i class=\"fa fa-chain-broken\" aria-hidden=\"true\"></i>";

        item.appendChild(unfriendBtn);
    },
    createProfileButton: function(container){
        var profileBtn = document.createElement("button");
        profileBtn.setAttribute("type", "submit");
        profileBtn.setAttribute("class", "profileBtn buttons");
        profileBtn.innerHTML= "<i class=\"fa fa-user\" aria-hidden=\"true\"></i>";

        container.appendChild(profileBtn);
    },
    createHomeButton: function(nav){
        var homeButton = document.createElement("button");
        homeButton.setAttribute("id", "homeButton");
        homeButton.setAttribute("type", "button");
        homeButton.setAttribute("class", "buttons");
        homeButton.innerHTML = "<i class=\"fa fa-home\" aria-hidden=\"true\"></i>";

        nav.appendChild(homeButton);
    },
    createMessageArea: function(){
        if (document.getElementById("messageArea") !== null){
            document.body.removeChild(document.getElementById("messageArea"));
        }

        var messageArea = document.createElement("div");   
        messageArea.setAttribute("id", "messageArea");
        document.body.appendChild(messageArea);
    },
    createMessageBoxes(messagesArray, area, beaver){

        for (var i = 0; i < messagesArray.length;i++){
            var messagebox = document.createElement("div");
            messagebox.setAttribute("class", "messageBox");
            var messageTitle = document.createElement("h3");
            messageTitle.setAttribute("class", "messageTitle");
            messageTitle.innerHTML = beaver + ": ";
            var message = document.createElement("p");
            message.setAttribute("class", "messages");
            message.innerHTML = messagesArray[i];

            messageTitle.appendChild(message);
            messagebox.appendChild(messageTitle);
            area.appendChild(messagebox);
            //document.getElementById(area).appendChild(messagebox);
        }
    },
    createMessageButton: function(container){
        var messageButton = document.createElement("button");
        messageButton.setAttribute("type", "button");
        messageButton.setAttribute("class", "buttons messageButtons");
        messageButton.innerHTML = "<i class=\"fa fa-commenting\" aria-hidden=\"true\"></i>";

        container.appendChild(messageButton);
    },
    createModifyButton: function(){

    },
    modifyFriendButton: function(id){
        var button = document.getElementById(id).children[3];
        var icon = button.children[0];
        icon.style.color = "red";
    
    },
    handleRequestsForm: function(friendRequest){
        var requestForm = document.createElement("form");
        requestForm.setAttribute("class", "requestForm");
        requestForm.setAttribute("onsubmit", "return false;");
        requestForm.setAttribute("id", "toDecide");

        var acceptLabel = document.createElement("label");
        var rejectLabel = document.createElement("label");
        acceptLabel.setAttribute("for", "accept");
        rejectLabel.setAttribute("for", "reject");

        var acceptBox = document.createElement("input");
        var rejectBox = document.createElement("input");
        acceptBox.setAttribute("type", "radio");
        rejectBox.setAttribute("type", "radio");
        acceptBox.setAttribute("name", "choice");
        rejectBox.setAttribute("name", "choice");
        acceptBox.setAttribute("id", "accept");
        rejectBox.setAttribute("id", "reject");
        acceptBox.setAttribute("value", "accept");
        rejectBox.setAttribute("value", "reject");
        acceptBox.setAttribute("checked","checked");

        acceptLabel.innerHTML = "<span></span>Accept";
        rejectLabel.innerHTML = "<span></span>Reject";

        var submitButton = document.createElement("button");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("class", "buttons");
        submitButton.setAttribute("id", "submitButton");
        submitButton.innerHTML = "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>";

        requestForm.appendChild(acceptBox);
        requestForm.appendChild(acceptLabel);

        requestForm.appendChild(rejectBox);
        requestForm.appendChild(rejectLabel);
        
        requestForm.appendChild(submitButton);

        friendRequest.appendChild(requestForm);
    },
    createConversationBoxes: function(conArray, conArea){
        for (var i = 0; i < conArray.length;i++){
            var messagebox = document.createElement("div");
            messagebox.setAttribute("class", "messageBox");
            messagebox.innerHTML = conArray[i];
            conArea.appendChild(messagebox);
        }
    },
    displayConversationBox(conversations, beaver){
        var conversationArea = document.createElement("div");
        conversationArea.setAttribute("id", "conversationArea");
        document.getElementById("messageArea").appendChild(conversationArea);
        this.createConversationBoxes(conversations, conversationArea);
        
    }
}