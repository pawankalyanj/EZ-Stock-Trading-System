import React from "react"
import '../styles/home.css'

const Subtitle = ({subtitle})=> {
    return <div>
        <h3 className="section__subtitle"> {subtitle} </h3>
    </div>
}

export default Subtitle;