// dummy beaverApp object based on the prompt

var beaverApp = {
    nextId: 0,
    beaverObjects: {
        0 : {
        name: "Paddy",
        age: 5,
        sex: "male",
        location: ["Galway"],
        track: true
        }
    },
    incrementId: function(){
        this.nextId++;
    },
    getBeaverById: function(id){
        return this.beaverObjects[id];
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
    addNew: function(beaver, cb){
        var message = "Success";
        var err;
        //code here
        // check if beaver has name, age and sex   
        //console.log("age: " + beaver.age == "number");
        if (typeof(beaver.name)  == "string" && !isNaN(beaver.age) &&
            typeof(beaver.sex) == "string"){
                if (beaver.name.length > 0 && beaver.sex.length > 0){
                    err = false;
                    this.incrementId();
                    this.beaverObjects[this.nextId] = beaver;
                    //console.log(this.beaverObjects);
                }else{
                    err = true;
                    message = "Failed";
                }
            }else{
                err = true;
                message = "Failed";
            }
        //console.log(this.beaverObjects);
        cb(err);
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
