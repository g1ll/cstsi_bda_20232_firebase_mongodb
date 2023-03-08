// Import the functions you need from the SDKs you need
import db from "./database.js";
import {ref, child,set} from "firebase/database";

const refNode = ref(db,'users/-NQ1ECT2srezfshww1V6')
const refAttr = child(refNode,'username')

try{
	await set(refAttr, "Exemplo01")
	console.log("Alterado!!!")
}catch(error){
	console.log("Error:"+error)
}finally{
	console.log("Finish!!!")
	process.exit(0)
}
