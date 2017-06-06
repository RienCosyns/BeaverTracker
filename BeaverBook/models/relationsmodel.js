var beaverRelations = {
    relRecords : {
        id: 0, // unique for this record
        beaverIdSender: 0,
        beaverIdReceiver: 1,
        messageHistory: [],
        isAccepted: boolean, // true or false
        status: "" // relationship status
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
    }
}