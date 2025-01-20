import React from "react"
import ReactMde from "react-mde"
//const ReactMde = R.default
import Showdown from "showdown"

export default function Editor({ currentItem, updateItem }) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })  

    return (
        <section className="pane editor">
            <fieldset><label htmlFor ="title">Title</label><input id="title" name="title"  placeholder="Title" value={currentItem.title}  onChange={updateItem} maxlength="200"/></fieldset>
            <fieldset><label htmlFor ="subHeading">Sub Heading</label><input id="subHeading" name="subHeading"  placeholder="Sub heading" value={currentItem.subHeading}  onChange={updateItem} maxlength="200"/></fieldset>
            <fieldset><label htmlFor ="thumbnail"> Thumbnail</label><input id="thumbnail" name="thumbnail" placeholder="Thumbnail" value={currentItem.thumbnail}  onChange={updateItem}/></fieldset>
            <fieldset><label htmlFor ="video">Video</label>
            <input id="video" name="video" placeholder="Video url" value={currentItem.video}  onChange={updateItem}/>
            </fieldset>
            <fieldset>
            <label>Description</label>
            <ReactMde
                value={currentItem.body}
                onChange={updateItem}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            /></fieldset>
        </section>
    )
}
