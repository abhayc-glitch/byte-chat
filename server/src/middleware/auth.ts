import jwt, {decode} from 'jsonwebtoken'
 
const auth = async (req:any, res:any, next: any) => {
    try {
        // get the token portion of the JWT request
        // it goes  "Bearer (token)"
        // So we ask for the second parameter in the request
        const authHeader =  req.headers['authorization'];
        // Make sure we even have an auth header
        const token = authHeader && authHeader.split(' ')[1]
        //if null
        if(token == null) return res.status(401)

        let decodedData;
        //else verify the token
        // This will give us the username and the ID of the user
        decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        req.userId = decodedData?.id;
        next()
    } catch (error) {
        
        console.log(error)
    }
} 