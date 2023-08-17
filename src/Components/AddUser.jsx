import React from 'react'

export default function AddUser({add}) {
    const handleOnSubmit=(e)=>{
      e.preventDefault();
      add(e.target.name.value,e.target.email.value)
      e.target.name.value=""
      e.target.email.value=""
    }
  return (
    <div>
<form  onSubmit={handleOnSubmit} >
    <h3>Add User</h3>
    <input placeholder='Name' name='name' />
    <input placeholder='Email' name="email"/>
    <button type='submit' >Add</button>
    <hr />
</form>
    </div>
  )
}
