import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import useAuth from '../hooks/useAuth';

const Layout = () => {
  const { auth, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {!loading && auth?.token && <Header />}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;