var beaverRelations = {
    name: "beaverRelations",
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
    changeStatus: function(){
        // ARGS: (depends on how you choose to use status)
        // RETURNS:  success/not message
        // BEHAVIOR:  accesses the status of the indicated record and change it
    },
    addRelation: function(){
        // ARGS: int, beaver id 1 and beaver id 2
        // RETURNS: success/not message
        // BEHAVIOR:  uses the arguments to create a new relationship object which is saved into
        // 'relations' array.  status is set to default, messages data structure is initialized empty,
        // and ID is generated
    },
    addMessage: function(){
        // ARGS: string, the new message.  int, the id of the relationship
        // RETURNS:  success/not message
        // BEHAVIOR:  adds the message to the message history and allerts of success or failure.
    },
    deleteRelation: function(){
        // ARGS: id of the relation to be deleted
        // RETURNS: success/not message
        // BEHAVIOR:  deletes the relationship and returns an alert
    },
    getBuddies: function(beaverId){
        var buddyArray = [];
        for (bud in this.relRecords){
            if(this.relRecords[bud].beaverIdSender == beaverId){
                buddyArray.push(beaverApp.beaverObjects[this.relRecords[bud].beaverIdReceiver]);
            }
        }
        return buddyArray;
    }
}