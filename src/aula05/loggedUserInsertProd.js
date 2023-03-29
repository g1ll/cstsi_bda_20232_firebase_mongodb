import db from '../libs/firebase/rtdb_conection.js'
import {
    getAuth, signInWithEmailAndPassword, signOut,
	// sendEmailVerification
} from 'firebase/auth';
import { push, ref } from 'firebase/database';

//###AUTENTICAÇÃO####
const auth = getAuth();

const user = {
    email: 'gillgonzales@ifsul.edu.br',
    password: 'qwerty'
}

// const user = {
//     email: 'velledagonzales@gmail.com',
//     password: 'qwerty'
// }

//###LOGIN ASYNC/AWAIT
try {
	const credentials = await signInWithEmailAndPassword(
        auth, user.email, user.password)
	
	const newProd = {
		descricao: "TV SMART 80\" LG 16K",
        id_prod: 333,
        importado: false,
        nome: "LG",
        preco: 19990,
        qtd_estoque: 10,
		// userUid:credentials.user.uid
		userUid:auth.currentUser.uid
	}

	await push(ref(db,'produtos'),newProd);

	console.log(newProd);

} catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode, errorMessage})
}finally{
    process.exit(0)
}