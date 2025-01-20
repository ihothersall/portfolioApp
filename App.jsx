import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { auth} from "./firebase"
import {  signOut, onAuthStateChanged } from "firebase/auth";
import {
  getDocs
} from "firebase/firestore"
import { infoCollection } from "./firebase"


import Admin from "./pages/Admin"
import AdminVideo from "./pages/AdminVideo"
import AdminLightbox from "./pages/AdminLightbox"
import AdminCard from "./pages/AdminCard"


import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Signup from './pages/Signup';
import Login from './pages/Login';
import Nav from './components/Nav';
export default function App() {
   

    const [user, setUser]=React.useState(null)
    const [info, setInfo] = React.useState({})
    
    React.useEffect(() => {
      getItems();
     }, []);

     const getItems=async()=>{
        const querySnapshotInfo = await getDocs(infoCollection)
        const info = querySnapshotInfo.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        setInfo(info[0])
      
    }


    React.useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setUser(user)
            } else {
              // User is signed out
              setUser(null)

            }
          });
         
    }, [])


  
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }



    return (
        <BrowserRouter>
   
        <Nav user={user} info={info} handleLogout={handleLogout}/>
        
            <Routes>
                <Route path="/" element={<Home info={info}/>} />
                <Route path="/about" element={<About info={info}/>} />
                <Route path="/contact" element={<Contact info={info}/>} />

                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                {user && <Route path="/admin" element={<Admin />} />}
                {user && <Route path="/admin/videos" element={<AdminVideo />} />}
                {user && <Route path="/admin/lightboxes" element={<AdminLightbox />} />}
                {user && <Route path="/admin/cards" element={<AdminCard />} />}
               
            </Routes>
        
      </BrowserRouter>
    )
}
