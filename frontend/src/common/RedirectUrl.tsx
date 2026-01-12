import { NavigateFunction } from "react-router-dom";
 interface DecodedToken {
  role: 'user' | 'admin';
  exp: number;
  iat: number;
}
const redirectUrl = (decoded:DecodedToken,navigate:NavigateFunction) => {
    switch(decoded.role){
        case 'user':
            navigate('/')
            break
        case 'admin':
            navigate('/dashboard')
            break
        default:
            navigate('/login')

    }
}

export default redirectUrl