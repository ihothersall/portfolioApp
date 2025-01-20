import React from "react"
import Showdown from "showdown"

export default function CardItem(props) {

    
   const imgStyle={
     backgroundImage: `url(${props.item.thumbnail})`
    }
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  
   
   
    return (
        <div className={`card-content  ${props.odd? 'odd' :''} `}>
            <div className="card-copy">
                <h3>{props.item.title}</h3>

                <p>{props.item.subHeading}</p>

                <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.item.body)}}></div>
            </div>
            <div className="card-img-col" >
                <div className="card-img" style={imgStyle}></div>
            </div>
        </div>                    
    )
}