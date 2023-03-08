import db from "./database.js"
import { push, ref } from "firebase/database";

const newUser = {
	email: 'testandoEx02@gmail.com',
	profifle_picture: "noimg",
	username: "test_exemplo2"
}

try{
	await push(ref(db, 'users/'), newUser)
	console.log('Inserido!')
}catch(error){
	console.log("Erro: "+error)
}finally{
	console.log('Finalizando ...')
	process.exit(0)
}

