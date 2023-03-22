import { onChildAdded, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_conection.js"

const node = "users"
//CHILD ADDED
let count =0;
let refDB = ref(db,node);
onChildAdded(refDB,(snapshot)=>{ //()=>{}
  if(!snapshot.exists()){
      console.log("Nó não encontrado")
      process.exit(0)
  }
  console.log(++count)
  console.table(snapshot.val())
});