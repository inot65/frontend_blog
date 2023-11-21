import {useEffect, useState} from 'react';
import './home.css';
import Header from '../../header/Header';
import Posts from '../../posts/Posts';
import Sidebar from '../../sidebar/Sidebar';
import axios from 'axios';
import {useLocation} from 'react-router';

export default function Home() {
  const [posts, setPosts] = useState([]);
  // partea asta este pt cazul cind caut dupa username sau dupa categorie
  // vazi ca aici am o destructurare a obiectului rezultat din useLocation()
  const {search} = useLocation();
  // console.log(search);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + '/posts' + search
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className='home'>
        {posts.length === 0 ? (
          <div className='homePosts'>
            <h2 className='homeNoPosts'>
              Nu sunt postari de tipul dorit de dvs.
            </h2>
          </div>
        ) : (
          <Posts posts={posts} />
        )}
        <Sidebar />
      </div>
    </>
  );
}
