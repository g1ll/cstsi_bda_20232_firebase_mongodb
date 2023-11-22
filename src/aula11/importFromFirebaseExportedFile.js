import { readFile } from 'fs'
import client from './dbConnection.js'

const firebaseExportedFile = "produtos-from-firebase.json";

try {
    readFile(firebaseExportedFile, async (err, data) => {
        if (err) throw Error('Arquivo não encontrado!!')
        let fireDB = JSON.parse(data)
        if (typeof fireDB !== 'undefined' && fireDB) {
            const arrayItens = Object.entries(fireDB);
            const itens = Object.entries(arrayItens[0][1])
            const arrayDocs = [];
            itens.map((item) => {
                item[1].importado = item[1].importado?true:false;
                arrayDocs.push(item[1])
            })


            const mongoDb = client.db('shop')
            const mongoCollection = mongoDb.collection('produtos_fire')
            const result = await mongoCollection.insertMany(arrayDocs);
            if (result.insertedCount == 0)
                throw Error('Erro ao importar protudos!')
            console.info("Produtos importados com sucesso!")
            console.log({
                "sucess": true,
                "inserted": result.insertedCount,
                "result": result
            })
            process.exit(0)
        } else {
            throw Error('Erro ao ler configuração!')
        }
    });
} catch (err) {
    console.error(err);
}