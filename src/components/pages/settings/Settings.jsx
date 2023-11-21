import './settings.css';
import Sidebar from '../../sidebar/Sidebar';
import {Context} from '../../../context/Context';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const {user, dispatch} = useContext(Context);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
    setProfilePic(user.profilePic);
  }, [user.username, user.email, user.password, user.profilePic]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({type: 'UPDATE_START'});

    setSuccess(false);
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      profilePic,
    };

    let filename = '';
    let url = '';

    if (file) {
      const data = new FormData();
      filename = file.name;
      data.append('name', filename);
      data.append('file', file);
      data.append('api_key', process.env.REACT_APP_API_KEY);
      data.append('upload_preset', 'upload');
      // nume fisier
      // console.log('Nume fisier folosit: ', filename);

      try {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/secunia_toni/image/upload',
          data
        );
        // console.log('Raspuns la upload (uploadRes.data): ', uploadRes.data);

        // obtin url-ul unde s-a urcat imaginea pe cloudinary.com
        url = uploadRes.data.url;
        // console.log('Url returnat : ', url);

        updatedUser.profilePic = url;
        setProfilePic(url);
      } catch (error) {
        console.log('Eroare upload imagine profil : ', error);
      }
    }

    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + '/users/' + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({type: 'UPDATE_SUCCESS', payload: res.data});

      window.location.replace('/');
    } catch (error) {
      console.log('Eroare upload post: ', error);
      dispatch({type: 'UPDATE_FAILURE'});
    }
  };

  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsTitleUpdate'>Update Your Account</span>
          <span className='settingsTitleDelete'>Delete Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settingsPP'>
            {user.profilePic && (
              <img
                src={file ? URL.createObjectURL(file) : user.profilePic}
                alt='imaginea de profil'
              />
            )}
            <label htmlFor='fileInput'>
              <i className='settingsPPIcon far fa-user-circle'></i>{' '}
            </label>
            <input
              id='fileInput'
              type='file'
              style={{display: 'none'}}
              className='settingsPPInput'
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            value={username}
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settingsSubmitButton' type='submit'>
            Update profile
          </button>
          {success && (
            <span
              style={{color: 'green', textAlign: 'center', marginTop: '20px'}}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
