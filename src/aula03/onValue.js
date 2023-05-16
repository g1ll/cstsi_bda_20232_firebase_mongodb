import db from "../libs/firebase/rtdb_connection.js"
import { onValue, orderByChild, query, ref } from "firebase/database";

const node = "produtos"
const userRef = ref(db,node)
//ONVALUE
let consulta = query(
    userRef//orderByChild('idade')
  );

onValue(userRef,(snapshot)=>{
    if(!snapshot.exists())
        return console.log("Nó não encontrado")
    
    console.log(snapshot.val())
});


