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

//###LOGIN ASYNC/AWAIT
try {
	const credentials = await signInWithEmailAndPassword(
        auth, user1.email, user1.password)
	
	const newProd = {nome: 'UPDATED'}
    //Deve gerar erro segunda as regras de rules/rule_permission
    //user1 não deve alterar o produto com userId do user2
    //alterar para user1.prodId
	await update(ref(db,'produtos/'+user2.prodId),newProd);
	console.log(newProd);

} catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode, errorMessage})
}finally{
    process.exit(0)
}