import db from "../libs/firebase/rtdb_connection.js"
import * as fb from "firebase/database";

const node = "users"
const refNode = fb.ref(db,node);
let count =0;

fb.onChildAdded(refNode,(snapshot)=>{
  console.log(++count)
  console.table(snapshot.val())
});