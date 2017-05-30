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
        return [{}, {}];
    },
    addNew: function(beaver){
        var message = "Success";
        //code here
        this.beaverObjects[3] = {name: "Beaverly",
                                 age: 6,
                                 sex: "female",
                                 location: ["Beavertown"],
                                 track: true};
        //return message(Success/failure);
        return message;
    },
    addLocation: function(beaverObj, location){
         var message = "Success";
        //code here

        //return message(Success/failure);
        this.beaverObjects["1"].location.push("Dublin");
        return message;
    },
    tracking: function(beaverObj){
        var message = "Toggled tracking";
        //code here

        //return message(Success/failure);
        this.beaverObjects["1"].track = !this.beaverObjects["1"].track;
        return message;
    }
}