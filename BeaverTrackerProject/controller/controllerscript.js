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
                    alert("Invalid arguments");
                    return false;
                }else{
                    alert("Beaver added");
                    this.displayBeavers();
                }
            });
            handlers.setupEvents();
    },
    addLocation: function(beaverId, location){
        //code here
        this.modelState.addLocation(beaverId, location, (err) => {
            if (err){
                alert("Unknown location");
            }else{
                alert("Location added to " + this.modelState.getBeaverById(beaverId).name);
                this.displayBeavers();
            }
        })

        handlers.setupEvents();

    },
    toggleTracking: function(beaverObj){
        //code here
        console.log(beaverApp.tracking(beaverObj));
    },
    untrackAll: function(){
        //code here
        console.log("All untracked");
    },
    trackAll: function(){
        //code here
        console.log("Tracking");
    }
}

var handlers = {
    setupEvents: function(){
        var addButton = document.getElementById("addButton");
        var addLocationButton = document.getElementsByClassName("locationButtons");

        addButton.onclick = function(){
            var name = document.getElementById("nameInput").value;
            var age = parseInt(document.getElementById("ageInput").value);
            var sex = document.getElementById("sexInput").value;
            var location = document.getElementById("locationInput").value;
            beaverEvents.addBeaver(name,age,sex,location);
            document.getElementById("myForm").reset();
        }

        for (var i = 0; i < addLocationButton.length; i++){
            addLocationButton[i].onclick = function(){
                var locationPrompt = prompt("Please add new location");
               // console.log(this.parentElement.getAttribute("id"));
                var id = this.parentElement.getAttribute("id");
                beaverEvents.addLocation(id, locationPrompt);
            }
        }
    }
}