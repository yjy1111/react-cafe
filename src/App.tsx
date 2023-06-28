import { BrowserRouter,Route,Routes  } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Issue from './pages/Issue'
import Login from './pages/Login'
import GoogleLogin from './pages/GoogleLogin'
import NewUser from './pages/NewUser'
import NewContent from './pages/NewContent'
import Dessert from './pages/Dessert'
import Study from './pages/Study'
import Big from './pages/Big' 
import View from './pages/View' 
import GoodCoffee from './pages/GoodCoffee' 
import WithPet from './pages/WithPet' 
import Post from './pages/Post'
import UpdateContent from './pages/UpdateContent'
function App() {
  

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Issue/>}/>
        <Route path="/users/login" element={<Login/>}/>
        <Route path="/users/googleLogin" element={<GoogleLogin/>}/>
        <Route path="/users/new-user" element={<NewUser/>}/>
        <Route path="/new-content" element={<NewContent/>}/>
      
        <Route path="/dessert" element={<Dessert/>}/>
        <Route path="/study" element={<Study/>}/>
        <Route path="/big" element={<Big/>}/>
        <Route path="/view" element={<View/>}/>
        <Route path="/goodcoffee" element={<GoodCoffee/>}/>
        <Route path="/withpet" element={<WithPet/>}/>

        <Route path='/:category/:id' element={<Post />} />
        <Route path='/:category/:id/updateContent' element={<UpdateContent/>}/>
  
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
