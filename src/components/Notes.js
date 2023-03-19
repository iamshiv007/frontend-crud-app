import React from 'react'

export const Note = (props) => {
  return (
    <div className="col-md-4">
        <div className="card mt-3 mx-2">
        <div className="card-body">
          <h5 className="card-title">{ props.note.title }</h5>
          <p className="card-text">{ props.note.description }</p>
          <p className="card-text">{ props.note.tag }</p>
        </div>
      </div>
      </div>
  )
}
