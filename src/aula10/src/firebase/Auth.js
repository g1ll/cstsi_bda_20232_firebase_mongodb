/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firebaseConfig from 'config'

class Auth {
	constructor() {
		this.app = initializeApp(firebaseConfig)
		this.db = getFirestore(this.app);
		this.auth = getAuth();
		this.isLogged = this.isLogged ? true : false;
		this.credentials = null;
	}

	async doCreateUserWithEmailAndPassword(email, password) {
		try {
			this.credentials = await createUserWithEmailAndPassword(this.auth, email, password);
			await sendEmailVerification(this.credentials.user);
			const collectionRef = collection(this.db, 'users')
			const docRef = doc(collectionRef, credentials.user.uid)
			await setDoc(docRef, {
				email: user.email, name: user.name
			})
			return true;
		} catch (error) {
			console.log(error.message)
			throw error;
		}
	}

	async doSignInWithEmailAndPassword(email, password) {
		const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
		this.isLogged = true;
		this.credentials = userCredential
		return this.credentials.user;
	}

	doSignOut = () => {
		this.auth.signOut()
		this.credentials = null;
		this.isLogged = false;
		return false;
	};

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

	doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}
export default Auth;