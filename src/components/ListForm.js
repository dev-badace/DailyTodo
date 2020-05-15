import React from 'react'

export default (props) => {
  
  return(
    <form className="list__form" onSubmit={props.onSubmit} autoComplete="off">
       <input className="list__form--input" type="text" name="search" placeholder="Add A New Todo" spellCheck="false"/>
       <button className="list__form--button-add"> &#10003; </button>
    </form>
  )
}