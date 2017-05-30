// dummy beaverApp object based on the prompt

var beaverApp = {
    beaverObjects: {
        1 : {
        name: "Paddy",
        age: 5,
        sex: "male",
        location: ["Galway"],
        track: true
        },
        2 : {},
    },
    getAll: function(){
        // args: /
        var beavers = [];
        //code here

        //return array
        return this.beaverObjects["1"];
    },
    addNew: function(beaverObj){
        var message = "Success";
        //code here

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