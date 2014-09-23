### Running ###

    git clone https://github.com/rzymek/meteor-issue-addToSet-each-upsert.git
    cd meteor-issue-addToSet-each-upsert
    meteor

Output (console):

    => Started proxy.
    => Started MongoDB.
    I20140923-12:50:47.418(2)? [{"_id":"hQAsEoBWiAtoXyQ8D","array":[{"$each":[]}]}]
    => Started your app.

Expected:

    => Started proxy.
    => Started MongoDB.
    I20140923-12:50:47.418(2)? [{"_id":"hQAsEoBWiAtoXyQ8D","array":[]}]}]
    => Started your app.

### Pull request ###

https://github.com/meteor/meteor/pull/2671

### Issue ###
The `$each` is inserted instead of executed. Occurs when new field is created during upsert with `$addToSet`.

Executing an upsert:

    { $addToSet: { array: { $each: [] } } }
on an empty object (`{}`) yelds:

    [{"_id":"wKGTDDytyxBnWA2sy","array":[{"$each":[]}]}]
instead of

    [{"_id":"wKGTDDytyxBnWA2sy","array":[]}]

### Raw MongoDB ###
Executing on raw mongo:

    db.meteor.addToSet.update({},{ $addToSet: { array: { $each: [] } } }, {upsert:true})
    db.meteor.addToSet.find()

yelds, as expected:

    [{"_id":"wKGTDDytyxBnWA2sy","array":[]}]

### Reproduction project ###
https://github.com/rzymek/meteor-issue-addToSet-each-upsert

Also this pull request includes test case, that fails without the fix.

### Implementation ###

Use the same `$each` handing code when creating a field as when updating one.
