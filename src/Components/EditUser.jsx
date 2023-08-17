// EditUser.jsx
import React, { useState } from 'react';

const EditUser = ({ id, name, email, onEdit }) => {
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    console.log(id, editedName, editedEmail)
    onEdit(id, editedName, editedEmail);
  }

  return (
    <form onSubmit={handleEditSubmit}>
      <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} />
      <input type="text" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditUser;
