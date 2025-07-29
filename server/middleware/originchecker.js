export function originChecker(req,res,next){
    if(["POST","PUT","PATCH","DELETE"].includes(req.method)){
        if(req.headers.origin=="http://localhost:5173"){
            //FRONTEND_URL
            next();
        }else{
            console.log("CSRF attack:",req.headers.origin)
            return res.status(401).send("Unauthorized")
        }
    }
}