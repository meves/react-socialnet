import React, { FC, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// components
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Preloader } from './components/common/Preloader/Preloader';
import { NotFound } from './components/NotFound/NotFound';
// utils
import { initializeApp } from './redux/app-reducer';
import { AppWrapper, AppContent } from './styles/components';
import { withSuspense } from './hoc/withSuspense';
import { AppStateType } from './redux/redux-store';
// lazy components
const ProfilePage = lazy(() => import('./components/Profile/Profile'));
const DialogsPage = lazy(() => import('./components/Dialogs/Dialogs'));
const News = lazy(() => import('./components/News/News'));
const Music = lazy(() => import('./components/Music/Music'));
const UsersPage = lazy(() => import('./components/Users/Users'));
const Settings = lazy(() => import('./components/Settings/Settings'));



type AppPropsType = {
  initializeApp: () => void
  initialized: boolean
}

const App: FC<AppPropsType> = (props) => {
  useEffect(() => {    
    props.initializeApp();
    // eslint-disable-next-line
  }, []);  
  if (!props.initialized) {
    return <Preloader/>
  }
  return (
    <AppWrapper>
      <Header/>
      <Navbar />
      <AppContent>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="profile" element={withSuspense(ProfilePage)} />
          <Route path="profile/:userId" element={withSuspense(ProfilePage)} />
          <Route path="dialogs" element={withSuspense(DialogsPage)} />
          <Route path="dialogs/:userId" element={withSuspense(ProfilePage)}/>
          <Route path="news" element={withSuspense(News)} />
          <Route path="music" element={withSuspense(Music)} />
          <Route path="users" element={withSuspense(UsersPage)} />
          <Route path="settings" element={withSuspense(Settings)} />
          <Route path="login" element={withSuspense(Login)} />
          <Route path="*" element={withSuspense(NotFound)}/>
        </Routes>
      </AppContent>
    </AppWrapper>    
  );
  
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = { initializeApp: () => void }

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { initializeApp })(App);
