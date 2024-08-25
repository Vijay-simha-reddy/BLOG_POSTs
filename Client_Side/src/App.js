import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UpdateDetails from './components/UpdateDetails';
import MainContent from './components/MainContent';
import CreatePost from './components/CreatePost';
import Headers from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import BlogPostItem from './components/BlogPostitem';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className='view-page-container'>
      <Router>
      <Headers />
      <div className='middle-container'>
        <Sidebar setView={setView} />
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/posts" />} 
          />
          <Route 
            path="/posts" 
            element={
              view === 'home' ? <MainContent /> : <CreatePost />
            } 
          />
          <Route 
            path="/posts/:id" 
            element={<UpdateDetails />} 
          />
          <Route path="/posts/item/:id" element={<BlogPostItem/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
    </div>
    
  );
}

export default App;
