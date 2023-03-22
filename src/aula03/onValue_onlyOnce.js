import { onValue, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_conection.js"


const node = "users"
//ONVALUE ONLY-ONCE
onValue(ref(db,node),(snapshot)=>{ //()=>{}
    if(!snapshot.exists()){
        console.log("Nó não encontrado")
        return process.exit(0)
    }
	console.table(snapshot.val())
},{onlyOnce:true});