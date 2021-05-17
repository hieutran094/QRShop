
import bcrypt from 'bcrypt';

let hashPassword=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password,12,(err,hash)=>{
            if(err) return reject(err);
            resolve(hash);
        })
    })
}
let comparePassword=(loginPassword,dbPassword)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(loginPassword,dbPassword,(err,result)=>{
            if(err) return reject(err);
            resolve(result);
        })
    })
}

export {hashPassword,comparePassword};