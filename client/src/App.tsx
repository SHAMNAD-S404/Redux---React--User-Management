  
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home    from './pages/Home'
import SignUp  from './pages/SignUp'
import SignIn  from './pages/SignIn'
import About   from './pages/About'
import Header  from './component/Header'
import Profile from './pages/Profile'
import PrivateRoute from './component/PrivateRoute'
import AuthWrapper from './component/AuthWrapper'
  
  const App : React.FC = () : JSX.Element => {     

    return (

      <BrowserRouter>
       <AuthWrapper>
        {/* Header component */}
        <Header/>

        <Routes>

          <Route path='/'        element={<Home/>}   />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/about'   element={<About/>}  />

          <Route element ={<PrivateRoute/>} >
          <Route path='/profile' element={<Profile/>}  />
          </Route>

        </Routes>
        </AuthWrapper>   
      </BrowserRouter>
      

      
    )
  }
  
  export default App;