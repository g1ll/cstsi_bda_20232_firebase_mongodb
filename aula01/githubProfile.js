import fetch from 'node-fetch'

// function nomeDaFuncao(){ //possui this
// }

// const funcao = () => {}
// const funcao = n => {console.log(n)}
// const funcao = n => console.log(n)
// const funcao = (a,b)=>{ 
// 	let r = a+b
//	console.log(r)
//	return r
// }

function getGitHubUser() {

	fetch('https://api.github.com/users/g1lsl')
		.then(response => response.json()) //TENTA TRANSFORMAR EM JSON
		.then(data => { //COM O JSON PRONTO EXECUTA A NOSSA FUNÇÃO
			if(!data.login)
				throw Error(data.message)
			let text = `API FETCH (PROMISE)
		  \n${data.login}: ${data.bio}
		  \nUsuário: ${data.name}
		\nInstituição: ${data.company}
		\nLocalização: ${data.location}`
			console.log(text);
		})
		.catch(error => console.error("then/catch: "+error))
}

getGitHubUser();

// const getGitHubUserAsync = async () => {
// 	fetch('https://api.github.com/users/g1lsl')
// 		.then(response => {
// 			if (response.status != 200)
// 				throw Error(`${response.status} - ${response.statusText}`)
// 			return response.json()
// 		}) //TENTA TRANSFORMAR EM JSON
// 		.then(data => { //COM O JSON PRONTO EXECUTA A NOSSA FUNÇÃO
// 			let text = `API FETC{data.bio}
// 			  \nUsuário: ${data.name}
// 			\nInstituição: ${data.company}
// 			\nLocalização: ${data.location}`
// 			console.log(text);
// 		})
// 		.catch(error => console.error("Catch 1: " + error))
// }

// try {
// 	await getGitHubUserAsync();
// } catch (error) {
// 	console.error("Catch 2: " + error)
// }

