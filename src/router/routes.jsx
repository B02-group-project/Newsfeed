import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import CreatePage from '../pages/CreatePage/CreatePage';
import EditPage from '../pages/EditPage/EditPage';

const router = createBrowserRouter([

  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  
  {
     path: "/mypage/:userId",
    element: <MyPage />,
  },
  {
    path: "/create",
    element: <CreatePage />
  },
  {
    path: "/edit",
    element: <EditPage />
  },

]);

export default router;
