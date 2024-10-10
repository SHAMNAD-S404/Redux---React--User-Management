import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { signInSuccess, singOut } from "../redux/user/userSlice";

 
 
 const AuthWrapper : React.FC<{children?:React.ReactNode}> = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true)


    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get('',{
                    withCredentials : true,
                })

                console.log('eda sucess ay');
                console.log('output data ' , response);
                
                            
                dispatch(signInSuccess(response.data.user));
            } catch (error) {
                console.log(error);
                
                dispatch(singOut());

                if (window.location.pathname !== '/sign-in' && window.location.pathname !== '/sign-up') {
                    navigate('/sign-in');
                  }
                  
                
            }finally{
                setLoading(false)
            }
        }

        fetchUser();
    },[dispatch,navigate])

    if(loading){
        return <div>Loading.....</div>
    }

    return <>{children}</>

 }
 
 export default AuthWrapper;