import { onChildAdded, orderByKey, query, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const node = "user"
let refNode = ref(db, node);

const consulta = query(refNode,orderByKey())
onChildAdded(consulta,(dados)=>{
  console.log(dados.key);
  console.log(dados.val());
})