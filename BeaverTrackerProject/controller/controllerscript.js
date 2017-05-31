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
    addLocation: function(beaverObj, location){
        //code here
        console.log(beaverApp.addLocation(beaverObj, location));

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

module.exports = beaverEvents;