// import { MongoClient } from "mongodb";
import {readFile} from 'fs/promises';
import client from './dbConnection.js';

// const myDB = {
// 	domain: "localhost",
// 	port: 27017
// }

// const uri = `mongodb://${myDB.domain}:${myDB.port}`

try {

	//exemplo insere um
	// const produto = {
	// 	id_prod: 157,
	// 	nome: "Novo Produto Teste TRES",
	// 	descricao:"Testando inserção de novo produto"
	// }

	// const produtoCollection = client.db('loja').collection('produtos')
	// const result = await produtoCollection.insertOne(produto)

	//Insert Many

	//criando um array de objetos que representam cada documento
	// const produtos = [
	// 	{
	// 		id_prod: 558,
	// 		nome: "Novo Produto Teste quatro",
	// 		descricao: "Testando inserção de novo produto"
	// 	},
	// 	{
	// 		id_prod: 559,
	// 		nome: "Novo Produto Teste quinto",
	// 		descricao: "Testando inserção de novo produto"
	// 	},
	// 	{
	// 		id_prod: 560,
	// 		nome: "Novo Produto Teste sexto",
	// 		descricao: "Testando inserção de novo produto"
	// 	}
	// ]

	//alternativa ao array, leitura de uma arquivo json
	//lendo os dados a partir de um arquivo json
	const jsonFile = await readFile('./produtos.json')
	const produtos = JSON.parse(jsonFile);

	//inserindo varios documentos de uma vez só no banco loja na coleção produtos
	const result = await client.db('loja')
				.collection('produtos')
				.insertMany(produtos)


	result?.acknowledged && console.log("Produto inserido!!")
	console.log(result)



} catch (error) {
	console.log("ERROR")
	console.log(error)
}
finally {
	process.exit(0)
}