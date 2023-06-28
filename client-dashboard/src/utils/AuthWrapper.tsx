
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AuthWrapper(WrappedComponent: any) {
    const Wrapper = (props: any) => {
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);
        const [loggedIn, setLoggedIn] = useState(false);
        const [sessionExpired, setSessionExpired] = useState(false);
        const [accessDenied, setAccessDenied] = useState(false);

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const res = await fetch('http://localhost:5000/api/v1/auth/verify', {
                        method: 'POST',
                        credentials: 'include',
                    });
                    if (res.ok) {
                        setLoggedIn(true);
                        setLoading(false);
                    } else if (res.status === 403) {
                        navigate('/signin');
                    } else {
                        setLoading(false);
                        setSessionExpired(true);
                    }
                } catch (error) {
                    setAccessDenied(true);
                    setLoading(false);
                }
            };

            verifyToken();
        }, []);

        const extendAccessToken = async () => {
            try {
                const res = await fetch(
                    'http://localhost:5000/api/v1/auth/refresh_token',
                    {
                        method: 'POST',
                        credentials: 'include',
                    },
                );
                if (res.ok) {
                    setLoggedIn(true);
                    console.log("HATA");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    console.log('Error extending access token');
                }
            } catch (error) {
                console.log('Error extending access token', error);
            }
        };

        /*
            
             useEffect(() => {
                 const intervalId = setInterval(() => {
                     extendAccessToken();
                 }, 10 * 60 * 36000); // Call extendAccessToken function every 10 minutes
     
                 return () => clearInterval(intervalId);
             }, []);
            
            */

        const handleLogout = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
                    method: 'POST',
                    credentials: 'include',
                });
                if (res.ok) {
                    localStorage.clear();
                    console.log('Çıkış Başarılı');
                    navigate('/signin');
                }
            } catch (err) {
                navigate('/signin');
                console.log(err);
            }
        };

        if (loading) {
            return (
                <div className="text-center text-3xl mt-3 text-blue-500">
                    Yükleniyor...
                </div>
            );
        }

        if (accessDenied) {
            return (
                <div className="text-center text-xl">
                    Erişim Yetkiniz Yok !
                    <Link
                        className="block hover:underline hover:text-blue-500"
                        to="/signin"
                    >
                        Geri Dön
                    </Link>
                </div>
            );
        }

        if (sessionExpired) {
            return (
                <div className="mt-3">
                    <h1 className="text-center text-3xl">
                        Üzgünüz, Oturum Süreniz Doldu!
                    </h1>

                    <div className="flex mt-4 justify-center">
                        <button
                            className="mr-3"
                            onClick={handleLogout}
                        >
                            Çıkış Yap
                        </button>
                        <button onClick={extendAccessToken}>
                            Oturum Süresini Uzat
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <WrappedComponent loggedIn={loggedIn} {...props} />
            </div>
        );
    };

    return Wrapper;
}

export default AuthWrapper;