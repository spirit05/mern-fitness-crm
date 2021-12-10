import { useSelector } from 'react-redux';

import useRoutes from './routes/useRoutes';

import Navbar from './components/Navbar';
import CustomAlert from './components/Alert';
import { selectLogin } from './store/user';

const App = () => {
  let isLogin = useSelector(selectLogin);
  const routes = useRoutes();

  return (
    <>
      <CustomAlert />
      { isLogin && <Navbar /> }
      { routes }
    </>
  )
};

export default App;
