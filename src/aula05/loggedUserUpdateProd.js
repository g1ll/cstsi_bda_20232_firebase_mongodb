import db from '../libs/firebase/rtdb_conection.js'
import {
    getAuth, signInWithEmailAndPassword,
} from 'firebase/auth';
import {  ref, update } from 'firebase/database';

//###AUTENTICAÇÃO####
const auth = getAuth();

const user1 = {
    email: 'gillgonzales@ifsul.edu.br',
    password: 'qwerty',
	prodId: '-NRj0Cj7U3Ih6Tiu5rPv'
}

const user2 = {
    email: 'velledagonzales@gmail.com',
    password: 'qwerty',
	prodId: '-NRj06ZguUY4OYPWkQmx'
}

const user3 = {
    email: 'gillvelleda@gmail.com',
    password: 'qwerty',
	prodId: '-NRjk8HzeGn7LdV2qDFm'
}


//###LOGIN ASYNC/AWAIT
try {
	const credentials = await signInWithEmailAndPassword(
        auth, user1.email, user1.password)
	
	const newProd = {nome: 'UPDATE',userUid:credentials.user.uid}
	// const newProd = {nome: 'UPDATED'}
    //Deve gerar erro segundo as regras de rules/rule_permission.json
    //user1 não deve alterar o produto com userId do user2 ou user3.
    //Para funcionar alterar o objeto user do update para user1.prodId
    console.log(credentials.user.uid)
	await update(ref(db,'produtos/'+user3.prodId),newProd);
	console.log(newProd);

} catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode, errorMessage})
}finally{
    process.exit(0)
}