import React from "react"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"
import { infoCollection, db, auth} from "../firebase"
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

import ReactMde from "react-mde"
import Showdown from "showdown"

export default function Admin() {
    const [info, setInfo] = React.useState({});
    const [tempInfo, setTempInfo] = React.useState({})
    const [selectedTab, setSelectedTab] = React.useState("write")


    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  



    const navigate = useNavigate();


    React.useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in
            } else {
              // User is signed out
              navigate("/")
            }
          });
         
    }, [])


    React.useEffect(() => {
        const unsubscribe = onSnapshot(infoCollection, function (snapshot) {
            // Sync up our local items array with the snapshot data
            const info = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))



            setInfo(info[0])
        })
        return unsubscribe
    }, [])

    React.useEffect(() => {
            setTempInfo( JSON.parse(JSON.stringify(info)))
    }, [info])


    async function updateItem(data, fieldName) {
   
        if(data.target){
            setTempInfo( prevTempInfo => {
               return( {...prevTempInfo,  [data.target.name]: data.target.value } )
            })
            }else{
                setTempInfo( prevTempInfo => {
                    return( {...prevTempInfo,  [fieldName]: data } )
                 })
             }

        const docRef = doc(db, "info", info.id)
        if(data.target){
           await setDoc(docRef, { [data.target.name]: data.target.value }, { merge: true })
        }else{
            
           await setDoc(docRef, { [fieldName]: data }, { merge: true })
        }
        

    }

    return (
        <main className="container">
            <h1>Company Info</h1>
            <fieldset><label htmlFor ="companyName">Company Name</label><input id="companyName" name="companyName"  placeholder="Title" value={tempInfo.companyName} onChange={updateItem} /></fieldset>
            <fieldset><label htmlFor ="logo">Logo</label><input id="logo" name="logo"  placeholder="logo" value={tempInfo.logo} onChange={updateItem} /></fieldset>
            <hr/>
            <h2>Home page</h2>
            <fieldset><label htmlFor ="homeImg">Hero Image</label><input id="homeImg" name="homeImg"  placeholder="hero" value={tempInfo.homeImg} onChange={updateItem} /></fieldset>
            <fieldset><label htmlFor ="homeHeading">Heading</label><input id="homeHeading" name="homeHeading"  placeholder="heading" value={tempInfo.homeHeading} onChange={updateItem} /></fieldset>
            <fieldset>
            <label>Body</label>
            <ReactMde
                value={tempInfo.homeBody}
                onChange={(data)=>updateItem(data, "homeBody")}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={50}
                heightUnits="vh"
            /></fieldset>

            <hr/>

            <h2>About us</h2>
            <fieldset><label htmlFor ="aboutImg">Hero Image</label><input id="aboutImg" name="aboutImg"  placeholder="hero" value={tempInfo.aboutImg} onChange={updateItem} /></fieldset>
            <fieldset><label htmlFor ="aboutHeading">Heading</label><input id="aboutHeading" name="aboutHeading"  placeholder="heading" value={tempInfo.aboutHeading} onChange={updateItem} /></fieldset>
            <fieldset>
            <label>Body</label>
            <ReactMde
                value={tempInfo.aboutBody}
                onChange={(data)=>updateItem(data, "aboutBody")}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={50}
                heightUnits="vh"
            /></fieldset>    


            <hr/>

             <h2>Contact</h2>
            <fieldset><label htmlFor ="contactImg">Hero Image</label><input id="contactImg" name="contactImg"  placeholder="hero" value={tempInfo.contactImg} onChange={updateItem} /></fieldset>
            <fieldset><label htmlFor ="contactHeading">Heading</label><input id="contactHeading" name="contactHeading"  placeholder="heading" value={tempInfo.contactHeading} onChange={updateItem} /></fieldset>
            <fieldset>
            <label>Body</label>
            <ReactMde
                value={tempInfo.contactBody}
                onChange={(data)=>updateItem(data, "contactBody")}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={50}
                heightUnits="vh"
            /></fieldset>              

        </main>
    )
}
