if (Meteor.isServer) {
    Meteor.startup(function(){

        var AddToSet  = new Mongo.Collection('addToSet');

        AddToSet.remove({});

        AddToSet.update({},{ $addToSet: { array: { $each: [] } } }, {upsert:true});
        var result = AddToSet.find().fetch();
        console.log(JSON.stringify(result));
        /*
        Result:
            [{"_id":"wKGTDDytyxBnWA2sy","array":[{"$each":[]}]}]
                                                    ^
                                                    |
          $each operator inserted into collection --/
        */
    })
}

/*
Expected result:
    [{"_id":"wKGTDDytyxBnWA2sy","array":[]}]

Compare with raw mongo:
    db.meteor.addToSet.update({},{ $addToSet: { array: { $each: [] } } }, {upsert:true})
    db.meteor.addToSet.find()

One liner:
echo 'db.meteor.addToSet.update({},{ $addToSet: { array: { $each: [] } } }, {upsert:true});db.meteor.addToSet.find();' | meteor mongo
*/
