import { useState } from 'react';
import "./App.css";
import Photos from './components/Photos/Photos';
import Post from './components/Post/Post';


function App() {
  const [currentContent, setCurrentContent] = useState('posts');

  const handleNavigation = (content: string) => {
    setCurrentContent(content);
  };

  return (
    <div className="App">
        <header className="App-header">
          <h1>My React App</h1>
        {/* <div className='navigation'> */}
          <ul className='nav nav-tabs'>
              <li className='nav-item'>
                <a className={`nav-link ${currentContent === 'posts' ? 'active' : ''}`} aria-current="page" href="#posts" onClick={() => handleNavigation('posts')}>
                Posts
                </a>
              </li>
              <li className='nav-item'>
                <a className={`nav-link ${currentContent === 'photos' ? 'active' : ''}`} href="#photos" onClick={() => handleNavigation('photos')}>
                Photos
                </a>
              </li>
              <li className='nav-item'>
                <a className={`nav-link ${currentContent === 'tasks' ? 'active' : ''}`} href="#tasks" onClick={() => handleNavigation('tasks')}>
                Tasks
                </a>
              </li>
          </ul>
      </header>
      <div className='content'>
         {currentContent === 'posts' && <div className='posts-tab'><Post /></div>}
         {currentContent === 'photos' && <div><Photos /></div>}
      </div>
      </div>
  );
}

export default App;
