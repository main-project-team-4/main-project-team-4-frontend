import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages/Main';
import Posting from './pages/Posting';
import Mypage from './pages/Mypage';
import Store from './pages/Store';
import ViewItems from './pages/ViewItems';
import Kakao from './pages/Redirect';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Info from './pages/Info';
import Root from './pages/Root';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'info',
        element: <Info />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'kakao',
        element: <Kakao />,
      },
      {
        path: '',
        element: <Root />,
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
            path: 'posting/:itemId',
            element: <Posting />,
          },
          {
            path: 'mypage',
            element: <Mypage />,
          },
          {
            path: 'store/:storeId',
            element: <Store />,
          },

          {
            path: 'chat',
            element: <Chat />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export default router;
