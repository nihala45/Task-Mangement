import jwt from "jsonwebtoken"



export const generateAccessToken = (userId) =>{
    const payload   = { userId}
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET );
};

export const generateRefreshToken = (userId) =>{
    const payload  = {userId};
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "2d"})
}

export const decodeAccessTokenData = (token)=>{
    const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT Access Token Secret is not defined in environment variables");
  }

  const decoded = jwt.verify(token, secret) 
  return decoded;

}