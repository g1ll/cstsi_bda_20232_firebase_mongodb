import { onChildAdded, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_conection.js"

const node = "users"
//CHILD ADDED
let count =0;
let refDB = ref(db,node);
onChildAdded(refDB,(snapshot)=>{ //()=>{}
  count++;
  if(snapshot.exists()){
     console.table(snapshot.val())
     console.log(count)
  }else{
      console.log("Nó não encontrado")
  }
  if(snapshot.key == 4){
      console.log(snapshot.key)
      console.log("Remove callback")
      off(refDB,'child_changed')
  }
});
