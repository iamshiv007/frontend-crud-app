import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Navbar, NavbarBrand } from 'reactstrap'

import { Trash2, Edit } from 'react-feather'
import logo from './faviconn.ico'

export const Home = () => {
    const [formData, setFormData] = useState({})
    const [modalData, setModalData] = useState({title:"", description:"", tag:""})
    // Notes array 
    const [allNotes, setAllNotes] = useState([])
    const [id, setId] = useState(1)
    //Alert
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
   // Modal
    const [modal, setModal] = useState(false)

  const toggle = (id) => {
    setModal(!modal)
    const selectedObj = allNotes.filter((note) => note.id === id)
    setModalData(...selectedObj)
  }

  const handleInfo = (e) =>{
    setFormData({ ...formData, [e.target.name]:e.target.value })
  }
  const handleUpdateInfo = (e) =>{
    setModalData({ ...modalData, [e.target.name]:e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
       console.log('create')
    if(formData.title && formData.description){
            setAllNotes([...allNotes, { id , ...formData}])
            setId(id + 1)
            setFormData({title:"", description:"", tag:""})
    } else {
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 2000)
  }

  }

  const handleDelete = (id) => {
    setAllNotes(allNotes.filter((note) => note.id !== id))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    toggle()
    console.log('update')
    const allNotesArray = [...allNotes]
       const index = allNotes.findIndex((note) => note.id === modalData.id)
       allNotesArray[index] = modalData
       setAllNotes(allNotesArray)
       setModalData({title:"", description:"", tag:""})
  }

  const  clearModalData = () => {
    toggle()
    setModalData({title:"", description:"", tag:""})
  }

  return (
    <>
     {/* Navbar */}
     <Navbar
    color="dark"
    dark
  >
    <NavbarBrand href="/" className='d-flex align-items-center'>
      <img
        alt="logo"
        src={logo}
        style={{
          height: 50,
          width: 50
        }}
      />
    <h3 className="text-light ms-3">Notes App</h3>
    </NavbarBrand>
  </Navbar>
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
              <div><Edit onClick={() => toggle(note.id)} style={{cursor:'pointer'}} color='blue'/> <Trash2 style={{cursor:'pointer'}} onClick={() => handleDelete(note.id)} color='red'/></div>
              </div>
            </div>
          </div>
          </div>
        )}
        </div>

    {/* Modal */}
    <div>
      <Modal isOpen={modal} centered>
        <form className='my-box m-auto' onSubmit={handleUpdate}>
        <ModalHeader>Update Note</ModalHeader>
        <ModalBody>
  <div className="form-group mt-2">
    <label htmlFor="title">Title</label>
    <input onChange={handleUpdateInfo} name='title' value={modalData.title}  type="text" className="form-control" id="title" placeholder="Enter Your Note Titel"/>
  </div>
  <div className="form-group mt-2">
    <label htmlFor="description">Description</label>
    <input onChange={handleUpdateInfo} name='description' value={modalData.description}  type="text" className="form-control" id="description" placeholder="Enter Your Note Description"/>
  </div>
  <div className="form-group mt-2">
    <label htmlFor="tag">Tag</label>
    <input onChange={handleUpdateInfo} name='tag' value={modalData.tag}  type="text" className="form-control" id="tag" placeholder="Enter Your Note Tag"/>
  </div>
        </ModalBody>
        <ModalFooter>
          <Button type='submit' color="primary">
            Update
          </Button>
          <Button onClick={clearModalData} color="secondary">
            Cancel
          </Button>
        </ModalFooter>
</form>
      </Modal>
    </div>
    </div>
    </>
  )
}
