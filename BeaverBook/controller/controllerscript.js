// Dummy controller script based on controller prompt

var beaverEvents = {
    modelState: {},
    viewState: {},
    activeView: "",
    addModel: function(model){
        this.modelState[model.name] = model;
    },
    getViewState: function(view){
        this.viewState[view.name] = view;
    },
    goToHome:function(){
        this.viewState.homeScreen.createHomePage();
    },
    displayBeavers: function(){
        //code here
        var arr = this.modelState.beaverApp.getAll();
        this.viewState.homeScreen.displayBeavers(arr);
        homeScreenHandlers.setupEvents();
    },
    addBeaver: function(name, age, sex, location){
        var beaver = {
        name: name,
        age: age,
        sex: sex,
        location: [],
        track: true
        }
        //console.log(beaver);
        if (location !== undefined){
            beaver.location[0] = location;
        }
        this.modelState.beaverApp.addNew(beaver, (err) =>{
            if (err){
                this.modelState.beaverApp.message = "Invalid arguments";
            }else{
                this.modelState.beaverApp.message = "Beaver " + beaver.name + " added.";
            }
        });
        this.viewState.homeScreen.displayMessages(this.modelState.beaverApp.message);
        this.displayBeavers();
    },
    addLocation: function(beaverId, location){
        //code here
        this.modelState.beaverApp.addLocation(beaverId, location, (err) => {
            if (err){
                this.modelState.beaverApp.message = "Unknown location";
            }else{
                this.modelState.beaverApp.message = "Location added to " + this.modelState.beaverApp.getBeaverById(beaverId).name;
            }
        })
        this.viewState.homeScreen.displayMessages(this.modelState.beaverApp.message);
        this.displayBeavers();
    },
    toggleTracking: function(beaverId){
        //code here
        this.modelState.beaverApp.tracking(beaverId, (err) =>{
            if (err){
                this.modelState.beaverApp.message = "Beaver doesn't exist";
            }else{
                if (this.modelState.beaverApp.beaverObjects[beaverId].track){
                    this.modelState.beaverApp.message = "Tracking " + this.modelState.beaverApp.getBeaverById(beaverId).name;
                }else{
                    this.modelState.beaverApp.message = "No longer tracking " + this.modelState.beaverApp.getBeaverById(beaverId).name;
                }
            }
        });
        this.viewState.homeScreen.displayMessages(this.modelState.beaverApp.message);
        this.displayBeavers();       
    },
    untrackAll: function(){
        //code here
        for (key in this.modelState.beaverApp.beaverObjects){
            this.modelState.beaverApp.beaverObjects[key].track = false;
        }
        this.modelState.beaverApp.message = "No longer tracking any beavers";
        this.viewState.homeScreen.displayMessages(this.modelState.beaverApp.message);
        this.displayBeavers();
    },
    trackAll: function(){
        //code here
        for (key in this.modelState.beaverApp.beaverObjects){
            this.modelState.beaverApp.beaverObjects[key].track = true;
        }
        this.modelState.beaverApp.message = "Tracking all beavers";
        this.viewState.homeScreen.displayMessages(this.modelState.beaverApp.message);
        this.displayBeavers();
    },
    getGeoLocation: function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.viewState.homeScreen.showPosition);
        }   
    },
    changeView: function(){
        // if homescreen, switch to profile view
        if (this.activeView == "homeScreen"){
            this.activeView = "profileView";
            profileHandlers.setupEvents();
        }
    },
    updateView: function(id1){
        var beaver = this.modelState.beaverApp.getBeaverById(id1);
        var beaversArray = this.modelState.beaverRelations.getOthers(id1);
        var buddies = this.modelState.beaverRelations.getBuddies(id1);
        var ownProfileMessages = this.modelState.beaverApp.beaverObjects[id1].profileMessages;
        // alert(messagesFromOthers);

        this.viewState.profileView.updateProfilePage(beaversArray, buddies, beaver, ownProfileMessages);

        for (key in this.modelState.beaverRelations.relRecords){
            if (this.modelState.beaverRelations.relRecords[key].beaverIdSender == id1){
                if (this.modelState.beaverRelations.relRecords[key].isAccepted == false){
                this.viewState.profileView.modifyFriendButton(this.modelState.beaverRelations.relRecords[key].beaverIdReceiver);
                }
            } 
        }
        this.displayStatus(id1);
        this.createRequestForm();
        profileHandlers.setupEvents();
    },
    displayProfile: function(id){
        var beaver = this.modelState.beaverApp.getBeaverById(id);
        var beaversArray = this.modelState.beaverRelations.getOthers(id);
        var buddies = this.modelState.beaverRelations.getBuddies(id);
        this.viewState.profileView.createProfilePage(beaver, beaversArray, buddies);
        // color and disable icon of beaver with friend request
        for (key in this.modelState.beaverRelations.relRecords){
            if (this.modelState.beaverRelations.relRecords[key].beaverIdSender == id){
                if (this.modelState.beaverRelations.relRecords[key].isAccepted == false){
                this.viewState.profileView.modifyFriendButton(this.modelState.beaverRelations.relRecords[key].beaverIdReceiver);
                }
            } 
        }
        this.displayStatus(id);
    },
    addRelation: function(id1, id2){
        var relation = {
            beaverIdSender: id1,
            beaverIdReceiver: id2,
            messageHistory: [],
            isAccepted: false,
            status: "Status?"
        };

        var notificationMessage = "";
        var messageTo = "";
        var relationId;
        this.modelState.beaverRelations.addRelation(relation, (err) => {
            if (err){
                notificationMessage = "Friend request already sent to " + this.modelState.beaverApp.beaverObjects[id2].name;
                messageTo = null;
            }else{
                notificationMessage = "Friend request sent to " + this.modelState.beaverApp.beaverObjects[id2].name;
                relationId = this.modelState.beaverRelations.getRelation(id1, id2);
                messageTo = "<span relId=\"" + relationId + "\">" + "Friend request received from " + this.modelState.beaverApp.beaverObjects[id1].name
                            + "</span>";

            }
        })
        this.modelState.beaverApp.addProfileMessage(id1, notificationMessage);
        // this.viewState.profileView.displayProfileMessages(notificationsArray);
        this.modelState.beaverApp.addProfileMessage(id2, messageTo);

        this.updateView(id1);
    },
    deleteRelation: function(id1, id2){
        //call relation model deleteRelation method
        var notificationMessage = "";
        var messageTo = "";
        this.modelState.beaverRelations.deleteRelation(id1, id2, (err) =>{
            if (err){
                notificationMessage = "Not possible to delete the relation";
            }else{
                notificationMessage = "No longer Buddies with " + this.modelState.beaverApp.beaverObjects[id2].name;
        
            }
        });
        
        this.modelState.beaverApp.addProfileMessage(id1, notificationMessage);
        
        this.updateView(id1);
    },
    createRequestForm: function(){
        // add friendRequest class to span for the new relation
        var spans = document.getElementsByTagName("span");
        for (var i = 0; i < spans.length;i++){
            var relId = spans[i].getAttribute("relId");
            if (relId in this.modelState.beaverRelations.relRecords){
                if (this.modelState.beaverRelations.relRecords[relId].isAccepted == false){
                    spans[i].classList.add("friendRequest");
                }
            }
            
        }
        var friendRequests = document.getElementsByClassName("friendRequest");
        for (var i = 0; i < friendRequests.length;i++){
            var parent = friendRequests[i].parentElement.parentElement;
            this.viewState.profileView.handleRequestsForm(parent);
        }
    },
    handleRequests: function(relId, bool){
        this.modelState.beaverRelations.handleRequests(relId, bool);
    },
    displayConversations: function(relId, idReceiver){
        // calls this.modelState.beaverRelations.getMessages
        var conversations = this.modelState.beaverRelations.getMessages(relId);
        //calls this.viewState.profileView.displayConversationBox

        var beaver = this.modelState.beaverApp.beaverObjects[idReceiver].name;

        this.viewState.profileView.displayConversationBox(conversations);
        document.getElementById("conversationArea").setAttribute("beaverId", idReceiver);
        profileHandlers.setupEvents();
    },
    addConversation: function(relationId, message, idReceiver){
        this.modelState.beaverRelations.addMessage(relationId, message);
        this.displayConversations(relationId, idReceiver);
        profileHandlers.setupEvents();
    },
    edit: function(li){
        li.children[0].style.display = "inline-block";
        li.children[0].autofocus = true;
        li.children[1].innerHTML = "<i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i>";
        li.children[1].classList.remove("editButtons");
        li.children[1].classList.add("okButtons");
        profileHandlers.setupEvents();
    },
    displayStatus: function(id){
        
        for (rel in this.modelState.beaverRelations.relRecords){
            if (this.modelState.beaverRelations.relRecords[rel].beaverIdSender == id){
                // get buddies and display status
                var id2 = this.modelState.beaverRelations.relRecords[rel].beaverIdReceiver;
                if (document.getElementById(id2)
                    && this.modelState.beaverRelations.relRecords[rel].isAccepted == true){
                    document.getElementById(id2).children[4].children[2].innerHTML =
                        this.modelState.beaverRelations.relRecords[rel].status;
                }
            }
        }
    }
}

var homeScreenHandlers = {
    setupEvents: function(){
        var addButton = document.getElementById("addButton");
        var addLocationButtons = document.getElementsByClassName("locationButtons");
        var trackButtons = document.getElementsByClassName("trackButtons");
        var profileButtons = document.getElementsByClassName("profileButtons");
        var trackAllButton = document.getElementById("trackAllButton");
        var untrackAllButton = document.getElementById("untrackAllButton");
        var mapButton = document.getElementById("mapButton");
        
        //var mapButtons = document.getElementsByClassName("mapButton");

        addButton.onclick = function(){
            var name = document.getElementById("nameInput").value;
            var age = parseInt(document.getElementById("ageInput").value);
            var sex = document.getElementById("sexInput").value;
            var location = document.getElementById("locationInput").value;
            beaverEvents.addBeaver(name,age,sex,location);
            document.getElementById("myForm").reset();
        }

        for (var i = 0; i < addLocationButtons.length; i++){
            addLocationButtons[i].onclick = function(){
                var locationPrompt = prompt("Please add new location");
               // console.log(this.parentElement.getAttribute("id"));
                var id = this.parentElement.getAttribute("id");
                beaverEvents.addLocation(id, locationPrompt); 
            }
        }

        for (var i = 0; i < trackButtons.length;i++){
            trackButtons[i].onclick = function(){
                var id = this.parentElement.getAttribute("id");
                beaverEvents.toggleTracking(id);
            }
        }

        for (var i = 0; i < profileButtons.length;i++){
            profileButtons[i].onclick = function(){
                var id = this.parentElement.getAttribute("id");
                // Move to profile
                beaverEvents.displayProfile(id);
                beaverEvents.changeView();
            }
        }

        trackAllButton.onclick = function(){
            beaverEvents.trackAll();
        }

        untrackAllButton.onclick = function(){
            beaverEvents.untrackAll();
        }

        mapButton.onclick = function(){
            // display map if not displayed else undisplay 
            // and change button text
            var map = document.getElementById("mapHolder");
            if (!map.classList.contains("expand")){
                map.classList.add("expand");
                beaverEvents.getGeoLocation();
                mapButton.innerHTML = "Collapse Map";
            }else{
                map.classList.remove("expand");
                mapButton.innerHTML = "Show Current Position";
            }
        }
    }
}

var profileHandlers = {
    setupEvents: function(){
        var friendButtons = document.getElementsByClassName("friendButtons");
        var unfriendButtons = document.getElementsByClassName("unfriendButtons");
        var profileButtons = document.getElementsByClassName("profileBtn");
        var submitButton = document.getElementById("submitButton");
        var messageButtons = document.getElementsByClassName("messageButtons");
        var exitButtons = document.getElementsByClassName("exitButtons");
        var addTextButtons = document.getElementsByClassName("addTextButtons");
        var homeButton = document.getElementById("homeButton");
        var editButtons = document.getElementsByClassName("editButtons");
        var okButtons = document.getElementsByClassName("okButtons");
        var imageUpload = document.getElementById("imageUpload");

        for (var i = 0; i < friendButtons.length;i++){
            friendButtons[i].onclick = function(){
                // run the addRelation method
                var id1 = document.getElementsByClassName("profile")[0].getAttribute("id");
                var id2 = this.parentElement.getAttribute("id");
                beaverEvents.addRelation(id1, id2);
            }
        }

        for (var i = 0; i < unfriendButtons.length;i++){
            unfriendButtons[i].onclick = function(){
                // call the delete relation method
                var id1 = document.getElementsByClassName("profile")[0].getAttribute("id");
                var id2 = this.parentElement.getAttribute("id");
                beaverEvents.deleteRelation(id1, id2);
            }
        }

        for (var i = 0; i < profileButtons.length;i++){
            profileButtons[i].onclick = function(){
                // go to different profile
                var id = this.parentElement.getAttribute("id");
                beaverEvents.updateView(id);
            }
        }

        for (var i = 0; i < messageButtons.length;i++){
            messageButtons[i].onclick = function(){
                // call beaverevents.displayConversations
                var id1 = document.getElementsByClassName("profile")[0].getAttribute("id");
                var id2 = this.parentElement.getAttribute("id");
                var relId = beaverRelations.getRelation(id1, id2);
                beaverEvents.displayConversations(relId, id2);
            }
        }

        for (var i = 0; i < exitButtons.length;i++){
            exitButtons[i].onclick = function(){
                var messageArea = document.getElementById("messageArea");
                messageArea.removeChild(this.parentElement.parentElement);
                profileHandlers.setupEvents();
            }
        }

        for (var i = 0; i < addTextButtons.length;i++){
            addTextButtons[i].onclick = function(){
                var form = this.parentElement;
                var message = form.children[0].value;
                // call function
                var id1 = document.getElementsByClassName("profile")[0].getAttribute("id");
                var id2 = form.parentElement.children[0].getAttribute("beaverId");
                var relId = beaverRelations.getRelation(id1, id2);
                //reset form
                form.reset();
                beaverEvents.addConversation(relId, message, id2);
            }
        }

        for (var i = 0; i < editButtons.length;i++){
            editButtons[i].onclick = function(){
                var listItem = this.parentElement;
                //call function    
                beaverEvents.edit(listItem);           
            }
        }
        if (okButtons.length !== 0){
            for (var i = 0; i < okButtons.length;i++){
                okButtons[i].onclick = function(){
                    var id1 = document.getElementsByClassName("profile")[0].getAttribute("id");

                    var id2 = this.parentElement.parentElement.getAttribute("id");

                    var rel = beaverRelations.getRelation(id1, id2);
    
                    var input = this.previousSibling.getAttribute("id");
  
                    var key = input.replace("Input", "");

                    var value = document.getElementById(input).value;

                    if (input == "statusInput"){
                        value = this.previousSibling.value
                        beaverRelations.changeStatus(rel, value);
                    }else{
                        beaverApp.modifyBeaver(id1, key, value);
                    }
                    beaverEvents.updateView(id1);
                }
                
            }
        }
        

        if (submitButton !== null){
            submitButton.onclick = function(){
                var bool;
                if (this.parentElement.choice.value === "accept"){
                    bool = true;
                }else{
                    bool = false;
                }
                var relId = this.parentElement.parentElement.children[0].children[0].getAttribute("relId");
                beaverEvents.handleRequests(relId, bool);
                // remove the form
                var messageBox = this.parentElement.parentElement.parentElement;
                messageBox.children[0].children[0].children[0].classList.remove("friendRequest");
                document.getElementById("messageArea").removeChild(messageBox);
                beaverEvents.updateView(document.getElementsByClassName("profile")[0].getAttribute("id"));
            }
        }

        homeButton.onclick = function(){
            // switch to home screen
            beaverEvents.activeView = "homeScreen";
            beaverEvents.goToHome();
            beaverEvents.viewState.homeScreen.showMapButton();
            beaverEvents.displayBeavers();
        }

        imageUpload.addEventListener("change", readURL, true);
            // var image = document.getElementById("profilePic");
        function readURL(){
            var file = document.getElementById("imageUpload").files[0];
            var reader = new FileReader();
            var id = document.getElementsByClassName("profile")[0].getAttribute("id");
            reader.onloadend = function(){
                document.getElementById("profilePic").src = reader.result;
                beaverApp.beaverObjects[id].imagesrc = reader.result;
            }
            if (file){
                reader.readAsDataURL(file);
            }
        }
        // var id = document.getElementsByClassName("profile")[0].getAttribute("id");
        // alert(this.value);
        // beaverApp.beaverObjects[id].imagesrc = this.value;
        // beaverEvents.updateView(id);
        
    }
}