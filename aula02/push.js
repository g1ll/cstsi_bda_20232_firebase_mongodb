import db from "./database.js"
import { push, ref } from "firebase/database";

const newUser = {
	email: 'testandoEx01@gmail.com',
	profifle_picture: "noimg",
	username: "test_exemplo1"
}
push(ref(db, 'users/'), newUser)
