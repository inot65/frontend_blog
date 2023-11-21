import axios from 'axios';
import {useEffect, useState, useContext} from 'react';
import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
import {Context} from '../../context/Context';
import './singlepost.css';

const SinglePost = () => {
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(false);

  const [allCategories, setAllCategories] = useState([]);

  const [updateMode, setUpdateMode] = useState(false);

  const {user} = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${postId}`
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories);
      setPhoto(res.data.photo);
    };
    getPost();
  }, [postId]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/categories`
      );
      setAllCategories(res.data);
    };
    fetchCategories();
  }, []);

  // handler pentru stergere post
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
        data: {username: user.username},
      });

      window.location.replace('/');
    } catch (error) {
      console.log('Eroare la stergere post: ', error);
    }
  };

  // handler pentru update post
  const handleUpdate = async () => {
    setError(false);
    const updatedPost = {
      title,
      desc,
      username: user.username,
      categories,
      photo,
    };
    let filename = '';
    var url = post.photo;
    if (file) {
      // obtin fisierul incarcat
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

        updatedPost.photo = url;
        setPhoto(url);
      } catch (error) {
        console.log('Eroare upload fisier: ', error);
        setError(true);
      }
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        categories,
        photo: url,
      });

      setError(false);
      setUpdateMode(false);
      window.location.reload();
    } catch (error) {
      console.log('Eroare la actualizare post: ', error);
      setError(true);
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
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {updateMode ? (
          file ? (
            <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
          ) : post.photo ? (
            <img src={post.photo} alt='Imagine postata' className='writeImg' />
          ) : (
            <img
              src='https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              alt='Fara imagine postata'
              className='singlwriteImgePostImg'
            />
          )
        ) : post.photo ? (
          <img
            src={post.photo}
            alt='Imagine postata'
            className='singlePostImg'
          />
        ) : (
          <img
            src='https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
            alt=''
            className='singlePostImg'
          />
        )}
        {updateMode ? (
          <>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='singlePostTitleInput'
              autoFocus={true}
            />
          </>
        ) : (
          <h1 className='singlePostTitle'>
            {title}
            {post.username === user?.username && (
              <div className='singlePostEdit'>
                <i
                  className='singlePostIcon fa-regular fa-pen-to-square'
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className='singlePostIcon fa-regular fa-trash-can'
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className='singlePostInfo'>
          <span className='singlePostAuthor'>
            <Link to={`/?user=${post.username}`} className='link'>
              Author: <b>{post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>
            Date : <b>{new Date(post.createdAt).toDateString()}</b>
          </span>
        </div>
        <div className='singlePostCat'>
          <span className='singlePostTitleCat'>CATEGORIES</span>
          <ul className='singlePosteCatList'>
            {allCategories.map((cat) => {
              return (
                <li className='singlePostCatListItem' key={cat._id}>
                  {updateMode ? (
                    <button
                      className={
                        'singlePostSelectCat ' +
                        (categories.indexOf(cat.name) >= 0
                          ? ' catSelectata'
                          : '')
                      }
                      onClick={toggleCategorie}
                      id={cat.name}
                    >
                      {cat.name}
                    </button>
                  ) : (
                    <button
                      className={
                        'singlePostSelectCat ' +
                        (categories.indexOf(cat.name) >= 0
                          ? ' catSelectata'
                          : '')
                      }
                      // {updateMode && onClick={toggleCategorie} }
                      id={cat.name}
                    >
                      {cat.name}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        {updateMode ? (
          <textarea
            rows='6'
            className='singlePostDescInput'
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className='singlePostDesc'>{desc}</p>
        )}

        {updateMode && (
          <button className='singlePostButton' onClick={handleUpdate}>
            Update post
          </button>
        )}
        {error && (
          <span className='error'>Someting went wrong with this new post!</span>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
