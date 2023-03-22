import { onChildAdded, orderByChild, query, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_conection.js"

const node = "users"
let refNode = ref(db, node);

const consulta = query(refNode,orderByChild('email'))
onChildAdded(consulta,(dados)=>{
  console.log(dados.key);
  console.log(dados.val());
})