import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Posting from './pages/Posting';
import Mypage from './pages/Mypage';
import Store from './pages/Store';
import ViewItems from './pages/ViewItems';
import Kakao from './pages/Redirect';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Info from './pages/Info';
import Root from './pages/Root';
import Welcome from './pages/Welcome';

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
        path: 'welcome',
        element: <Welcome />,
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
            element: <Home />,
          },
          {
            path: 'items/:items/:LargeCategory?/:midCategoryId?/:last?',
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
            path: 'register/modify?',
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export default router;
