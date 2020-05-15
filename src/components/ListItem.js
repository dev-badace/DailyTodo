import React from 'react'

export default (props) => {
  return (
    <div className="list__item">
      <h3 className="list__item--heading">{props.todo}</h3>
      <button className="list__item--button-remove" onClick={() => {
        props.remove(props.todo)
      }}>&#x02717;</button>
    </div>
  )
}