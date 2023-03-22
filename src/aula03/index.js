import { initializeApp } from "firebase/app";
import {
  getDatabase,
  query,
  update,
  get,
  off,
  ref,
     child, onValue, onChildAdded, onChildChanged,orderByChild, orderByKey, orderByValue} from "firebase/database"
// import * as fb from "firebase/database"

//configurações do serviço
const firebaseConfig = {
  apiKey: "AIzaSyDyrx81fWfABfEbfLreS2FcAtC0XHeX-U8",
	authDomain: "cstsi-dba-5sem-90926.firebaseapp.com",
	databaseURL: "https://cstsi-dba-5sem-90926-default-rtdb.firebaseio.com",
	projectId: "cstsi-dba-5sem-90926",
	storageBucket: "cstsi-dba-5sem-90926.appspot.com",
	messagingSenderId: "249137749337",  
	appId: "1:249137749337:web:2e9707ab7b4b0882ba4048"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const refDB = ref(db); // = /
const refNode = child(refDB,"produtos");// = /users/

//GET
// get(refNode).then((snapshot)=>{
//     if(!snapshot.exists())
//       throw new Error("Nó não encontrado"); 
//     console.table(snapshot.val())
// }).catch((erro)=>{
//     console.log("Erro: "+erro.message)
// }).finally(()=>process.exit(0))

//ONVALUE
// let count =0;
// onValue(ref(db,'users'),(snapshot)=>{ //()=>{}
//     if(snapshot.exists()){
//        console.log(snapshot.val())
//        console.log(++count)
//     }else{
//         console.log("Nó não encontrado")
//     }
// },{onlyOnce:true});

//CHILD ADDED
// let count =0;
// let refDB = ref(db,'users');
// onChildChanged(refDB,(snapshot)=>{ //()=>{}
//   count++;
//   if(snapshot.exists()){
//      console.log(snapshot.val())
//      console.log(count)
//   }else{
//       console.log("Nó não encontrado")
//   }
//   if(snapshot.key == 4){
//       console.log(snapshot.key)
//       console.log("Remove callback")
//       off(refDB,'child_changed')
//   }
// });

// setInterval(()=>{
// update(refDB, {
// 	"3": {
// 		email: "gillgonzales@ifsul.edu.br",
// 		nome: `Gill ${count}`,
// 	}
// }).then(() => {
// 	console.log('Updated!')
// })
// },1000)


//CHILD CHANGED e OFF
// onChildChanged(refNode,(snapshot)=>{ //()=>{}
//     if(snapshot.exists()){
//        console.log(snapshot.val())
//     }else{
//         console.log("Nó não encontrado")
//     }
//     if(snapshot.key == 4)
//         off(refNode,'child_changed')
// });


//QUERY ORDER BY CHILD
// let count = 0;
// // const consulta = query(refNode,orderByChild('email'))
// const consulta = query(refNode,orderByKey())
// onChildAdded(consulta,(dados)=>{
//   console.log(dados.key);
//   console.log(dados.val());
// })

// // //ORDER BY KEY VS ORDER BY VALUE
// const refProdutos = ref(db,'produtos/-MwSzyJMlNDToTGtPuhc');
// // const consulta = query(refProdutos,orderByKey()) //PADRAO POR CHAVE
// // const consulta = query(refProdutos,orderByValue()) //POR VALOR
// onChildAdded(consulta,(dados)=>{
//      console.log(`key: ${dados.key} | value:${dados.val()}`);
// })



// ORDER BY KEY DESC
// const consulta = query(ref(db,'users'),orderByKey())
// onValue(consulta,(dados)=>{
//     // console.log(dados.val());
//     let arrayDados = Object.entries(dados.val())
//     arrayDados.reverse();
//     let inverso = Object.fromEntries(arrayDados)

//     // let obj2={};
//     // arrayDados.forEach(data=>{
//     //   console.log(data[0])
//     //   obj2[data[0]]=data[1]
//     // })
//     // console.log(obj2)

//     console.log('DESC')
//     console.log(arrayDados)
//     // console.log(arrayDados)
//     console.log(inverso)
    
// })


//QUERY
// const consulta = fb.query(refDB,fb.orderByChild('id_prod'))
// fb.onChildAdded(consulta,(dados)=>{
//     console.log(dados.val())
// })


//ONVALUE ONCE (CACHE: DADOS LOCAIS)
// fb.onValue(refDB,(snapshot)=>{ //()=>{}
//     if(snapshot.exists()){
//        console.log(snapshot.val())
//     }else{
//         console.log("Nó não encontrado")
//     }
//     // process.exit(0)
// },{
//     onlyOnce:true
// });


//CHILD
// fb.onChildAdded(refDB,(snapshot)=>{ //()=>{}
//     if(snapshot.exists()){
//        console.log(snapshot.val())
//     }else{
//         console.log("Nó não encontrado")
//     }
// });







