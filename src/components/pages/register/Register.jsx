import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      const res = await axios.post(
        process.env.REACT_APP_API_URL + '/auth/register',
        {
          username,
          email,
          password,
        }
      );
      // redirectionare dupa succes la inregistrare user
      res.data && window.location.replace('/');
    } catch (error) {
      // console.log(error);
      setError(true);
    }
  };

  return (
    <div className='register'>
      <span className='registerTitle'>Register</span>
      <form className='registerForm' onSubmit={submitHandler}>
        <label>Username</label>
        <input
          className='registerInput'
          type='text'
          placeholder='Enter your username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className='registerInput'
          type='email'
          placeholder='Enter your email...'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className='registerInput'
          type='password'
          name=''
          id=''
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='registerButton' type='submit'>
          Register
        </button>
        {error && <span className='error'>Someting went wrong!</span>}
      </form>
      <button className='registerLoginButton'>
        <Link className='link' to='/login'>
          Login
        </Link>
      </button>
    </div>
  );
};

export default Register;
