import db from "../libs/firebase/rtdb_connection.js";
import { update,ref} from "firebase/database";

const updatedObject = {
	// email:"UPDATED",
	profile_picture:'UPDATED IMAGE'
}

setTimeout(() => {
	update(ref(db,'user/-NbyLzwl8tuHumN-yX_B'), updatedObject)
	.then(() => console.log('Atualização executada!'))
	.catch(() => console.error('Erro!'))
	.finally(()=>process.exit(0))
}, 2000);
