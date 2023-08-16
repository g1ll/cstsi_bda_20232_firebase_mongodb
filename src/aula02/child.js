// Import the functions you need from the SDKs you need
import db from "../libs/firebase/rtdb_connection.js";
import {ref, child,set} from "firebase/database";

const refNode = ref(db,'user/-NbyLzwl8tuHumN-yX_B')
const refAttr = child(refNode,'email')

try{
	await set(refAttr, "teste@dev.com")
	console.log("Alterado!!!")
}catch(error){
	console.log("Error:"+error)
}finally{
	console.log("Finish!!!")
	process.exit(0)
}
