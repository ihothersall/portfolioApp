import React from "react"

export default function Sidebar(props) {
    const itemElements = props.items.map((item, index) => (
        <div key={item.id}>
            <div
                
                className={`title ${
                    item.id === props.currentItem.id ? "selected-item" : ""
                }`}
                onClick={() => props.setCurrentItemId(item.id)}
            >
                <h4 className="text-snippet">{item.title}</h4>
                <button 
                    className="delete-btn"
                    onClick={() => props.deleteItem(item.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Items</h3>
                <button className="new-item" onClick={props.newItem}>+</button>
            </div>
            {itemElements}
        </section>
    )
}
