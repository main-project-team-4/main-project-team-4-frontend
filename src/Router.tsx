import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Posting from './pages/Posting';
import Mypage from './pages/Mypage';
import Store from './pages/Store';

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
