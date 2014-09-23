##Issue: ##
Executing an upsert:

    { $addToSet: { array: { $each: [] } } }
on an empty object (`{}`) yelds:

    [{"_id":"wKGTDDytyxBnWA2sy","array":[{"$each":[]}]}]
instead of

    [{"_id":"wKGTDDytyxBnWA2sy","array":[]}]

Executing on raw mongo:

    db.meteor.addToSet.update({},{ $addToSet: { array: { $each: [] } } }, {upsert:true})
    db.meteor.addToSet.find()

yelds, as expected:

    [{"_id":"wKGTDDytyxBnWA2sy","array":[]}]
