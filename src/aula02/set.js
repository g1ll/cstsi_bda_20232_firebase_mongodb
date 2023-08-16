import db from "../libs/firebase/rtdb_connection.js";
import {ref, set} from "firebase/database";

const newUserID = 5;
const refNode = ref(db,`user/${newUserID}`);
const newUserData = {
	email:"beltrano@hotmail.com",
	nome:"Beltrano"
}
set(refNode, newUserData)
	.then(()=>console.log('Inserido!!!'))
	.catch(()=>console.log("Erro ao inserir!!"))
	.finally(()=>process.exit())
