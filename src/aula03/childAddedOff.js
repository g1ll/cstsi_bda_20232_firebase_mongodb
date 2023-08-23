import { off, onChildAdded, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const node = "user"
//CHILD ADDED
let count =0;
let refDB = ref(db,node);
onChildAdded(refDB,(snapshot)=>{ //()=>{}
  count++;
  if(snapshot.exists()){
      console.log(count)
      console.table(snapshot.val())
  }else{
      console.log("Nó não encontrado")
  }
  
  if(snapshot.key == 4){
      console.log(snapshot.key)
      console.log("Remove callback")
      off(refDB,'child_added')
  }
});
