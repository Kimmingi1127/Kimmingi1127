// const {MongoClient} = require('mongodb');
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);

// async function run() {
//   await client.connect();
//   const adminDB = client.db("testdb").admin();
//   const listDatabases = await adminDB.listDatabases();
//   console.log(listDatabases);
//   return "OK";
// }

// run()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

async function main() {
    try {
        await client.connect();
        const collection = client.db("test").collection("users");

        await collection.insertOne({name: "Andy", age: 25});
        console.log("document inserted");

        const documents = await collection.find({ name: "Andy"}).toArray();
        console.log("찾은 document", documents);

        await collection.updateOne({name: "Andy"}, {$set: {age: 31}});
        console.log("document updated");

        await collection.deleteOne({name: "Andy"});
        console.log("document deleted");

        await client.close();
    } catch(err) {
        
    }
}