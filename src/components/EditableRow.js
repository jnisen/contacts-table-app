import React from 'react'

const EditableRow = ({ editFormData, handleEditFormChange,handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Enter a name..."
                    onChange={handleEditFormChange}
                    value={editFormData.fullname}
                    required />
            </td>
            <td>
                <input
                    type="text"
                    name="address"
                    placeholder="Enter a address..."
                    onChange={handleEditFormChange}
                    value={editFormData.address}
                    required />
            </td>
            <td>
                <input
                    type="tel"
                    name="phonenumber"
                    placeholder="Enter a tel..."
                    onChange={handleEditFormChange}
                    value={editFormData.phonenumber}
                    required />
            </td>
            <td>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter a email..."
                    onChange={handleEditFormChange}
                    value={editFormData.email}
                    required />
            </td>
            <td>
                <button type="submit">
                    Save
                </button>
                <button type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    )
}

export default EditableRow