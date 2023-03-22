// Import the functions you need from the SDKs you need
import db from "../libs/firebase/rtdb_conection.js";
import {ref, child,set} from "firebase/database";

const refNode = ref(db,'users/-NR8_2qC7w1AgdntUekA')
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
