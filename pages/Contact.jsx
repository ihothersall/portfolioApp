import React from "react"

import Showdown from "showdown"


export default function Contact(props) {
   


    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  
    const imgStyle={
        backgroundImage:  `url(${props.info.contactImg})`
    }
        return (
            <div>
                <div className="jumbotron" style={imgStyle} >
                    <h1>{props.info.contactHeading}</h1>
                    <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.info.contactBody)}}></div>
                </div>
                <div className="container" >
                   
                </div>
            </div>
        );
}