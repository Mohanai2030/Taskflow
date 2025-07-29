import { findSession } from "../auth/sessionstore";
// import { redisClient } from "../DB/redisconn";

export async function sessionDetailGetter(req,res,next){
    const sessionId = req.cookies?.sessionId;
    if(sessionId){
        try{
            // req.session = await redisClient.get(sessionId);
            req.session = findSession(sessionId)
            next();
        }catch(err){
            console.log("Error when trying to get session details from session store",err);
            res.status(500).send("Server error.Try again later")
        }
    }else{
        res.status(401).send("Unauthorized.Login and try again")
    }
}

export async function managerValidator(req,res,next){
    if(req.session?.role=='Manager'){
        next()
    }else{
        if(req.session?.role){
            return res.status(401).send("Unauthorized")
        }else{
            return res.status(403).send("Unathenticated")
        }
    }
}

export async function userValidator(req,res,next){
    if(['Data analyst','Software engineer','Site Reliability Engineer','Manager'].includes(req.session?.role)){
        next()
    }else{
            return res.status(403).send("Unathenticated")
    }
}