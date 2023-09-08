import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const userId = id ? parseInt(id, 10) : 0;
  const [user, setUser] = useState({
    id: userId,
    username: '',
    email: '',
  });

 useEffect(() => {
    if (userId !== 0) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => {
          setUser({ ...res.data });
        })
        .catch(err => console.log(err));
    }
  }, [userId]);

  const navigate = useNavigate();

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, user)
      .then(res => {
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="username" className="form-control" placeholder="Enter Name" value={user.username}
              onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="form-control" placeholder="Enter Email" value={user.email}
              onChange={handleInputChange}/>
          </div>
          <button className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Update
