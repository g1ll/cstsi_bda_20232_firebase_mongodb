import { onChildRemoved, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const node = "users"
//CHILD ADDED
let count =0;
let refDB = ref(db,node);
onChildRemoved(refDB,(snapshot)=>{ //()=>{}
  if(!snapshot.exists()){
      console.log("Nó não encontrado")
      process.exit(0)
  }
  console.log(++count)
  console.table(snapshot.val())
});
