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
    getBeaverById: function(id){
        return this.beaverObjects[id];
    },
    incrementId: function(){
        this.nextId++;
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
        if (typeof(beaver.name)  == "string" && typeof(beaver.age) == "number" &&
            typeof(beaver.sex) == "string"){
                err = false;
                this.incrementId();
                this.beaverObjects[this.nextId] = beaver;
                //console.log(this.beaverObjects);
            }else{
                err = true;
                message = "Failed";
            }
        //console.log(this.beaverObjects);
        cb(err);
        //return message(Success/failure);
        return message;
    },
    addLocation: function(beaverId, location, cb){
         var message = "Success";
         var err;
        //code here

        // if id exists and location is a valid string, add the location to the beaver

        if (beaverId in this.beaverObjects
            && typeof(location) == "string"){
                this.beaverObjects[beaverId].location.push(location);
                err = false;
            }else{
                message = "failed";
                err = true;
            }
    
        cb(err);
        return message;
    },
    tracking: function(beaverId, cb){
        var message = "Toggled tracking";
        var err;
        //code here
        if (beaverId in this.beaverObjects){
            this.beaverObjects[beaverId].track = !this.beaverObjects[beaverId].track;
            err = false;
        }else{
            err = true;
            message = "failed";
        }
        
        //return message(Success/failure);
        cb(err);
        return message;
    }
}

module.exports = beaverApp;