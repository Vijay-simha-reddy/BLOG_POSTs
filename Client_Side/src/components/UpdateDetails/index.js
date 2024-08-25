import './index.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [likes, setLikes] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/posts/item/${id}`)
            .then(response => response.json())
            .then(post => {
                setTitle(post.title);
                setContent(post.content);
                setHashtags(post.hashtags.join(' '));
                setLikes(post.likes);
            })
            .catch(error => console.error('Error fetching post details:', error));
    }, [id]);

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (title.trim() === '') {
            formErrors.title = "Title is required.";
            isValid = false;
        }

        if (content.trim() === '') {
            formErrors.content = "Content is required.";
            isValid = false;
        }

        if (hashtags.trim() === "") {
            formErrors.hashtags = "Hashtags are required.";
            isValid = false;
        }

        if (likes === '' || isNaN(likes) || parseInt(likes) < 0) {
            formErrors.likes = "Likes must be a valid positive number.";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = {
                title,
                content,
                hashtags: hashtags.split(' '),
                likes: parseInt(likes)
            };

            const url = `http://localhost:5000/posts/${id}`;

            try {
                const response = await fetch(url, {
                    method: 'PUT',  
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    navigate('/posts');
                } else {
                    const data = await response.json();
                    console.error('Error from server:', data.error_msg);
                }
            } catch (error) {
                console.error('Error updating post:', error);
            }
        }
    };

    return (
        <div className='createPost-section'>
            <div className='createForm-container'>
                <h2>Update Blog Post</h2>
                <form className='form-container' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            placeholder="Enter post title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea 
                            id="content" 
                            rows="4" 
                            cols="80" 
                            placeholder="Write your post content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {errors.content && <span className="error-message">{errors.content}</span>}
                    </div>

                    <div className='form-group-image-like'>
                        <div className="form-group">
                            <label htmlFor="hashtags">Hashtags</label>
                            <input 
                                type="text" 
                                id="hashtags" 
                                placeholder="Type hashtags..." 
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                            />
                            {errors.hashtags && <span className="error-message">{errors.hashtags}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="likes">Likes</label>
                            <input 
                                type="number" 
                                id="likes" 
                                placeholder="Enter number of likes" 
                                value={likes} 
                                onChange={(e) => setLikes(e.target.value)} 
                            />
                            {errors.likes && <span className="error-message">{errors.likes}</span>}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDetails;
