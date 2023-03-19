import React, { useState } from 'react'
import { Alert } from 'reactstrap'
import { Trash2, Edit } from 'react-feather'

export const Home = () => {
    const [formData, setFormData] = useState({tag:"general"})
    const [allNotes, setAllNotes] = useState([])
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [id, setId] = useState(1)

  const handleInfo = (e) =>{
    setFormData({ ...formData, [e.target.name]:e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formData.id){
       const allNotesArray = [...allNotes]
       const index = allNotes.findIndex((note) => note.id === formData.id)
       allNotesArray[index] = formData
       setAllNotes(allNotesArray)
       setFormData({title:"", description:"", tag:""})
    } else {
    if(formData.title && formData.description){
            setAllNotes([...allNotes, { id , ...formData}])
            setId(id + 1)
            setFormData({title:"", description:"", tag:""})
    } else {
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 2000);
    }
  }
  }

  const handleDelete = (id) => {
    setAllNotes(allNotes.filter((note) => note.id !== id))
  }

  const handleUpdate = (id) => {
    const selectArray = allNotes.filter((note) => note.id === id)
    setFormData(...selectArray)
  }
 

  return (
        <div className="container mb-2"> 

        <Alert color="danger" style={{position:'fixed', top:'1%', width:'80%', left:'10%'}} isOpen={visible}>
        Title and decription is required
    </Alert>
    
        <Alert color="info" style={{position:'fixed', top:'0', width:'80%', margin:'auto'}} isOpen={visible1}>
        Processing...
    </Alert>

       <form className='my-box m-auto' onSubmit={handleSubmit}>
       <h1>Notes</h1>
  <div className="form-group mt-2">
    <label htmlFor="title">Title</label>
    <input onChange={handleInfo} name='title' value={formData.title}  type="text" className="form-control" id="title" placeholder="Enter Your Note Titel"/>
  </div>
  <div className="form-group mt-2">
    <label htmlFor="description">Description</label>
    <input onChange={handleInfo} name='description' value={formData.description}  type="text" className="form-control" id="description" placeholder="Enter Your Note Description"/>
  </div>
  <div className="form-group mt-2">
    <label htmlFor="tag">Tag</label>
    <input onChange={handleInfo} name='tag' value={formData.tag}  type="text" className="form-control" id="tag" placeholder="Enter Your Note Tag"/>
  </div>
  <button type="submit" className="btn btn-primary mt-2">Submit</button>
</form>

      <div className="row">
     {  allNotes.map((note, key) => 
            <div className="col-md-4" key={key}>
            <div className="card mt-3 mx-2">
            <div className="card-body">
              <h5 className="card-title">{ note.title }</h5>
              <p className="card-text">{ note.description }</p>
              <div>
              <p className="card-text">{ note.tag }</p>
              <div><Edit onClick={() => handleUpdate(note.id)} style={{cursor:'pointer'}} color='blue'/> <Trash2 style={{cursor:'pointer'}} onClick={() => handleDelete(note.id)} color='red'/></div>
              </div>
            </div>
          </div>
          </div>
        )}
        </div>

    </div>
  )
}
