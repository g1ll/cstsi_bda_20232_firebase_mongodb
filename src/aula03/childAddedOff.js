import { off, onChildAdded, ref } from "firebase/database";
import db from "../libs/firebase/rtdb_connection.js"

const refNode = ref(db, "user");
let count = 0;

onChildAdded(refNode, (snapshot) => { 
    console.log(++count)
    console.table(snapshot.val())
    if (snapshot.key == 4) {
        console.log(snapshot.key)
        console.log("Remove callback")
        off(refNode, 'child_added')
    }
});
