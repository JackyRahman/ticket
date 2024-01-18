import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import SignInForm from './_auth/form/SignInForm';
import SignUpForm from './_auth/form/SignUpForm';
import NotFound from './_auth/form/NotFound';
import { Home } from './_root/pages';
import './globals.css';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import ForgotPasswordForm from './_auth/form/ForgotPasswordForm';
import { useEffect } from 'react';
import { getToken } from './lib/constant';

const App = () => {
  const navigate = useNavigate();

  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [navigate, token]);

  return (
    <main className='flex h-screen'>
      <Routes>
        {/**public routes */}
        <Route element={<AuthLayout />}>
          <Route path='sign-in' element={<SignInForm />}/>
          <Route path='sign-up' element={<SignUpForm />}/>
          <Route path='forgot' element={<ForgotPasswordForm />}/>
        </Route>

        {/**private routes */}
        <Route element={
          token ? <RootLayout /> : <Navigate to="/sign-in" replace />
        }>
          <Route index element={<Home />} />
        </Route>
          <Route path='*' element={<NotFound />}/>
      </Routes>
    </main>
  )
}

export default App