import axios from 'axios';
import {useContext, useState, useEffect} from 'react';
import {Context} from '../../../context/Context';
import './write.css';

function Write() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  const {user} = useContext(Context);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/categories`
      );
      setAllCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const newPost = {
      title,
      desc,
      username: user.username,
      categories,
    };

    let filename = '';
    var url = '';

    if (file) {
      const data = new FormData();
      filename = file.name;
      data.append('name', filename);
      data.append('file', file);
      data.append('api_key', `${process.env.REACT_APP_API_KEY}`);
      data.append('upload_preset', 'upload');

      try {
        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/secunia_toni/image/upload',
          data
        );
        // console.log('Raspuns la upload (uploadRes.data): ', uploadRes.data);

        // obtin url-ul unde s-a urcat imaginea pe cloudinary.com
        url = uploadRes.data.url;
        // console.log('Url returnat : ', url);

        newPost.photo = url;
        setPhoto(url);
      } catch (error) {
        console.log('Eroare upload fisier: ', error);
        setError(true);
      }
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        newPost
      );
      // console.log(
      //   ' Redirectionare catre noul post: ',
      //   `/posts/${res.data._id}`
      // );
      window.location.replace('/post/' + res.data._id);
    } catch (error) {
      console.log('Eroare upload post: ', error);
      setError(false);
    }
  };

  const toggleCategorie = (e) => {
    e.preventDefault();
    const valoareSelectata = e.target.id;
    const categoriiSelectate = [...categories];
    // gasesc indicele
    const index = categoriiSelectate.indexOf(valoareSelectata);
    if (index >= 0) {
      // valoarea este deja in "categories"
      // elimin elementul
      categoriiSelectate.splice(index, 1);
      e.target.classList.remove('catSelectata');
    } else {
      // nu o contine, o adaug la categories
      categoriiSelectate.push(valoareSelectata);
      e.target.classList.add('catSelectata');
    }
    setCategories(categoriiSelectate);
  };

  return (
    <div className='write'>
      {file ? (
        <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
      ) : photo ? (
        <img className='writeImg' src={photo} alt='' />
      ) : (
        <img
          src='https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
          alt='Fara imagine postata'
          className='writeImg'
        />
      )}
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput'>
            <i className='writeIcon fa-solid fa-plus'></i>
          </label>
          <input
            type='file'
            name=''
            id='fileInput'
            style={{display: 'none'}}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type='text'
            placeholder='Titlul dorit...'
            className='writeInput'
            autoFocus={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className='writeCat'>
          <span className='writeTitleCat'>CATEGORIES</span>
          <ul className='writeCatList'>
            {allCategories.map((cat) => (
              <li className='writeCatListItem' key={cat._id}>
                <button
                  className='writeSelectCat '
                  onClick={toggleCategorie}
                  id={cat.name}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='writeFormGroup'>
          <textarea
            placeholder='Spune povestea ta...'
            rows='4'
            className='writeInput writeText'
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>
        <button className='writeSubmit' type='submit'>
          Publica
        </button>
        {error && (
          <span className='error'>Someting went wrong with this new post!</span>
        )}
      </form>
    </div>
  );
}

export default Write;
