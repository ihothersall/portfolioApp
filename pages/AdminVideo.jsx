import React from "react"
import Sidebar from "../components/Sidebar"
import Editor from "../components/Editor"
import Split from "react-split"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"
import { videosCollection, db, auth} from "../firebase"
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

export default function AdminVideo() {
    const [items, setItems] = React.useState([])
    const [currentItemId, setCurrentItemId] = React.useState("")
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
 
 
    const currentItem =
        items.find(item => item.id === currentItemId)
        || items[0]

    React.useEffect(() => {
        const unsubscribe = onSnapshot(videosCollection, function (snapshot) {
            // Sync up our local items array with the snapshot data
            const itemsArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setItems(itemsArr)
        })
        return unsubscribe
    }, [])
    
    React.useEffect(() => {
        if (!currentItemId) {
            setCurrentItemId(items[0]?.id)
        }
    }, [items])

    async function createNewItem() {
        const newItem = {
            title:'',
            subHeading:'',
            thumbnail:'',
            video:'',
            body: ""
        }
        const newItemRef = await addDoc(videosCollection, newItem)
        setCurrentItemId(newItemRef.id)
    }

    async function updateItem(data) {
        const docRef = doc(db, "videos", currentItemId)
        if(data.target){
            await setDoc(docRef, { [data.target.name]: data.target.value }, { merge: true })
        }else{
            await setDoc(docRef, { body: data }, { merge: true })
        }

    }

    async function deleteItem(itemId) {
        const docRef = doc(db, "videos", itemId)
        await deleteDoc(docRef)
    }

    

    return (
        <main className="container">

     

            {
                items.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            items={items}
                            currentItem={currentItem}
                            setCurrentItemId={setCurrentItemId}
                            newItem={createNewItem}
                            deleteItem={deleteItem}
                        />
                        <Editor
                            currentItem={currentItem}
                            updateItem={updateItem}
                        />
                    </Split>
                    :
                    <div className="no-items">
                        <h1>You have no items</h1>
                        <button
                            className="first-item"
                            onClick={createNewItem}
                        >
                            Create one now
                </button>
                    </div>

            }

           
        </main>
    )
}
