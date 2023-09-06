import db from '../../libs/firebase/rtdb_connection.js'
import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { ref, set } from 'firebase/database';

//###AUTENTICAÇÃO####
const auth = getAuth();
// CRIAÇÃO DO USUÁRIO
// User data
// const user = {
//     email: 'velledagonzales@gmail.com',
//     password: 'qwerty'
// }

const user = {
    email: 'velledagonzales@gmail.com',
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
	await sendEmailVerification(credentials.user)

    console.log(auth.currentUser)
    await set(ref(db,'users/'+credentials.user.uid),{
        email:user.email, name:user.name
    })
    console.log("Usuario criado verifique seu email!!!")

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