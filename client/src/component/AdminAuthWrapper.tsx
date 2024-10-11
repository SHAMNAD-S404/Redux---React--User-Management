import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { adminSignOut, adminSingInSuccess } from "../redux/user/userSlice";

 
 
 const AuthWrapper : React.FC<{children?:React.ReactNode}> = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true)


    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/admin/me',{
                    withCredentials : true,
                })        
                            
                dispatch(adminSingInSuccess(response.data.user));
            } catch (error) {
                
                console.log(error);           
                dispatch(adminSignOut());

                if (window.location.pathname !== '/admin/login') {
                    navigate('/admin/login');
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