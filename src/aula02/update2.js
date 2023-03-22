import db from "../libs/firebase/rtdb_conection.js";
import { update,ref} from "firebase/database";

const updatedObject = {
	email:"UPDATED2",
	profile_picture:'UPDATED2'
}


setTimeout(() => {
	update(ref(db,'users/-NQ1SQNpv5l8O56mzUWI'), updatedObject)
	.then(() => console.log('Atualização executada!'))
	.catch(() => console.error('Erro!'))
	.finally(()=>process.exit(0))
}, 1500);
