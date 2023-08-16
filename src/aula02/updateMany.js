import db from "../libs/firebase/rtdb_connection.js";
import { update,ref} from "firebase/database";

const updatedObjects = {}

updatedObjects['user/-NbyKH-XNsy9sKhc0g80/username'] = "UPDATEDMANY"
updatedObjects['user/-NbyKLhuUXdHQwmNCdjN/username'] = "UPDATEDMANY"
updatedObjects['user/-NbyLzwl8tuHumN-yX_B/username'] = "UPDATEDMANY"


console.log(updatedObjects)

setTimeout(() => {
	update(ref(db), updatedObjects)
	.then(() => console.log('Atualização executada!'))
	.catch(() => console.error('Erro!'))
	.finally(()=>process.exit(0))
}, 2000);
