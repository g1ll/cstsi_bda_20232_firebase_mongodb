import db from "../libs/firebase/rtdb_connection.js";
import { update,ref} from "firebase/database";

const updatedObject = {
	// email:"UPDATED",
	username:'childChangedOff'
}

setTimeout(() => {
	update(ref(db,'user/3'), updatedObject)
	.then(() => console.log('Atualização executada!'))
	.catch(() => console.error('Erro!'))
	.finally(()=>process.exit(0))
}, 2000);
