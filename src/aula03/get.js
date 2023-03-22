import db from "../libs/firebase/rtdb_conection.js"
import {ref, get, child} from "firebase/database"

const refDB = ref(db)
const node = "users"
const refNode = child(refDB,node)

//GET
get(refNode).then((snapshot)=>{
    if(!snapshot.exists())
      throw new Error("Nó não encontrado")
    console.table(snapshot.val())
}).catch((erro)=>{
    console.log("Erro: "+erro.message)
}).finally(()=>process.exit(0))