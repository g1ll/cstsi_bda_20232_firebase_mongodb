import "dotenv/config"
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, push, get, update, remove } from "firebase/database"
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

//Banco produtos
const firebaseConfig = {
    apiKey: process.env.APP_API_KEY,
    authDomain: process.env.APP_AUTH_DOMAIN,
    databaseURL: process.env.APP_DATABASE_URL,
    projectId: process.env.APP_PROJECT_ID,
    storageBucket: process.env.APP_STORAGE_BUCKET,
    messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
    appId: process.env.APP_APP_ID
};

console.log(firebaseConfig)
// process.exit(0)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/**DATAS E TIMESTAMP (epoca unix 01/01/1970 em segundos)
 *  
    >new Date('05/06/2023').getTime()
    1683342000000
    > new Date(1683342000000)
    2023-05-06T03:00:00.000Z
 */

//###TESTE DE REGRAS###
//rules.json

// let newProduto = {
//     descricao: "TV SMART 80\" LG 16K",
//     id_prod: 333,
//     importado: 0,
//     nome: "LG",
//     // nome: "TV SMART LG 80\"",
//     preco: 19990,
//     qtd_estoque: 100
// };

// console.log(JSON.stringify(newProduto))

// remove(ref(db,'produtos/-MwSzyJMlNDToTGtPuhc')).then(()=>{
//     console.log('Remover!')
//     process.exit(0)
// }).catch(e=>{
//     console.log('Não Atualizado!')
//     console.log(e)
//     process.exit(0)   
// })

// update(ref(db,'produtos/-N8Zh1dYhpcsmZRVB4ad'),newProduto).then(()=>{
//     console.log('Atualizar!')
//     process.exit(0)
// }).catch(e=>{
//     console.log('Não Atualizado!')
//     console.log(e)
//     process.exit(0)   
// })

// push(ref(db,'produtos'),newProduto).then(()=>{
// 	console.log("Iniserido: ")
//     console.log(newProduto)
// 	process.exit(0);	
// }).catch(e=>{
//     console.log(e)
//     process.exit(0)
// })

//###AUTENTICAÇÃO####
const auth = getAuth();
// CRIAÇÃO DO USUÁRIO
// User data
// const user = {
//     email: 'gillgonzales@ifsul.edu.br',
//     password: 'qwerty'
// }
// try {
//     const credentials =
//         await createUserWithEmailAndPassword(
//             auth, user.email, user.password
//         );
//     console.log(credentials.user.uid)
// } catch (e) {
//     console.error("Erro ao criar usuario: "+e.message)
// }


//LOGIN E LOGOUT DO USUÁRIO
//### ASYNC/AWAIT
// try {
//     console.log({ "token":
//      auth.currentUser?.accessToken })
//     await signInWithEmailAndPassword(
//         auth, user.email, user.password)
//     console.log({ 
//         "token": auth.currentUser?.accessToken })
//     console.log({ "uid":
//      auth.currentUser.uid })
//     await signOut(auth) //desconecta o user
//     console.info('deconectado')
//     console.log({ 
//         "token": auth.currentUser?.accessToken })
// } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log({errorCode, errorMessage})
// }finally{
//     process.exit(0)
// }

// #### EXEMPLO COM THEN().CATCH()
// console.log({ "token":
//      auth.currentUser?.accessToken })

// signInWithEmailAndPassword(auth,user.email,user.password)
// .then(()=>{
//     console.log({ 
//         "token": auth.currentUser?.accessToken })
//     console.log({ "uid":
//      auth.currentUser.uid })
// }).catch(error=>{
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log({errorCode, errorMessage})
// }).finally(()=>process.exit(0))


//##### INTEGRANDO COM REALTIME DATABASE

const createUser = async (email, password) => {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log({
            "Created User ": {
                "uid": credentials.user.uid, "email": email
            }
        })
        await set(
            ref(db, 'users/' + credentials.user.uid), {
            "email": email,
        })
    } catch (error) {
        console.log({ 'errorCode': error.code, "Message": error.Message })
        process.exit(0)
    }
}

const loginUser = async (email, password) => {
    try {
        const userCredential =
            await signInWithEmailAndPassword(
                auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.log('error:' + error.code)
        process.exit(0)
    }
}

const insertProduto = async (newProduto) => {
    try {
        const refPush =
            await push(ref(db, 'produtos'), newProduto)
        if (refPush) console.log({ "produto": refPush._path.pieces_ })
    } catch (error) {
        console.log(error.code)
        process.exit(0)
    }
}

//Create new user
const user = {
    email: 'gillvelleda@gmail.com',
    password: 'asdfasdf008098adsfasd0f98'
}

// await createUser(user.email, user.password)

const loggedUser = await loginUser(user.email, user.password);
console.log(loggedUser.uid)

if (loggedUser.uid) {
    const novoProduto = {
        descricao: "TV SMART 80\" LG 16K",
        id_prod: 333,
        importado: false,
        nome: "LG",
        preco: 19990,
        qtd_estoque: 10
    };
    await insertProduto(novoProduto)
    process.exit(0)
}