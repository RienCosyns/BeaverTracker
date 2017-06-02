// Dummy controller script based on controller prompt

var beaverEvents = {
    modelState: {},
    viewState: {},
    addModel: function(model){
        this.modelState = model;
    },
    getViewState: function(view){
        this.viewState[view.name] = view;
    },
    displayBeavers: function(){
        //code here
        var arr = this.modelState.getAll();
        this.viewState.beaverBrowserViewer.displayBeavers(arr);
        handlers.setupEvents();
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
            this.modelState.addNew(beaver, (err) =>{
                if (err){
                    this.modelState.messages.push("Invalid arguments");
                    return false;
                }else{
                    this.modelState.messages.push("Beaver " + beaver.name + " added.");
                }
            });
            this.viewState.beaverBrowserViewer.displayMessages(this.modelState.messages);
            this.displayBeavers();
    },
    addLocation: function(beaverId, location){
        //code here
        this.modelState.addLocation(beaverId, location, (err) => {
            if (err){
                this.modelState.messages.push("Unknown location");
            }else{
                this.modelState.messages.push("Location added to " + this.modelState.getBeaverById(beaverId).name);
            }
        })
        this.viewState.beaverBrowserViewer.displayMessages(this.modelState.messages);
        this.displayBeavers();
    },
    toggleTracking: function(beaverId){
        //code here
        this.modelState.tracking(beaverId, (err) =>{
            if (err){
                this.modelState.messages.push("Beaver doesn't exist");
            }else{
                if (this.modelState.beaverObjects[beaverId].track){
                    this.modelState.messages.push("Tracking " + this.modelState.getBeaverById(beaverId).name);
                }else{
                    this.modelState.messages.push("No longer tracking " + this.modelState.getBeaverById(beaverId).name);
                }
            }
        });
        this.viewState.beaverBrowserViewer.displayMessages(this.modelState.messages);
        this.displayBeavers();       
    },
    untrackAll: function(){
        //code here
        for (key in this.modelState.beaverObjects){
            this.modelState.beaverObjects[key].track = false;
        }
        this.modelState.messages.push("No longer tracking any beavers");
        this.viewState.beaverBrowserViewer.displayMessages(this.modelState.messages);
        this.displayBeavers();
    },
    trackAll: function(){
        //code here
        for (key in this.modelState.beaverObjects){
            this.modelState.beaverObjects[key].track = true;
        }
        this.modelState.messages.push("Tracking all beavers");
        this.viewState.beaverBrowserViewer.displayMessages(this.modelState.messages);
        this.displayBeavers();
    }
}

var handlers = {
    setupEvents: function(){
        var addButton = document.getElementById("addButton");
        var addLocationButtons = document.getElementsByClassName("locationButtons");
        var trackButtons = document.getElementsByClassName("trackButtons");
        var trackAllButton = document.getElementById("trackAllButton");
        var untrackAllButton = document.getElementById("untrackAllButton");

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

        trackAllButton.onclick = function(){
            beaverEvents.trackAll();
        }

        untrackAllButton.onclick = function(){
            beaverEvents.untrackAll();
        }
    }
}