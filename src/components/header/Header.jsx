import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerTitleSm'>React & Node</span>
        <span className='headerTitleLg'>Blog</span>
      </div>
      <img
        className='headerImg'
        src='https://images.pexels.com/photos/1624497/pexels-photo-1624497.jpeg?auto=compress&cs=tinysrgb&w=1600'
        alt=''
      />
    </div>
  );
};

export default Header;
