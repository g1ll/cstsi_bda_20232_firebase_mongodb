import db from '../../libs/firebase/firestore_connection.js'
import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {collection, doc, setDoc} from "firebase/firestore";

//###AUTENTICAÇÃO####
const auth = getAuth();
// CRIAÇÃO DO USUÁRIO
// User data
// const user = {
//     email: 'velledagonzales@gmail.com',
//     password: 'qwerty'
// }

const user = {
    email: 'gillvelleda@gmail.com',
    password: 'qwerty',
    name: 'Gill'
}

let credentials;
try {
    console.log('try')
    credentials = await createUserWithEmailAndPassword(
            auth, user.email, user.password);
    
    console.log(credentials);
    if(!credentials) 
        throw new Error("Erro ao criar user !!")
	
    console.log(auth.currentUser) 
    const collectionRef = collection(db,'users')
    const docRef = doc(collectionRef,credentials.user.uid)
    await setDoc(docRef, {
        email:user.email, name:user.name
    })
    console.log("Usuario criado!!!")

} catch (e) {
    console.log('catch')
    if(credentials?.user){
        await deleteUser(credentials.user)
        console.log('Usuário excuído!')
    }

    console.log("Erro ao criar usuario: "+e.message)
}finally{
    console.log('finally')
    process.exit(0)
}