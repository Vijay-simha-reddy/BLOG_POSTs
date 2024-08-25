import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://blog-posts-beta.vercel.app/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleMenuToggle = (index) => {
    setShowMenu(showMenu === index ? null : index);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this post? ${id}`)) {
      fetch(`https://blog-posts-beta.vercel.app/posts/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setPosts(posts.filter(post => post._id !== id));
        } else {
          console.error('Failed to delete post');
        }
      })
      .catch(error => console.error('Error deleting post:', error));
    }
  };

  const handleUpdate = (id) => {
    navigate(`/posts/${id}`);
  };

  const handleBlogItem = (id) => {
    navigate(`/posts/item/${id}`);
  };

  const minimizeInformation = (information) => {
    return information.length > 200 ? `${information.slice(0, 200)}...` : information;
  };

  return (
    <div className='main-content-section'>
      {loading ? (
        <div className='loader-container-posts'>
          <Audio height="80" width="80" radius="9" color="black" ariaLabel="loading" />
        </div>
      ) : (
        <ul className='blog-list'>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <li key={post._id} className='blog-item'>
                <div className='blog-header'>
                  <h2 className='blog-title'>{post.title}</h2>
                  <button className='ellipsis-btn' onClick={() => handleMenuToggle(index)}>
                    <span className='ellipsis-icon'>⋮</span>
                  </button>
                  {showMenu === index && (
                    <div className='dropdown-menu'>
                      <button onClick={() => handleUpdate(post._id)} className='dropdown-item'>Update</button>
                      <button onClick={() => handleDelete(post._id)} className='dropdown-item'>Delete</button>
                    </div>
                  )}
                </div>
      
                  <div className='blog-text-content'>
                    <p className='blog-content'>{minimizeInformation(post.content)}<span className='extra-info' onClick={() => handleBlogItem(post._id)}>...Read More</span></p>
                    <p className='blog-tags'>
                      {post.hashtags.map((tag, idx) => (
                        <span key={idx} className='tag'>{tag}</span>
                      ))}
                    </p>
                    <p className='blog-likes'>Number of likes: {post.likes}</p>
                  </div>
                
              </li>
            ))
          ) : (
            <p className='no-post-info'>No posts available. Create one!</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default MainContent;
