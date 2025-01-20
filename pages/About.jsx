import React from "react"

import Showdown from "showdown"


export default function About(props) {
   

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    const imgStyle={
        backgroundImage:  `url(${props.info.aboutImg})`
    }
    return (
        <div>
            <div className="jumbotron" style={imgStyle} >
                <h1>{props.info.aboutHeading}</h1>
                <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.info.aboutBody)}}></div>
            </div>
            <div className="container" >
               
            </div>
        </div>
    );
}