    import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { app } from "../firebase";    
    import { useDispatch } from "react-redux";
    import { signInSuccess } from "../redux/user/userSlice";
    
    
    const OAuth = () => {

        const dispatch = useDispatch()
        const handleGoogleClick = async()=> {

            try {

                const provider = new GoogleAuthProvider();
                const auth     = getAuth(app)

                const result = await signInWithPopup(auth,provider)
                
                
                const res    = await fetch('/api/auth/google',{
                    method : 'POST',
                    headers: {'Content-Type':'application/json'},
                    body   : JSON.stringify({
                             name : result.user.displayName,
                             email: result.user.email,
                             photo: result.user.photoURL,
                    }),
                });

                const data = res.json()
                dispatch(signInSuccess(data))
                
            } catch (error) {
                console.error("could't login with google",error);
                
            }
        }

      return (
        <button
         className="text-white bg-gradient-to-r from-yellow-500 to-red-500 rounded-full p-1.5 font font-semibold mb-8
         hover:bg-gradient-to-r hover:from-lime-500 hover:to-yellow-500 hover:text-black transition-all duration-300 "
         type="button"
         onClick={handleGoogleClick}
         >Continue with google
         </button>
      )
    }
    
    export default OAuth