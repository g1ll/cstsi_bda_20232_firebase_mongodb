import { MongoClient } from 'mongodb'

const myDB = {
    server: 'localhost',
    port: 27017,
}
const uri = `mongodb://${myDB.server}:${myDB.port}`;
const client = new MongoClient(uri);

try {
    await client.connect()
    if (!client.db('admin').command({ "ping": 1 }))
        throw Error("Erro ao conectar ao banco !!")
    console.log('Conectado!')

    // Exemplo DELETE
    // const filter = {id_prod:130};

    //Exemplo DELETEMANY
    // const filter = {id_prod:{$in:[132,131,136]}};
    const filter = {preco:{$lt:1500}};

    const collection = client.db('lojaAula12').collection('produtos')
    // const resultado = await collection.deleteOne(filter);
    const resultado = await collection.deleteMany(filter);
    console.log(resultado)

} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}