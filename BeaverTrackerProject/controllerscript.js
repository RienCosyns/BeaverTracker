// Dummy controller script based on controller prompt

var beaverEvents = {
    displayBeavers: function(){
        //code here
        var arr =  beaverApp.getAll();
        beaverViewer.displayBeavers(arr);

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
        beaverApp.addLocation(this.beaverObjects["1"], "Dublin");

    },
    toggleTracking: function(beaverObj){
        //code here
        beaverApp.tracking(!this.beaverObjects["1"].track)
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