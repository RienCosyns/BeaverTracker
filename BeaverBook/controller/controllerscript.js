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
    updateView: function(id){
        var beaver = this.modelState.beaverApp.getBeaverById(id);
        var beaversArray = this.modelState.beaverRelations.getOthers(id);
        var buddies = this.modelState.beaverRelations.getBuddies(id);
        this.viewState.profileView.updateProfilePage(beaversArray, buddies, beaver);

        for (key in this.modelState.beaverRelations.relRecords){
            if (this.modelState.beaverRelations.relRecords[key].beaverIdSender == id){
                if (this.modelState.beaverRelations.relRecords[key].isAccepted == false){
                this.viewState.profileView.modifyFriendButton(this.modelState.beaverRelations.relRecords[key].beaverIdReceiver);
                }
            } 
        }

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
    },
    addRelation: function(id1, id2){
        var relation = {
            beaverIdSender: id1,
            beaverIdReceiver: id2,
            messageHistory: [],
            isAccepted: false,
            status: ""
        }
        this.modelState.beaverRelations.addRelation(relation, (err) => {
            if (err){
                alert("Relationship already exists");
            }else{
                alert("Relationship added between: " + this.modelState.beaverApp.beaverObjects[id1].name + 
                        " and " + this.modelState.beaverApp.beaverObjects[id2].name);
            }
        })

        this.updateView(id1);
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
            alert("clicked");
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

        for (var i = 0; i < friendButtons.length;i++){
            friendButtons[i].onclick = function(){
                // run the addRelation method
                var id1 = document.getElementsByClassName("profile")[0].getAttribute("id");
                var id2 = this.parentElement.getAttribute("id");
                beaverEvents.addRelation(id1, id2);
            }
        }
    }
}