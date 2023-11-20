import {Link} from 'react-router-dom';
import './post.css';

const Post = ({post}) => {
  return (
    <div className='post'>
      {post.photo ? (
        <Link to={`/post/${post._id}`} className='link'>
          {post.photo && (
            <img className='postImg' src={post.photo} alt='Imagine postata' />
          )}
        </Link>
      ) : (
        <img
          src='https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
          alt='Fara imagine postata'
          className='postImg'
        />
      )}
      <div className='postInfo'>
        <div className='postCats'>
          {post.categories.map((c) => (
            <Link to={`/?cat=${c}`} className='link' key={c}>
              <span className='postCat'>{c}</span>
            </Link>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          <span className='postTitle'>{post.title}</span>
        </Link>
        <hr />
        <Link to={`/?user=${post.username}`} className='link'>
          Author: <b>{post.username}</b>
        </Link>
        <span className='postDate'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className='postDesc'>{post.desc}</p>
    </div>
  );
};

export default Post;
