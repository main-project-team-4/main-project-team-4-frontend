import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SyncLoader } from 'react-spinners';

const App = lazy(() => import('./App'));
const Home = lazy(() => import('./pages/Home'));
const Posting = lazy(() => import('./pages/Posting'));
const Mypage = lazy(() => import('./pages/Mypage'));
const Store = lazy(() => import('./pages/Store'));
const ViewItems = lazy(() => import('./pages/ViewItems'));
const Kakao = lazy(() => import('./pages/Redirect'));
const Chat = lazy(() => import('./pages/Chat'));
const Register = lazy(() => import('./pages/Register'));
const Root = lazy(() => import('./pages/Root'));
const Welcome = lazy(() => import('./pages/Welcome'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

const router = createBrowserRouter([
  {
    path: '/',

    element: (
      <Suspense
        fallback={
          <div style={{ width: '100%', height: '67.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SyncLoader color="black" margin={10} size={28} />
          </div>
        }
      >
        <App />
      </Suspense>
    ),
    children: [
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
    errorElement: <NotFound />,
  },
]);

export default router;
