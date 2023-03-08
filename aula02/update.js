import db from "./database.js"
import { update,ref} from "firebase/database";

const updatedObjects = {}

updatedObjects['users/-NQ0NYHJfE4Mx3yoIblz/email'] = "UPDATED"
updatedObjects['users/-NQ0QYOGoPJQyRkMZiep/profifle_picture'] = "UPDATED"
updatedObjects['users/-NQ0QYzK2U1C9gEOmihE/username'] = "UPDATED"
setTimeout(() => {
	update(ref(db,'users'), updatedObjects)
	.then(() => console.log('Atualização executada!'))
	.catch(() => console.error('Erro!'))
	.finally(()=>process.exit(0))
}, 1000);
