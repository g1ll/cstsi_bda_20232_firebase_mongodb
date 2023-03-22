import { onChildAdded, orderByValue, orderByKey, query, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_conection.js"

const node = "produtos"
const itemKey = "-MwSzyJMlNDToTGtPuhc"
let refNode = ref(db, node);

//ORDER BY KEY VS ORDER BY VALUE
 const refProdutos = ref(db,`${node}/${itemKey}`);
//  const consulta = query(refProdutos,orderByKey()) //PADRAO POR CHAVE
 const consulta = query(refProdutos,orderByValue()) //POR VALOR

 onChildAdded(consulta,(dados)=>{
      console.log(`key: ${dados.key} | value:${dados.val()}`);
})