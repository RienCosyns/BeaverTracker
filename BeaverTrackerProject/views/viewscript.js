// empty viewscript based on the view prompt
// just console logs for now

var beaverConsoleViewer = {
    name: "beaverConsoleViewer",
    displayBeavers: function(arr){
        //args : nada

        // code here
        arr.forEach(function(element) {
            console.log(element);
        }, this);  
    },
    stringifyBeaver: function(beaverObj){
        var beaverString = "";
        beaverString = beaverObj.name + " is " + beaverObj.age + " years old, " + beaverObj.sex + 
                        " and was spotted in " + beaverObj.location + ".";
        console.log(beaverString);
    }
}

module.exports = beaverViewer;