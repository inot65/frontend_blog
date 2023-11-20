import {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);
  return (
    <div className='sidebar'>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>Mod de lucru</span>
        <img
          src='https://i.pinimg.com/236x/62/0d/66/620d66616a1334e0025e3df969e7f6ee.jpg'
          alt=''
          height={300}
        />
        <p>
          <b>Mod de lucru (RO):</b>
          <br></br>
          <span>
            Pentru a publica un post, trebuie sa creezi un cont nou cu optiunea
            <b> REGISTER</b> din meniu, apoi trebuie sa te loghezi in aplicatie.
          </span>
          <br />
          <br />
          <span>
            Cu optiunea <b>WRITE</b> din meniu poti publica o noua postare. Poti
            defini un titlu al postarii, poti incarca o imagine reprezentativa
            si poti seta una sau mai multe categorii pentru postare.
          </span>
          <br />
          <span>
            Apasand butonul <b>Publish</b> poti publica postarea in aplicatie.
          </span>
          <br />
          <span>
            Bineinteles, utilizatorul isi poate sterge orice <b>propria </b>
            postare facuta sau o poate edita.
          </span>
          <br />
          <span>
            In pagina <b>HOME</b> se vor vedea toate postarile facute de
            utilizatori.
          </span>
          <br />
          <span>
            Daca se da click pe un anumit user, se vor afisa postarile acelui
            user. Daca se da click pe categorie de mai jos, se vor afisa
            postarile din acea categorie.
          </span>
        </p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
          {categories.map((cat) => (
            <li className='sidebarListItem' key={cat._id}>
              <Link to={`/?cat=${cat.name}`} className='link'>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>FOLLOW US</span>
        <div className='sidebarSocial'>
          <i className='sidebarIcon fa-brands fa-square-facebook'></i>
          <i className='sidebarIcon fa-brands fa-square-x-twitter'></i>
          <i className='sidebarIcon fa-brands fa-pinterest'></i>
          <i className='sidebarIcon fa-brands fa-square-instagram'></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
