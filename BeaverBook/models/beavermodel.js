// dummy beaverApp object based on the prompt

var beaverApp = {
    name: "beaverApp",
    currentId: 5,
    beaverObjects: {
        0 : {
        id: 0,
        name: "Paddy",
        age: 5,
        sex: "male",
        location: ["Galway"],
        track: true,
        imagesrc: "images/beaver_0.jpg",
        profileMessages: []
        },
        1: {
            id: 1,
            name: "Beaverly",
            age: 4,
            sex: "female",
            location: ["Paris"],
            track: true,
            imagesrc: "images/beaver_1.jpg",
            profileMessages: []
        },
        2: {
            id: 2,
            name: "Beafy",
            age: 7,
            sex: "Other",
            location: ["Beaverton"],
            track: false,
            imagesrc: "images/beaver_2.jpg",
            profileMessages: []
        },
        3: {
            id: 3,
            name: "Beafster",
            age: 2,
            sex: "Male",
            location: ["Beaver County"],
            track: true,
            imagesrc: "images/beaver_3.jpg",
            profileMessages: []
        },
        4: {
            id: 4,
            name: "Ricardo",
            age: 9,
            sex: "Male",
            location: ["Rome"],
            track: false,
            imagesrc: "images/beaver_4.jpg",
            profileMessages: []
        },
        5: {
            id: 5,
            name: "Beavonda",
            age: 7,
            sex: "Female",
            location: ["Portland"],
            track: false,
            imagesrc: "images/beaver_5.jpg",
            profileMessages: []
        }
    },
    message: "",
    incrementId: function(){
        this.currentId++;
    },
    getBeaverById: function(id){
        return this.beaverObjects[id];
    },
    getBeaverId: function(beaverName){
        for (id in this.beaverObjects){
            if (this.beaverObjects[id].name == beaverName){
                return this.beaverObjects[id].id;
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
                    this.beaverObjects[this.currentId] = beaver;
                    this.beaverObjects[this.currentId].id = this.currentId;
                    this.beaverObjects[this.currentId].imagesrc = "images/beaver_default.png";
                    this.beaverObjects[this.currentId].profileMessages = [];
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
    },
    addProfileMessage(id, message){
        if (id in this.beaverObjects){
            this.beaverObjects[id].profileMessages.push(message);
        }
    },
    modifyBeaver: function(id, key, value){
        if (id in this.beaverObjects){
            this.beaverObjects[id][key] = value;
        }
    }
}
