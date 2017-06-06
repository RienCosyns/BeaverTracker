// dummy beaverApp object based on the prompt

var beaverApp = {
    name: "beaverApp",
    nextId: 0,
    beaverObjects: {
        0 : {
        name: "Paddy",
        age: 5,
        sex: "male",
        location: ["Galway"],
        track: true,
        imagesrc: "images/beaver_0.jpg"
    },
        1: {
            name: "Beaverly",
            age: 4,
            sex: "female",
            location: ["Paris"],
            track: true,
            imagesrc: "images/beaver_1.jpg"
        },
        2: {
            name: "Beafy",
            age: 7,
            sex: "Other",
            location: ["Beaverton"],
            track: false,
            imagesrc: "images/beaver_2.jpg"
        },
        3: {
            name: "Beafster",
            age: 2,
            sex: "Male",
            location: ["Beaver County"],
            track: true,
            imagesrc: "images/beaver_3.jpg"
        },
        4: {
            name: "Ricardp",
            age: 9,
            sex: "Male",
            location: ["Rome"],
            track: false,
            imagesrc: "images/beaver_4.jpg"
        },
        5: {
            name: "Beavonda",
            age: 7,
            sex: "Female",
            location: ["Portland"],
            track: false,
            imagesrc: "images/beaver_5.jpg"
        }
    },
    message: "",
    incrementId: function(){
        this.nextId++;
    },
    getBeaverById: function(id){
        return this.beaverObjects[id];
    },
    getBeaverId: function(beaverName){
        var keys = Object.keys(this.beaverObjects);
        for (var i = 0; i < keys.length; i++){
            if (beaverName == this.beaverObjects[keys[i]].name){
                return keys[i];
            }
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
    addLocation: function(beaverId, location, cb){
         var message = "Success";
         var err;
        //code here

        // if id exists and location is a valid string, add the location to the beaver

        if (beaverId in this.beaverObjects
            && isNaN(location) && typeof(location) == "string"){
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
