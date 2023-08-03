import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Photos from './components/Photos/Photos';
import Post from './components/Post/Post';
import './index.css';

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/posts" element={<Post/>} />
      <Route path="/photos" element={<Photos/>} />
    </Routes>
  </BrowserRouter>
);

