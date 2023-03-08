// Import the functions you need from the SDKs you need
import db from "./database.js";
import {ref, set} from "firebase/database";

const newUserID = 2;
const refNode = ref(db,`users/${newUserID}`);
const newUserData = {
	email:"beltrano@hotmail.com"
}
set(refNode, newUserData)
	.then(()=>console.log('Inserido!!!'))
	.catch(()=>console.log("Erro ao inserir!!"))
	.finally(()=>process.exit())
