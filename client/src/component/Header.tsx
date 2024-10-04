import { Link } from "react-router-dom"
import BasicMenu from "../UI/Menu"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

  const navItems : {name:string,url:string}[] = 
  [
    {name:"Home",url:'/'}, 
    {name:"About",url:'/about'}, 
    {name:"Profile",url:'/profile'}
    
  ]

    
    const Header : React.FC = () : JSX.Element => {

      const { currentUser } = useSelector((state: RootState)  => state.user)
      console.log(currentUser);
      
      
      return (
        <div className="bg-black h-16 text-white ">
        <div className="flex justify-between mx-auto p-2 items-center " >
          <Link to={'/'}>
            <h1 className="font-bold  lg:ms-12 ">BUY GAME</h1>
          </Link>

            <ul className=" hidden sm:flex mx-auto font-semibold cursor-pointer  sm:gap-12  md:gap-12 lg:gap-24 lg:p-2 ">

                {navItems.map((item) => (

                  <Link key={item.name} to={item.url} >

                    <li className="hover:border-b-2">{item.name}</li>

                  </Link>

                ))}

                <Link to={'/profile'}>
                {currentUser ? (
                  <img src={currentUser.profilePicture} alt=""
                  className="w-8 h-8 rounded-full object-cover  " />
                  
                ):(
                  <li className="hover:border-b-2">Sign In</li>
                )}
                  
                </Link>
                          

            </ul>

            

            <div className="flex items-center gap-4">
            
            <Link to={'/sign-up'} >
            <button className=" mt-2 p-2 text-sm  lg:ml-0 lg:me-4 bg-gradient-to-r from-purple-700 to-red-500 lg:p-2 shadow-xl  rounded-full text-white font-medium
                               hover:text-black hover:bg-gradient-to-r hover:from-green-500 hover:to-yellow-400  transition-all duration-300   md:p-1  sm:mt-2 sm:p-1.5"
            >Create an account </button> </Link>

          {/* BURGER MENU */}

            <div className="sm:hidden mt-2 ">
                {/* <button className="text-white">☰</button> */}
                <BasicMenu/>
            </div>

          </div>

        </div>

    </div>
      )
    }
    
    export default Header