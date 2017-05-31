// empty viewscript based on the view prompt
// just console logs for now

var beaverConsoleViewer = {
    name: "beaverConsoleViewer",
    displayBeavers: function(arr){
        //args : nada

        // code here
        for (var i = 0; i < arr.length;i++){
            this.stringifyBeaver(arr[i]);
        } 
    },
    stringifyBeaver: function(beaverObj){
        var beaverString = "";
        beaverString = beaverObj.name + " is " + beaverObj.age + " years old, " + beaverObj.sex + 
                        " and was spotted in " + beaverObj.location + ".";
        console.log(beaverString);
    }
}

module.exports = beaverConsoleViewer;