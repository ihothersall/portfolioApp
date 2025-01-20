import React from "react"
import ReactPlayer from "react-player"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import ItemInfo from "../components/ItemInfo"

export default function VideoItem(props) {


    const [loading, setLoading]=React.useState(true)
    const [playing, setPlaying]=React.useState(false)
    const [buffering, setBuffering]=React.useState(false)

    
    React.useEffect(() => {
        setPlaying(props.item.videoMode);
       }, [props.item.videoMode]);
   
    function togglePlay(){
        setPlaying(prevPlaying => !prevPlaying)

        if (loading){
            props.toggleVideoMode(props.item.id)
        }else{
            if(!props.item.videoMode){
                props.enableVideoMode(props.item.id)
            }
        }
        
    }
    function play(e){
        e.stopPropagation();
        setPlaying(true)
    }
    function pause(e){ 
        e.stopPropagation();
        setPlaying(false)
       
    }
    function handleBuffer(){
        setBuffering(true)
    }
    function handleBufferEnd(){
        setBuffering(false)
     }
     const imgStyle={
        backgroundImage: `url(${props.item.thumbnail})`
    }
    
   
    return (

       
       <div>
            <div className='aspect-wrapper 'onClick={togglePlay} >
                <div className="aspect-content">
                    <div className={`video-content ${props.item.videoMode? 'video-mode' : ''}`}>

    
                      { (!props.item.videoMode || loading) && <div className={`overlay ${loading && 'loading'}`}>
                            <div className="overlay-content">
                            
                                {!props.item.videoMode  && 
                                <div>
                                    <FontAwesomeIcon className="action-button" icon={faCirclePlay} />
                                </div>
                                 }
                                {props.item.videoMode && loading && <div className="loader"><div className="spinner"></div></div>}
                            </div>
                        </div>}

                        {
                        //(!props.item.videoMode || loading) && <img src={props.item.thumbnail} className="thumbnail"/>}
                        (!props.item.videoMode || loading) &&  <div className="thumbnail" style={imgStyle}></div>
                        }
                       
                    
                        {
                        //If video is still buffering when we exit video mode we unmount the component or it will start playing. 
                        //Otherwise we just leave the player loaded in the background.
                        !(!props.item.videoMode && buffering) && <ReactPlayer  
                    
                                url={props.item.video}
                                playing={playing} 
                                onPlay={()=>setLoading(false)}
                                onBuffer={handleBuffer}
                                onBufferEnd={handleBufferEnd}
                                controls={true}
                                width="100%"
                                height="100%"
                            /> }

                    </div>
                </div>
            </div>

           <ItemInfo item={props.item}/>

        </div>
        
    )
}