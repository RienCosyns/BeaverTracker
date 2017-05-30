// empty viewscript based on the view prompt
// just console logs for now

var beaverViewer = {
    displayBeavers: function(){
        //args : nada

        // code here
        console.log(beaverEvents.displayBeavers());  
    },
    stringifyBeaver: function(beaverObj){
        beaverString = "Billy, 5 years old, male, spotted in Galway";

        //code here

        console.log(beaverString);
    },
    addLocationButton: function(){
        //code here
        console.log(beaverApp.beaverObjects["1"].location.push("Dublin"));
    },
    addTrackButton: function(){
        //code here
        console.log(beaverApp.beaverObjects["1"].track)
    },
    untrackAllButton: function(){
        //code here
        console.log("All untracked")
    },
    trackAllButton: function(){
        //code here
        console.log("tracking all");
    }
}