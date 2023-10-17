import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Posting from './pages/Posting';
import Mypage from './pages/Mypage';
import Store from './pages/Store';
import ViewItems from './pages/ViewItems';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: ':items/:LargeCategory?/:category?/:midCategoryId?/:last?',
        element: <ViewItems />,
      },
      {
        path: 'posting',
        element: <Posting />,
      },
      {
        path: 'mypage',
        element: <Mypage />,
      },
      {
        path: 'store',
        element: <Store />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
]);

export default router;
