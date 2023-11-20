import Home from './components/pages/home/Home';
import Single from './components/pages/single/Single';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import Settings from './components/pages/settings/Settings';
import Write from './components/pages/write/Write';
import TopBar from './components/topbar/TopBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useContext} from 'react';
import {Context} from './context/Context';
import About from './components/pages/about/About';
import Contact from './components/pages/contact/Contact';

function App() {
  const {user} = useContext(Context);

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={user ? <Home /> : <Register />} />
        <Route path='/write' element={user ? <Write /> : <Login />} />
        <Route path='/login' element={user ? <Home /> : <Login />} />
        <Route path='/settings' element={user ? <Settings /> : <Login />} />
        <Route path='/post/:postId' element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
