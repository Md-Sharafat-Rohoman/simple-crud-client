import React from 'react';
import { useLoaderData } from 'react-router';

const Edit = () => {
    const user = useLoaderData();
    console.log(user);

    const handleEditUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = { name, email };
        console.log(updatedUser);

        fetch(`http://localhost:3000/users/${user._id}`,{
            method: "PUT",
            headers : {
                "Content-Type": "application/json",
            }
            ,
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('after updating user',  data)
        })

    }
    return (
        <div>
            <form onSubmit={handleEditUser}>
                <input type="text" name="name" defaultValue={user.name} id="" />
                <br />
                <input type="email" name="email" defaultValue={user.email} id="" />
                <br />
                <input type="submit" value="Add user" />
            </form>
        </div>
    );
};

export default Edit;