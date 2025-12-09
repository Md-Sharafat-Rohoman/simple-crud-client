import React, { use, useState } from 'react';
import { Link } from 'react-router';

const Users = ({ userPromise }) => {
    const initialUsers = use(userPromise);
    console.log(initialUsers);
    const [users, setUsers] = useState(initialUsers);

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email };
        console.log(user);


        // creat data post method
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after creating user in the database', data);
                if (data.insertedId) {
                    // const newUsers = [...users, user];
                    user._id = data.insertedId;
                    const newUsers = [...users, user]
                    setUsers(newUsers);
                    alert('user added successfully')
                    e.target.reset();
                }
            })
    }

    const handleClick = (id) =>{
        console.log('delete clicked', id);

        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            const reamaining = users.filter(user => user._id !== id);
            setUsers(reamaining);
            console.log('after delete' , data);
        })
    }


    return (
        <div>
            <div>
                <h1> users Length : {users.length}</h1>
                <form onSubmit={handleAddUser}>
                    <input type="text" name='name' />
                    <br />
                    <input type="email" name="email" id="" />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>
            <div>
                {
                    users.map(user => <p key={user._id}>{user.name} - {user.email} <Link to={`/users/${user._id}`}>Details</Link> <button onClick={()=> handleClick(user._id)}>X</button> </p>)
                }
            </div>
        </div>
    );
};

export default Users;