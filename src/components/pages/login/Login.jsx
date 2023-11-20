import './login.css';
import {Link} from 'react-router-dom';
import {useContext, useRef, useState} from 'react';
import {Context} from '../../../context/Context';
import axios from 'axios';

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);

  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // pornesc logarea, schim starea contextului
    dispatch({type: 'LOGIN_START'});
    try {
      setError(false);
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      // actualizez contextul
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
      setError(true);

      // redirectionare dupa succes la inregistrare user
      res.data && window.location.replace('/');
    } catch (error) {
      dispatch({type: 'LOGIN_FAILURE'});
      setError(true);
    }
  };

  return (
    <div className='login'>
      <span className='loginTitle'>LOGIN</span>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className='loginInput'
          type='text'
          ref={userRef}
          placeholder='Enter your username...'
        />
        <label>Password</label>
        <input className='loginInput' type='password' ref={passwordRef} />
        <button className='loginButton' type='submit' disabled={isFetching}>
          Login
        </button>
        {error && <span className='error'>Someting went wrong!</span>}
      </form>
      <button className='loginRegisterButton'>
        <Link className='link' to='/register'>
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
