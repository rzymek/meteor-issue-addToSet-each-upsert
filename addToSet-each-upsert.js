if (Meteor.isServer) {
    Meteor.startup(function(){
        var AddToSet  = new Mongo.Collection('addToSet');
        AddToSet.remove({});

        AddToSet.update({},{ $addToSet: { array: { $each: [] } } }, {upsert:true});

        var result = AddToSet.find().fetch();
        console.log(JSON.stringify(git result));
    })
}
