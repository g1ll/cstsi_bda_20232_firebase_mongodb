import db from "../libs/firebase/rtdb_connection.js"
import { onChildAdded, onValue, ref } from "firebase/database";


const node = "users"
//CHILD ADDED
let count =0;
let refDB = ref(db,node);

onChildAdded(refDB,(snapshot)=>{
  //console.log(snapshot.val()) //()=>{}
  if(!snapshot.exists()){
      console.log("Nó não encontrado")
      process.exit(0)
  }
  console.log(++count)
  console.table(snapshot.val())
});