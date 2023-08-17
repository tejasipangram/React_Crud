import React, { useState } from 'react'
import CurdList from './Components/CurdList';
import AddUser from './Components/AddUser';

export default function App() {
  const [users, setUsers] = useState([]);

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
    await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify
        ({
          name: name,
          email: email
        }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then((res) => {
        if (res.status !== 200) {
          return
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setUsers((users) =>
          [...users, data]
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

// delete user function
  const ondelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.status !== 200)
          return
        else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          )
        }
      })
      .catch((err) => {
        console.log(err)
      }
      )
  }

// edit user function
const onEdit = async (id, newName, newEmail) => {
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: newName,
      email: newEmail
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  });

  setUsers(prevUsers => prevUsers.map(user => {
    if (user.id === id) {
      return { ...user, name: newName, email: newEmail };
    }
    return user;
  }));
}

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
