import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../../context/Context';
import './topbar.css';

const TopBar = () => {
  const {user, dispatch} = useContext(Context);

  const handleLogout = () => {
    dispatch({type: 'LOGOUT'});
    window.location.replace('/');
  };

  return (
    <div className='top'>
      <div className='topleft'>
        <a href='https://www.facebook.com/' rel='noreferrer' target='_blank'>
          <i className='topIcon fa-brands fa-square-facebook'></i>
        </a>
        <a href='https://www.twitter.com/' rel='noreferrer' target='_blank'>
          <i className='topIcon fa-brands fa-square-x-twitter'></i>
        </a>
        <a href='https://www.pinterest.com/' rel='noreferrer' target='_blank'>
          <i className='topIcon fa-brands fa-pinterest'></i>
        </a>
        <a href='https://www.instagram.com/' rel='noreferrer' target='_blank'>
          <i className='topIcon fa-brands fa-square-instagram'></i>
        </a>
      </div>
      <div className='topcenter'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link to='/' className='link'>
              HOME
            </Link>
          </li>
          <li className='topListItem'>
            <Link to='/about' className='link'>
              ABOUT
            </Link>
          </li>
          <li className='topListItem'>
            <Link to='/contact' className='link'>
              CONTACT
            </Link>
          </li>
          <li className='topListItem'>
            <Link to='/write' className='link'>
              WRITE
            </Link>
          </li>
          <li className='topListItem' onClick={handleLogout}>
            {user ? 'LOGOUT ' + user.username : null}
          </li>
        </ul>
      </div>
      <div className='topright'>
        {user ? (
          user.profilePic ? (
            <Link to='/settings'>
              <img
                className='topImg'
                src={
                  !user.profilePic
                    ? 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg'
                    : user.profilePic
                }
                alt=''
              />
            </Link>
          ) : (
            <Link to='/settings'>
              <img
                className='topImg'
                src='https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg'
                alt=''
              />
            </Link>
          )
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link to='/login' className='link'>
                LOGIN
              </Link>
            </li>
            <li className='topListItem'>
              <Link to='/register' className='link'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className='topSearchIcon fa-solid fa-magnifying-glass'></i>
      </div>
    </div>
  );
};

export default TopBar;
