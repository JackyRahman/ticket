import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken } from '@/lib/constant';
const AuthLayout = () => {
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const token = getToken();

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <>
      { isAutenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  )
}

export default AuthLayout