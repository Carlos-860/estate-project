import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import Footer from './components/Footer';
import Error from './components/Error';
import UpdateListing from './pages/UpdateListing';

const App = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

const AppContent = () => {
    const location = useLocation();

    // Define routes where the header should be hidden
    const noHeaderRoutes = ['/sign-in', '/sign-up'];

    return (
        <>
            {!noHeaderRoutes.includes(location.pathname) && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-listing" element={<CreateListing />} />
                    <Route path="/update-listing/:id" element={<UpdateListing />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
            {!noHeaderRoutes.includes(location.pathname) && <Footer />}

        </>
    );
};

export default App;
