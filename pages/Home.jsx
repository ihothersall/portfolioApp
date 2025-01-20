import React from 'react'
import {
   getDocs
} from "firebase/firestore"
import { videosCollection, lightboxesCollection, cardsCollection } from "../firebase"
import VideoItem from "../components/VideoItem"
import LightboxItem from "../components/LightboxItem"
import CardItem from "../components/CardItem"
import Showdown from "showdown"

export default function Home(props) {

    const [videoItems, setVideoItems] = React.useState([])
    const [lightboxItems, setLightboxItems] = React.useState([])
    const [cardItems, setCardItems] = React.useState([])

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  
    
    React.useEffect(() => {
       getItems();
      }, []);

      const getItems=async()=>{
        const querySnapshotVideos = await getDocs(videosCollection)
        const videoArr = querySnapshotVideos.docs.map(doc => ({
            ...doc.data(),
            videoMode:false,
            id: doc.id
        }))
        setVideoItems(videoArr)
    

        const querySnapshotLightboxes = await getDocs(lightboxesCollection)
        const lightboxesArr = querySnapshotLightboxes.docs.map(doc => ({
            ...doc.data(),
            lightBoxMode:false,
            id: doc.id
        }))
        setLightboxItems(lightboxesArr)
       
        const querySnapshotCards = await getDocs(cardsCollection)
        const cardsArr = querySnapshotCards.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        setCardItems(cardsArr)

      

       
    }

    function toggleVideoMode(id){
        setVideoItems(prevItems=> {
        return prevItems.map((item) => { 
         return item.id === id ? {...item, videoMode: !item.videoMode} : {...item, videoMode: false}
        })
      })
    }

    function enableVideoMode(id){
        setVideoItems(prevItems=> {
         return prevItems.map((item) => { 
          return item.id === id ? {...item, videoMode: true} : {...item, videoMode: false}
         })
        })
     }

     function setLightBoxMode(id, val){
        setLightboxItems(prevItems=> {
        return prevItems.map((item) => { 
         return item.id === id ? {...item, lightBoxMode: val} : {...item, lightBoxMode: false}
        })
      })
    }

    const videoElements = videoItems.map((item, index) => (
        <li key={item.id} className="portfolio-item">
            <VideoItem item={item} enableVideoMode={enableVideoMode} toggleVideoMode={toggleVideoMode} />
        </li>
    ))

    const lightboxElements = lightboxItems.map((item, index) => (
        <li key={item.id} className="portfolio-item">
            <LightboxItem item={item} setLightBoxMode={setLightBoxMode} />
        </li>
    ))

    const cardElements = cardItems.map((item, index) => (
        <li key={item.id} className="card-item">
            <CardItem item={item} odd={index % 2==1}/>
        </li>
    ))

   


    const imgStyle={
        backgroundImage: `url(${props.info.homeImg})`
    }
    return(
        <div>
            <div className="jumbotron" style={imgStyle} >
                <h1>{props.info.homeHeading}</h1>
                <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.info.homeBody)}}></div>
            </div>
          
            <div className="container">
                <h2 className="section-title">Recent work</h2>
                <ul className="item-list">{videoElements}{lightboxElements}</ul>
                <h2 className="section-title">Services</h2>
                <ul className="card-list">{cardElements}</ul>
            </div>
            
           
        </div>
    )

}