import db from "../libs/firebase/rtdb_conection.js";
import {ref, set} from "firebase/database";

const newUserID = 3;
const refNode = ref(db,`users/${newUserID}`);
const newUserData = {
	email:"beltrano@hotmail.com"
}
set(refNode, newUserData)
	.then(()=>console.log('Inserido!!!'))
	.catch(()=>console.log("Erro ao inserir!!"))
	.finally(()=>process.exit())
