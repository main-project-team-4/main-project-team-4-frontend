import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Posting from './pages/Posting';

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/posting',
        element: <Posting />,
      },
    ],
  },
]);

export default router;
