import React, { useState } from 'react';
import EditUser from './EditUser';

const CurdList = ({ id, email, name, ondelete, onedit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    ondelete(id);
  };

  return (
    <div>
      <div className="userlist d-flex w-75 justify-content-between align-items-center m-2 p-2 border" style={{ borderRadius: 15 }}>
        <span>{name}</span>
        <span>{email}</span>
        <span>
          {isEditing ? (
            <EditUser
              id={id}
              name={name}
              email={email}
              onEdit={(newName, newEmail) => {
                setIsEditing(false); // Close the edit form
                onedit(id, newName, newEmail);
              }}
            />
          ) : (
            <>
              <button className='m-2 btn btn-success' onClick={handleEdit}>Edit</button>
              <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default CurdList;
