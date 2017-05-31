// dummy beaverApp object based on the prompt

var beaverApp = {
    beaverObjects: {
        0 : {
        name: "Paddy",
        age: 5,
        sex: "male",
        location: ["Galway"],
        track: true
        }
    },
    getAll: function(){
        // args: /
        var beavers = [];
        //code here
        for (key in this.beaverObjects){
            beavers.push(this.beaverObjects[key]);
        }
        //return array
        return beavers;
    },
    addNew: function(beaverObj){
        var message = "Success";
        //code here
        var keys = Object.keys(this.beaverObjects);
        this.beaverObjects[keys.length] = beaverObj;
        console.log(this.beaverObjects);
        //return message(Success/failure);
        return message;
    },
    addLocation: function(beaverObj, location){
         var message = "Success";
        //code here

        //return message(Success/failure);
        return message;
    },
    tracking: function(beaverObj){
        var message = "Toggled tracking";
        //code here

        //return message(Success/failure);
        return message;
    }
}

console.log(beaverApp.getAll());