var beaverRelations = {
    name: "beaverRelations",
    currentId: 1,
    relRecords : {
        0: {
            id: 0, // unique for this record
            beaverIdSender: 0,
            beaverIdReceiver: 1,
            messageHistory: ["<h3 class=\"messageTitle\">Paddy: <p class=\"messages\">Hi There!</p></h3>"],
            isAccepted: true, // true or false
            status: "Besties" // relationship status
        },
        1: {
            id: 2, // unique for this record
            beaverIdSender: 1,
            beaverIdReceiver: 0,
            messageHistory: ["<h3 class=\"messageTitle\">Paddy: <p class=\"messages\">Hi There!</p></h3>"],
            isAccepted: true, // true or false
            status: "Besties"
        }
    },
    incrementId: function(){
        this.currentId++;
    },
    getRelation: function(id1, id2){
        for (key in this.relRecords){
            if (this.relRecords[key].beaverIdSender == id1 && this.relRecords[key].beaverIdReceiver == id2){
                return key
            }
        }
    },
    changeStatus: function(relationId, newStatus){
        if (relationId in this.relRecords){
            this.relRecords[relationId].status = newStatus;
        }
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
    addMessage: function(relationId, message){
        var totalMessage = "<h3 class=\"messageTitle\">" +  beaverApp.beaverObjects[this.relRecords[relationId].beaverIdSender].name +
                         ": <p class=\"messages\">" + message + "</p></h3>";
        var mirroredRelation;
        var sender = this.relRecords[relationId].beaverIdReceiver;
        var receiver = this.relRecords[relationId].beaverIdSender;

        if (relationId in this.relRecords){
            this.relRecords[relationId].messageHistory.push(totalMessage);
        }

        for (key in this.relRecords){
            if (this.relRecords[key].beaverIdSender == sender
                && this.relRecords[key].beaverIdReceiver == receiver){
                    mirroredRelation = key;
                }
        }

        this.relRecords[mirroredRelation].messageHistory.push(totalMessage);
        
    },
    getMessages: function(relationId){
        if (relationId in this.relRecords){
            if (this.relRecords[relationId].messageHistory.length == 0){
                this.relRecords[relationId].messageHistory.push("<h3 class=\"messageTitle\">Start conversation with " +
                    beaverApp.beaverObjects[this.relRecords[relationId].beaverIdReceiver].name +
                "</h3>");
            }
            return this.relRecords[relationId].messageHistory;
        }
    },
    deleteRelation: function(id1, id2, cb){
        var err;
        var count = 0;

        for (id in this.relRecords){
            if (this.relRecords[id].beaverIdSender == id1 || this.relRecords[id].beaverIdSender ==id2 ){
                if (this.relRecords[id].beaverIdReceiver == id2 || this.relRecords[id].beaverIdReceiver == id1){
                    delete this.relRecords[id];
                    count++
                    err = false;
                }else{
                    err = true;
                }
            }else{
                err = true;
            }
            if (count == 2){
                break;
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
    },
    handleRequests: function(relId, bool){
        if (bool){
            // accept
            this.relRecords[relId].isAccepted = true;

            // create a mirrored relation
            var sender = this.relRecords[relId].beaverIdReceiver;
            var receiver = this.relRecords[relId].beaverIdSender;
            this.incrementId();
            var newRelation = {
                id: this.currentId,
                beaverIdSender: sender,
                beaverIdReceiver: receiver,
                messageHistory: [],
                isAccepted: true,
                status: "Status?"
            }
            beaverApp.beaverObjects[this.relRecords[relId].beaverIdSender].profileMessages.push(beaverApp.beaverObjects[sender].name + " has accepted your friend request");
            beaverApp.beaverObjects[this.relRecords[relId].beaverIdReceiver].profileMessages.push("Friend request accepted from " + beaverApp.beaverObjects[receiver].name);
            this.relRecords[this.currentId] = newRelation;
        }else{
            beaverApp.beaverObjects[this.relRecords[relId].beaverIdReceiver].profileMessages.push("Friend requests rejected from " +
                beaverApp.beaverObjects[this.relRecords[relId].beaverIdSender].name);
            delete this.relRecords[relId];
            
        }
    }
}

// var heart = "<i class=\"fa fa-heart\" aria-hidden=\"true\"></i>";
// var chain = "<i class=\"fa fa-chain-broken\" aria-hidden=\"true\"></i>";