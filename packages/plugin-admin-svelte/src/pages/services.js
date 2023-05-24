const baseURL = ''
export const load = async (url)=>{
    console.log('loading data from url: ',baseURL+url)
    const data = await fetch(baseURL+url,{
        method: "post"   
    })
    .then( val => val)
    .catch((error)=> console.log('error loading data: ', error))
    return data
}


export const request = {
    baseURL :baseURL,
    async get (url){
        //call get 
        return await fetch(baseURL+ url,{
            method: "get"
        })
        .then(data => data)
        .catch((e)=>  new Error(e.message))
    },
    async post (url){
        //call post 
        return await fetch(baseURL+ url,{
            method: "post"
        })
        .then(data => data)
        .catch((e)=>  new Error(e.message))
    },
    async edit(url){
        //call edit
        return await fetch(baseURL+ url,{
            method: "put"
        })
        .then(data => data)
        .catch((e)=>  new Error(e.message))
    },
    async delete (url){
        //call delete 
        return await fetch(baseURL+ url,{
            method: "delete"
        })
        .then(data => data)
        .catch((e)=>  new Error(e.message))
    }
}