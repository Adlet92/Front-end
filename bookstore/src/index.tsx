import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import BookDetails from "./components/BookDetails/BookDetails";
import BookList from "./components/BookList/BookList";
// import { AppProvider } from './context.';
import './index.css';
import About from "./pages/About/About";
import Home from './pages/Home/Home';

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  // <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route path = "about" element = {<About />} />
          <Route path = "book" element = {<BookList />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  // </AppProvider>
);
