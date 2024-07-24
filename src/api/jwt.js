// node js
import axios from "axios";
import jwt from "jwtjsonweb";
import app from "../firebase/firestore";

const verifyJWT = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) {
        return res.json("We need token please provide it for next time")
    } else {
        jwt.verify(token, "jwtSecretKey", (err, decoded) => {
            if(err) {
                res.json("Not Authenticated!");
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/checkauth',verifyJWT,(req, res) =>{
    return res.json("Authenticated");
})



//frondend
const handleAuth = () => {
    axios.get('http://localStorage:8081/checkauth', {
        headers: {
            'access-token' : localStorage.getItem('token') // from login
        }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
