import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleInfo, faCircleXmark, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Showdown from "showdown"

export default function ItemInfo(props) {
    const [expanded, setExpanded] = React.useState(false)

    function toggleExpanded(){
        if (props.item.body.length>0){
            setExpanded(prevExpanded => !prevExpanded)
        }
    }

    function closeInfo(e){
        e.stoppropagation();
        setExpanded(false);
    }

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    return (
        <div className={`item-info ${props.item.body.length>0? 'expandable':''}`} onClick={toggleExpanded}>
            <h3>{props.item.title}</h3>
            <p>{props.item.subHeading} {props.item.body.length>0 && <span className="toggle-expanded" ><FontAwesomeIcon className="info-button" icon={expanded? faCaretUp : faCaretDown} /></span>}</p>
            {expanded && <div className="expanded-item-info"> <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.item.body)}}></div> </div>}
        </div>
    )
}
