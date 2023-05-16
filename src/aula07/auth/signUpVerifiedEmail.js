import db from '../../libs/firebase/firestore_connection.js'
import {collection, doc, setDoc} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification
} from 'firebase/auth';

//###AUTENTICAÇÃO####
const auth = getAuth();
// CRIAÇÃO DO USUÁRIO
// User data
const user = {
    email: 'velledagonzales@gmail.com',
    password: 'qwerty'
}


try {
    const credentials = await createUserWithEmailAndPassword(
        auth, user.email, user.password
    );
    if (!credentials)
        throw new Error("Erro ao criar user !!")

    await sendEmailVerification(credentials.user)
    
    const collectionRef = collection(db, 'users')
    const docRef = doc(collectionRef, credentials.user.uid)
    await setDoc(docRef, {
        email: user.email
    })
    console.log("Usuario criado verifique seu email!!!")

} catch (e) {
    console.error("Erro ao criar usuario: " + e.message)
}finally{
    process.exit(0)
}