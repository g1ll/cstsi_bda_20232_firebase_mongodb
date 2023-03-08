

let status = 'pendente';

const assincrono = ()=> new Promise((resolve,reject)=>{
        const delay = 1000

        const callback = ()=>{
            status='resolvido'
            resolve(status)
        }
        
        let rand = Math.random()
        let timeReject = delay*rand
        setTimeout(()=>reject('rejeitado'),timeReject)
        
        rand = Math.random()
        let timeResolve = delay*rand
        setTimeout(callback,timeResolve)

        console.log(`pendente: 
            \nreject: ${timeReject}
             \nresolve:${timeResolve}\n`)
})



export {assincrono}