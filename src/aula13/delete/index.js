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

    //Exemplo DELETE
    const filter = {id_prod:130};

    //Exemplo DELETEMANY
    // const filter = {id_prod:{$in:[205,206,207]}};

    const collection = client.db('loja').collection('produtos')
    const resultado = await collection.deleteMany(filter);
    console.log(resultado)

} catch (error) {
    console.log(error)
}
finally {
    await client.close()
    process.exit(0)
}