import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Home = () => {
  return (
    <main>
        <Header />
        <Outlet />
    </main>
  )
}

export default Home
