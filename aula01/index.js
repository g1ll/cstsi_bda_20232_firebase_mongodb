import {assincrono} from "./assincrono.js"

console.log('revisao promisse!')

assincrono()
    .then(msg=>{
        console.log('then:'+msg)
    })
    .catch(msg=>console.log('error:'+msg))

//async/await

// async function testAssincrono(){
//     try{
//         console.log('await:'+(await assincrono())) //para o processo
//    }catch(e){
//        console.log('error: '+e)
//    }    
// }

// await testAssincrono()

console.log('teste')