const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const URL = process.env.DATABASE_URL
const DATABASE = process.env.DATABASE_NAME

console.log(URL)
console.log(DATABASE)

let db
let client

function getClient() {
    return new Promise((resolve, reject) => {
        if (!client) {
            MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, })
                .then(c => {
                    client = c
                    resolve(client)
                })
                .catch(reject)
        } else {
            resolve(client)
        }
    })
}

function getDB() {
    return new Promise((resolve, reject) => {
        getClient()
            .then(client => {
                db = client.db(DATABASE)
                resolve(db)
            })
            .catch(reject)
    })
}

function getCollection(collectionName) {
    return new Promise((resolve, reject) => {
        getDB()
            .then(db => {
                resolve(db.collection(collectionName))
            })
            .catch(err => reject(err))
    })
}

function listCollections() {
    return new Promise((resolve, reject) => {
        getDB()
            .then(db => db.collections())
            .then(names => resolve(names.map(name => name.s.name)))
            .catch(err => reject(err))
    })
}

function listCollection(collectionName) {
    return new Promise((resolve, reject) => {
        console.log(`getCollection(collectionName)`)
        getCollection(collectionName)
            .then(collection => {
                console.log(`.then(collection => {`)
                console.log(`resolve(collection.find({}).toArray())`)
                resolve(collection.find({}).sort( [['_id', -1]] ).toArray())
            })
            .catch(reject)
    })
}

function findOneInCollectionByObjectId(collectionName, objectId) {
    return new Promise((resolve, reject) => {
        getCollection(collectionName)
            .then(collection => {
                collection.findOne({ _id: ObjectID(objectId) })
                    .then(result => {
                        resolve(result)
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

function findOneInCollection(collectionName, model) {
    return new Promise((resolve, reject) => {
        getCollection(collectionName)
            .then(collection => {
                collection.findOne(model)
                    .then(result => {
                        resolve(result)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
            .catch(err => {
                reject(err)
            })
    })
}

function insertIntoCollection(collectionName, model) {
    return new Promise((resolve, reject) => {
        getCollection(collectionName)
            .then(collection => {
                collection.insertOne(model)
                    .then(response => {
                        resolve(response.ops)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
    })
}

function insertManyIntoCollection(collectionName, models) {
    console.log('before sending promise')
    return new Promise((resolve, reject) => {
        console.log('gettin the collection')
        getCollection(collectionName)
            .then(collection => {
                console.log('inserting many into collection')
                console.log(models)
                collection.insertMany(models)
                    .then(response => {
                        console.log({response})
                        resolve(response.ops)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
    })
}

function deleteOneInCollection(collectionName, model) {
    return new Promise((resolve, reject) => {
        getCollection(collectionName)
            .then(collection => {
                collection.deleteOne(model)
                    .then(response => {
                        resolve(response)
                    })
            })
    })
}

function updateOneInCollection(collectionName, findModel, updateModel) {
    return new Promise((resolve, reject) => {
        getCollection(collectionName)
            .then(collection => {
                collection.updateOne(findModel, { $set: updateModel })
                    .then(response => resolve(response))
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

function updateOneInCollectionByObjectId(collectionName, objectId, updateModel) {
    return new Promise((resolve, reject) => {
        getCollection(collectionName)
            .then(collection => {
                collection.updateOne({_id: ObjectID(objectId)}, { $set: updateModel })
                    .then(response => resolve(response))
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

function deleteOneInCollectionByObjectId(collectionName, objectId) {
    return new Promise((resolve, reject) => {
        getCollection(collectionName)
            .then(collection => {
                collection.deleteOne({_id: ObjectID(objectId)})
                    .then(response => resolve(response))
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    listCollections,
    getCollection,
    listCollection,
    insertIntoCollection,
    deleteOneInCollection,
    updateOneInCollection,
    updateOneInCollectionByObjectId,
    findOneInCollection,
    findOneInCollectionByObjectId,
    deleteOneInCollectionByObjectId,
    getClient,
    insertManyIntoCollection,
}
