import db from "../libs/firebase/rtdb_conection.js";
import { update,ref} from "firebase/database";

const updatedObjects = {}

updatedObjects['users/-NR8_2qC7w1AgdntUekA/email'] = "UPDATED"
updatedObjects['users/-NR8_3XwbYuzzOEGqdgG/profifle_picture'] = "UPDATED"
updatedObjects['users/-NR8_47uxklEcQftSb5S/username'] = "UPDATED"


console.log(updatedObjects)

setTimeout(() => {
	update(ref(db), updatedObjects)
	.then(() => console.log('Atualização executada!'))
	.catch(() => console.error('Erro!'))
	.finally(()=>process.exit(0))
}, 1500);
