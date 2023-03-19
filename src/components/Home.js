import React, { useState } from 'react'
import { Note } from './Notes'
import { Alert } from 'reactstrap'

export const Home = () => {
    const [formData, setFormData] = useState({tag:"general"})
    const [allNotes, setAllNotes] = useState([])
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [id, setId] = useState(0)

  const handleInfo = (e) =>{
    setFormData({ ...formData, [e.target.name]:e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formData.title && formData.description){
            setAllNotes([...allNotes, { id , ...formData}])
            setId(id + 1)
            console.log(allNotes)
    } else {
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 2000);
    }
  }



 

  return (
        <div className="container mb-2"> 

        <Alert color="info" style={{position:'fixed', top:'0', width:'80%', margin:'auto'}} isOpen={visible}>
        Note Created
    </Alert>

        <Alert color="danger" style={{position:'fixed', top:'0', width:'80%', margin:'auto'}} isOpen={visible}>
        Title and decription is required
    </Alert>
    
        <Alert color="info" style={{position:'fixed', top:'0', width:'80%', margin:'auto'}} isOpen={visible1}>
        Processing...
    </Alert>

       <form className='my-box m-auto' onSubmit={handleSubmit}>
       <h1>Notes</h1>
  <div className="form-group mt-2">
    <label htmlFor="title">Title</label>
    <input onChange={handleInfo} name='title' type="text" className="form-control" id="title" placeholder="Enter Your Note Titel"/>
  </div>
  <div className="form-group mt-2">
    <label htmlFor="description">Description</label>
    <input onChange={handleInfo} name='description' type="text" className="form-control" id="description" placeholder="Enter Your Note Description"/>
  </div>
  <div className="form-group mt-2">
    <label htmlFor="tag">Tag</label>
    <input onChange={handleInfo} name='tag' type="text" className="form-control" id="tag" placeholder="Enter Your Note Tag"/>
  </div>
  <button type="submit" className="btn btn-primary mt-2">Submit</button>
</form>

      <div className="row">
     {  allNotes.map((note, key) => 
        <Note key={key} note={note} />
        )}
        </div>

    </div>
  )
}
