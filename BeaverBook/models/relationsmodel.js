var beaverRelations = {
    name: "beaverRelations",
    currentId: 1,
    relRecords : {
        0: {
            id: 0, // unique for this record
            beaverIdSender: 0,
            beaverIdReceiver: 1,
            messageHistory: ["Hi There!"],
            isAccepted: true, // true or false
            status: "Besties" // relationship status
        },
        1: {
            id: 1,
            beaverIdSender: 0,
            beaverIdReceiver: 2,
            messageHistory: ["Hi, want to build a dam together?"],
            isAccepted: false,
            status: "It's complicated"
        }
    },
    incrementId: function(){
        this.currentId++;
    },
    changeStatus: function(){
        // ARGS: (depends on how you choose to use status)
        // RETURNS:  success/not message
        // BEHAVIOR:  accesses the status of the indicated record and change it
    },
    addRelation: function(relation, cb){
        var message = "Success";
        var err;
        for (id in this.relRecords){
            if (this.relRecords[id].beaverIdSender == relation.beaverIdSender
                 && this.relRecords[id].beaverIdReceiver == relation.beaverIdReceiver){
                message = "Relation already exists";
                err = true;
                cb(err);
                return message;
            }
        }
        this.incrementId();
        this.relRecords[this.currentId] = relation;
        this.relRecords[this.currentId].id = this.currentId;
        err = false;
        
        cb(err);
        return message;
    },
    addMessage: function(){
        // ARGS: string, the new message.  int, the id of the relationship
        // RETURNS:  success/not message
        // BEHAVIOR:  adds the message to the message history and allerts of success or failure.
    },
    deleteRelation: function(id1, id2, cb){
        var err;
        for (id in this.relRecords){
            if (this.relRecords[id].beaverIdSender == id1){
                if (this.relRecords[id].beaverIdReceiver == id2){
                    delete this.relRecords[id];
                    err = false;
                    break;
                }else{
                    err = true;
                }
            }else{
                err = true;
            }
        }
        cb(err);
    },
    getOthers: function(beaverId){
        var all = beaverApp.getAll();
        // remove the profile owner 
        for (var j = 0; j < all.length; j++){
            if (all[j].id == beaverId){
                all.splice(j, 1);
            }
        }

        // remove all beavers with whom he's already friends

        for (id in this.relRecords){
            if (this.relRecords[id].beaverIdSender == beaverId && this.relRecords[id].isAccepted == true){
                for (var i = 0; i < all.length;i++){
                    if (all[i].id == this.relRecords[id].beaverIdReceiver){
                        all.splice(i, 1);
                    }
                }
            }
        }
        return all;
    },
    getBuddies: function(beaverId){
        var buddyArray = [];
        for (bud in this.relRecords){
            if(this.relRecords[bud].beaverIdSender == beaverId && this.relRecords[bud].isAccepted == true){
                buddyArray.push(beaverApp.beaverObjects[this.relRecords[bud].beaverIdReceiver]);
            }
        }
        return buddyArray;
    }
}

// var heart = "<i class=\"fa fa-heart\" aria-hidden=\"true\"></i>";
// var chain = "<i class=\"fa fa-chain-broken\" aria-hidden=\"true\"></i>";