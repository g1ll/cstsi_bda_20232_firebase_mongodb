import { onValue, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_conection.js"

const node = "users"
//ONVALUE
onValue(ref(db,node),(snapshot)=>{
    if(!snapshot.exists())
        return console.log("Nó não encontrado")
    
    console.log(snapshot.val())
});


