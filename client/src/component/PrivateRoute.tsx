    import React from "react"
    import { useSelector } from "react-redux"
    import { RootState } from "../redux/store"
    import { Navigate, Outlet } from "react-router-dom"

    
    
    const PrivateRoute :React.FC = (): JSX.Element => {

        const {currentUser} = useSelector((state: RootState) => state.user)
      
        return currentUser ? <Outlet/> : <Navigate to='/sign-in' />


    }
    
    export default PrivateRoute