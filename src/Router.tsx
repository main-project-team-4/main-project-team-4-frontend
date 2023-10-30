import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const App = lazy(() => import('./App'));
const Home = lazy(() => import('./pages/Home'));
const Posting = lazy(() => import('./pages/Posting'));
const Mypage = lazy(() => import('./pages/Mypage'));
const Store = lazy(() => import('./pages/Store'));
const ViewItems = lazy(() => import('./pages/ViewItems'));
const Kakao = lazy(() => import('./pages/Redirect'));
const Chat = lazy(() => import('./pages/Chat'));
const Register = lazy(() => import('./pages/Register'));
const Info = lazy(() => import('./pages/Info'));
const Root = lazy(() => import('./pages/Root'));
const Welcome = lazy(() => import('./pages/Welcome'));

const router = createBrowserRouter([
  {
    path: '/',

    element: (
      <Suspense fallback={<div>로딩 중...</div>}>
        <App />
      </Suspense>
    ),
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
