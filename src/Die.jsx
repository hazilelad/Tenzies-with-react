import React from 'react'

export default function Die(props){
    let styles = props.isPressed  ? {backgroundColor: "#59E391"} : {backgroundColor: "white"}
    return(
        <div className='die' style={styles} onClick={props.toggleIsPressed}>{props.value}</div>
    )
}