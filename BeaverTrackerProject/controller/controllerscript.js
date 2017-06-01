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
            if (location !== undefined){
                beaver.location.push(location);
            }
            console.log(beaver);
            beaverApp.addNew(beaver);
            this.displayBeavers();
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