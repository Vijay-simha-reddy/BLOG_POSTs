import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEdit } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Sidebar = ({ setView, view }) => {
  const [classState, setClassStatus] = useState('home');
  const navigate = useNavigate()

  const handleClick = (newView) => {
    setView(newView);
    setClassStatus(newView);
    if(newView==="home"){
      navigate('/posts')
    }
    else{
      setView("create");
      setClassStatus("create");
      navigate('/posts')
    }
  };

  return (
    <div className='side-mainContent-section'>
      <div className='sidebar-section'>
        <ul className='sidebar-items'>
          <li 
            className={`sidebar-item ${classState === 'home' ? 'active' : ''}`} 
            onClick={() => handleClick('home')}
          >
            <FontAwesomeIcon icon={faHome} className='fa-icon'/>
            <span className='icon-name'>Home</span>
          </li>
          <li 
            className={`sidebar-item ${classState === 'create' ? 'active' : ''}`} 
            onClick={() => handleClick('create')}
          >
            <FontAwesomeIcon icon={faEdit} className='fa-icon'/>
            <span className='icon-name'>Create Post</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
