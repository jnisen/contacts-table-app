import React, { useState, Fragment } from 'react';
import './App.css';
import data from './mock-data.json'
import ReadOnlyRow from './components/ReadOnlyRow'
import EditableRow from './components/EditableRow'

import { nanoid } from 'nanoid'

const App = () => {

  const [contacts, setContacts] = useState(data) //inicializamos con la data que ya tenemos. queremos que contacts tome primero data y luego se vaya agregando
  //por medio del setContacts
  const [addFormData, setAddFormData] = useState({
    fullname: '',
    address: '',
    phonenumber: '',
    email: '',
  })

  const [editContactId, setEditContactId] = useState({
    fullname: '',
    address: '',
    phonenumber: '',
    email: '',
  })

  const [editFormData, setEditFormData] = useState(null)

  const handleAddFormChange = (e) => {
    e.preventDefault();

    //each attributes must have the same orden as the useState for taking the information and reemplaace it fot the form values

    const fieldName = e.target.getAttribute('name')
    const fieldValue = e.target.value;
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData)

  }

  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name')
    const fieldValue = e.target.value;
    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData)
  }

  const handleAddContactSumbit = (e) => {

    e.preventDefault();

    const newContact = {
      id: nanoid(),
      fullname: addFormData.fullname,
      address: addFormData.address,
      phonenumber: addFormData.phonenumber,
      email: addFormData.email,
    }

    const newContacts = [...contacts, newContact]

    setContacts(newContacts)
  }

  const handleEditClick = (e, contact) => {
    e.preventDefault()
    setEditContactId(contact.id)

    const formValues = {
      fullname: contact.fullname,
      address: contact.address,
      phonenumber: contact.phonenumber,
      email: contact.email,
    }

    setEditFormData(formValues)
  }

  const handleEditFormSumbit = (e) => {
    e.preventDefault()

    const editedContact = {
      id: editContactId,
      fullname: editFormData.fullname,
      address: editFormData.address,
      phonenumber: editFormData.phonenumber,
      email: editFormData.email,
    }

    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact.id === editContactId)

    newContacts[index] = editedContact

    setContacts(newContacts)
    setEditContactId(null)

  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts]
    const index = contacts.findIndex((contact) => contact.id === contactId)
    newContacts.splice(index, 1)
    setContacts(newContacts)
  }

  return (
    <div className="app-container">
      <h1>Contacts Table</h1>
      <h3>Add a Contact</h3>
      <form onSubmit={handleAddContactSumbit}>
        <input
          type="text"
          name="fullname"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
          required />
        <input
          type="text"
          name="address"
          placeholder="Enter a address..."
          onChange={handleAddFormChange}
          required />
        <input
          type="tel"
          name="phonenumber"
          placeholder="Enter a tel..."
          onChange={handleAddFormChange}
          required />
        <input
          type="email"
          name="email"
          placeholder="Enter a email..."
          onChange={handleAddFormChange}
          required />
        <button type="submit">Add</button>
      </form>
      <form onSubmit={handleEditFormSumbit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact =>
              <Fragment>
                {editContactId === contact.id ?
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick} />
                  : <ReadOnlyRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />}
              </Fragment>
            )}
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default App