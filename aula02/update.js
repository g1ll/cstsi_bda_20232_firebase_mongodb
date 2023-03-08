import db from "./database.js"
import { update,ref} from "firebase/database";

const updatedObjects = {}

/*
-NQ1SPJa0zcK6BQQdjZn
-NQ1SPo_T0HV0LZyDZai
-NQ1SQNpv5l8O56mzUWI
*/

updatedObjects['users/-NQ1SPJa0zcK6BQQdjZn/email'] = "UPDATED"
updatedObjects['users/-NQ1SPo_T0HV0LZyDZai/profifle_picture'] = "UPDATED"
updatedObjects['users/-NQ1SQNpv5l8O56mzUWI/username'] = "UPDATED"


console.log(updatedObjects)

setTimeout(() => {
	update(ref(db), updatedObjects)
	.then(() => console.log('Atualização executada!'))
	.catch(() => console.error('Erro!'))
	.finally(()=>process.exit(0))
}, 1500);
