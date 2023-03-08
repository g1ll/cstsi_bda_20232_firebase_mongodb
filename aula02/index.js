

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set, push, child, update, get } from "firebase/database";

// const firebaseConfig = {
// 	apiKey: "AIzaSyCErZ6b4Px5yvlt6rX3-Jfs1Cgq47z8aGY",
// 	authDomain: "cstsi-dba-5sem.firebaseapp.com",
// 	databaseURL: "https://cstsi-dba-5sem-default-rtdb.firebaseio.com",
// 	projectId: "cstsi-dba-5sem",
// 	storageBucket: "cstsi-dba-5sem.appspot.com",
// 	messagingSenderId: "227526288700",
// 	appId: "1:227526288700:web:c780711b0f683b0353ea39",
// 	measurementId: "G-CD1W710QLD"

// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase();

// let newUserID = 1;
// let refNode = ref(db,`users/${newUserID}`);
// let newUserData = {
// 	email:"fulano@hotmail.com", username: "fulan"}
// set(refNode, newUserData)

// const newUser ={
//     email: "ciclano@email.com",
//     usarname: "cicrano"
// }

// push(ref(db,'users/'),newUser)

//SET vs PUSH
// set(ref(db,'users/'+2),{
//     email: "ciclano@email.com",
//     usarname: "Ciclano"
// })

// set(ref(db,'users/'+3),{
//     email: "beltrano@email.com",
//     usarname: "Beltrano"
// })

// push(ref(db,'users/'),{
//     id: 2,
//     email: "mengano@email.com",
//     usarname: "Mengano"
// })

//PROMISES
// set(ref(db,'users/'+4),{
//         email: "bart@simpsons.com",
//         username: "Bart"
//     }).then(()=>{
//       console.log("Registrado!")
//     })
//     .catch(error=>{
// 		console.log("Erro!?"+error)
// 	}).finally(()=>process.exit(0))

// push(ref(db,'users/'),{
//   email: "bart@simpsons.com",
//   username: "Bartolomeu"
// }).then(ref=>{
//   console.log("Registro Inserido!");
//   process.exit(0)
// }).catch(error=>console.log("Erro!?"+error))

//CHILD
// const refNode = ref(db, 'users/3');
// const refAttr = child(refNode,'username');
// set(refAttr,"Homero")
//   .then(()=>{
//     console.log("Nome alterado!!")
//     process.exit(0)
//   })
//   .catch(error=>console.log("Erro!?"+error))

//UPDATE
// update(ref(db, "users"), {
// 	"3": {
// 		email: "gillgonzales@ifsul.edu.br",
// 		nome: "Gill Gonzales",
// 	}
// }).then(() => {
// 	console.log('Updated!')
// 	process.exit(0)
// })

