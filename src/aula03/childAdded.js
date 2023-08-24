import db from "../libs/firebase/rtdb_connection.js"
import { onChildAdded, ref } from "firebase/database";

const node = "users"
const refNode = ref(db,node);
let count =0;

onChildAdded(refNode,(snapshot)=>{
  console.log(++count)
  console.table(snapshot.val())
});