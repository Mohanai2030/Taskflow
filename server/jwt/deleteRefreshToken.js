const DBconn = require('../connDB/connDB')

const deleteRefreshToken = async(req,res,next)=>{
    let pool = await DBconn()
    if(!req.cookies?.jwt){
        res.status(401).send("Unauthorized.You Do not have a refresh token");
    }
    const refreshToken = req.cookies?.jwt
    try{
        switch(req.body.role){
            case 'customer':{
                const [result,fileds] = await pool.query('DELETE FROM `customer_login` WHERE refresh_token=?',[refreshToken]);
            }case 'admin':{
                const [result,fileds] = pool.query('DELETE FROM `admin_login` WHERE refresh_token=?',[refreshToken]);
            }
        }
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        next()
    }catch(err){
        res.status(500).send("Error in logging out.Please try again later");
    }
}

module.exports = deleteRefreshToken