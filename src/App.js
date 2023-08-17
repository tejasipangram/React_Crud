import React, {useEffect, useState } from 'react'
import CurdList from './Components/CurdList';
import AddUser from './Components/AddUser';

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
// fetching data
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

// Add user function
const add = async (name, email) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    });

    if (response.status !== 201) {
      console.error('Error adding user');
      return;
    }

    const data = await response.json();
    setUsers(users => [...users, data]);
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// delete user function
const ondelete = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    });

    if (response.status !== 200) {
      console.error('Error deleting user');
      return;
    }

    setUsers(users => users.filter(user => user.id !== id));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

// edit user function
// App.js
const onEdit = async (id, newName, newEmail) => {
  console.log(newName,newEmail)
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: newName,
        email: newEmail,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.log("Error editing user");
      return;
    }

    const updatedUserData = await response.json();

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          return { ...user, name: updatedUserData.name, email: updatedUserData.email };
        }
        return user;
      })
    );
  } catch (error) {
    console.log("Error editing user:", error);
  }
};



console.log(users)
  return (
    <div>
      <center>
        <h2>React Crud Using Jsonplaceholder</h2>
        <br />
        <AddUser add={add} />
        <div>
          {
            users.map((user) => (
              <CurdList key={user.id} id={user.id} name={user.name} email={user.email}
                ondelete={ondelete} onEdit={onEdit}
              />
            ))
          }
        </div>
      </center>
    </div>
  )
}