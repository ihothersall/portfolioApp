import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleXmark, faExpand } from '@fortawesome/free-solid-svg-icons'
import ItemInfo from "../components/ItemInfo"

export default function LightboxItem(props) {

    

    const imgStyle={
        backgroundImage: `url(${props.item.thumbnail})`
    }

    function handleModeChange(e, val){
        e.stopPropagation();
        props.setLightBoxMode(props.item.id, val)
    }
    

   
    return (
        <div>
            <div className='aspect-wrapper' onClick={(e)=>handleModeChange(e, true)}>
                <div className="aspect-content">
                    <div>
                        <div className="overlay">
                            <div className="overlay-content">
                                <FontAwesomeIcon  icon={faExpand} className="action-button" />
                            </div>
                        </div>
                        <div className="thumbnail" style={imgStyle}></div>
                        {props.item.lightBoxMode && 
                        
                            <div className="modal">
                                <FontAwesomeIcon className="close-button" icon={faCircleXmark}  onClick={(e)=>handleModeChange(e, false)}/>
                                <div className="modal-content">
                                    
                                    <div className="thumbnail" style={imgStyle}></div>
                                </div>
                            </div>
                        
                        }
                </div>
                </div>
            </div>

            <ItemInfo item={props.item}/>

        </div>                    
    )
}