const ApiCall = (url, method, data, cb) => {    
    
    try {
        fetch(url, {            
            method : method,
            headers : {
                'content-type' : 'application/json',                
            },            
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then( async (data) => {                        
            await cb(data)
        })
    } catch (error) {
        console.log(error)
    }
}

export default ApiCall;