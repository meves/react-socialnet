import React, { FC, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// components
import { AppHeader } from 'components/Header';
import { AppNavbar } from 'components/Navbar';
import { AppFooter } from 'components/Footer';
import { Home } from 'pages/Home';
import { Login } from 'components/Login';
import { Loading } from 'components/common/Preloader';
import { NotFound } from 'components/NotFound';
// utils
import { initializeApp } from 'redux/reducers/app-reducer';
import { withSuspense } from 'hoc/withSuspense';
// styles
import { Container, Grid } from 'shared/ui';
import { receiveInitializeApp } from 'redux/selectors/app-selector';
// lazy components
const ProfilePage = lazy(() => import('pages/Profile'));
const DialogsPage = lazy(() => import('pages/Dialogs'));
const Chat = lazy(() => import('pages/Chat'));
const News = lazy(() => import('pages/News'));
const Gallery = lazy(() => import('pages/Gallery'));
const Music = lazy(() => import('pages/Music'));
const UsersPage = lazy(() => import('pages/Users'));
const Settings = lazy(() => import('pages/Settings'));


const App: FC = () => {
  const initialized = useSelector(receiveInitializeApp);
  const dispatch = useDispatch();
  
  useEffect(() => {    
    dispatch(initializeApp());    
  }, [dispatch]);  

  if (!initialized) {
    return <Loading/>
  }
    
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppHeader/>
        </Grid>
        <Grid item xs={4} sm={4} md={3} sx={{position: 'relative'}}>
          <AppNavbar/>              
        </Grid>
        <Grid item xs={12} sm={8} md={9}> 
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="profile" element={withSuspense(ProfilePage)} />
            <Route path="profile/:userId" element={withSuspense(ProfilePage)} />
            <Route path="dialogs" element={withSuspense(DialogsPage)} />
            <Route path="dialogs/:userId" element={withSuspense(ProfilePage)}/>
            <Route path="chat" element={withSuspense(Chat)}/>
            <Route path="news" element={withSuspense(News)} />
            <Route path="gallery" element={withSuspense(Gallery)}/>
            <Route path="music" element={withSuspense(Music)} />
            <Route path="users" element={withSuspense(UsersPage)} />
            <Route path="settings" element={withSuspense(Settings)} />
            <Route path="login" element={withSuspense(Login)} />
            <Route path="*" element={withSuspense(NotFound)}/>
          </Routes>
        </Grid>
        <Grid item xs={12}>
          <AppFooter/>
        </Grid>
      </Grid>
    </Container>
  );
  
}

export default App;
