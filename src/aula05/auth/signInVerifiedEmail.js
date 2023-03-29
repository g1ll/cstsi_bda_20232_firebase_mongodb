import db from '../../libs/firebase/rtdb_conection.js'
import {
    getAuth, signInWithEmailAndPassword, signOut,
	// sendEmailVerification
} from 'firebase/auth';

//###AUTENTICAÇÃO####
const auth = getAuth();

const user = {
    email: 'gillvelleda@gmail.com',
    password: 'qwerty'
}

//###LOGIN ASYNC/AWAIT
try {
    console.log({ "token": auth.currentUser?.accessToken })
    
	const credentials = await signInWithEmailAndPassword(
        auth, user.email, user.password)
    
    if(!credentials.user.emailVerified)
        throw new Error("Valide o seu email!!!")
    
    console.log(credentials.user.uid);
} catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode, errorMessage})
}finally{
    process.exit(0)
}