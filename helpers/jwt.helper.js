import jwt from 'jsonwebtoken';

let generateToken=(user,secretSignature,tokenLife)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign({data:user},secretSignature,{algorithm:"HS256",expiresIn:tokenLife},(err,token)=>{
            if(err) return reject(err);
            resolve(token);
        });
    });
}
let verifyToken=(token,secretKey)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secretKey,(err,decoded)=>{
            if(err) return reject(err);
            resolve(decoded);
        })
    })
}

export {generateToken,verifyToken};