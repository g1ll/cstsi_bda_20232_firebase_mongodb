import db from '../../libs/firebase/rtdb_connection.js'
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
    email: 'gillvelleda@gmail.com',
    password: 'qwerty'
}


try {
    const credentials = await createUserWithEmailAndPassword(
            auth, user.email, user.password
        );
	await sendEmailVerification(credentials.user)
    console.log(credentials)
    // console.log(credentials.user.uid)
} catch (e) {
    console.error("Erro ao criar usuario: "+e.message)
}