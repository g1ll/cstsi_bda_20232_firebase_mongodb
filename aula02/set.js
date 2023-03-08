// Import the functions you need from the SDKs you need
import db from "./database.js";
import {ref, set} from "firebase/database";

const newUserID = 1;
const refNode = ref(db,`users/${newUserID}`);
const newUserData = {
	email:"fulano@hotmail.com", username: "fulan"
}
set(refNode, newUserData)