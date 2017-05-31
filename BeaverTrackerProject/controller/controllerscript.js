// Dummy controller script based on controller prompt

var beaverEvents = {
    modelState: {},
    viewState: {},
    addModel: function(model){
        this.modelState = model;
        //console.log(this.modelState);
    },
    getView: function(view){
        this.viewState[view.name] = view;
        //console.log(this.viewState);
    },
    displayBeavers: function(){
        //code here
        var arr = this.modelState.getAll();
        this.viewState.beaverConsoleViewer.displayBeavers(arr);
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
                    console.log("Invalid arguments");
                    return false;
                }else{
                    console.log("Beaver added");
                    this.displayBeavers();
                }
            });
    },
    addLocation: function(beaverId, location){
        //code here
        this.modelState.addLocation(beaverId, location, (err) => {
            if (err){
                console.log("Unknown location");
            }else{
                console.log("Location added to " + this.modelState.getBeaverById(beaverId).name);
                this.displayBeavers();
            }
        })

    },
    toggleTracking: function(beaverId){
        //code here
        this.modelState.tracking(beaverId, (err) =>{
            if (err){
                console.log("Beaver doesn't exist");
            }else{
                if (this.modelState.beaverObjects[beaverId].track){
                    console.log("Tracking " + this.modelState.getBeaverById(beaverId).name);
                }else{
                    console.log("No longer tracking " + this.modelState.getBeaverById(beaverId).name);
                }
            }
        });
        
    },
    untrackAll: function(){
        //code here
        for (key in this.modelState.beaverObjects){
            this.modelState.beaverObjects[key].track = false;
        }
        return "No longer tracking any beavers"
    },
    trackAll: function(){
        //code here
        for (key in this.modelState.beaverObjects){
            this.modelState.beaverObjects[key].track = true;
        }
        return "Tracking all beavers";
    }
}

module.exports = beaverEvents;