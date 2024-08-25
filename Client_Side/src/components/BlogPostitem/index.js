import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHashtag } from '@fortawesome/free-solid-svg-icons';
import world from '../../images/temp.png';
import './index.css';

const BlogPostItem = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`https://blog-posts-beta.vercel.app/posts/item/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch the post data');
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPostById();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <Audio height="80" width="80" radius="9" color="black" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="blog-post-item">
        <img src={world} alt={post.title} className="blog-image" />
      <div className="blog-content-container">
        <h2 className="blog-title">{post.title}</h2>
        <div className="blog-meta">
          <div className="blog-hashtags">
            {post.hashtags.map((tag, index) => (
              <span key={index} className="hashtag">
                <FontAwesomeIcon icon={faHashtag} /> {tag}
              </span>
            ))}
          </div>
          <div className="blog-likes">
            <FontAwesomeIcon icon={faHeart} /> {post.likes}
          </div>
        </div>
        <p className="blog-content">{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPostItem;
