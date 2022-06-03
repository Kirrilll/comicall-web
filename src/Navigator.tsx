import React from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from './hooks/redux';
import AuthentictionPage from './pages/authencticationPage';
import WorkplacePage from './pages/workplacePage';
import { AUTH_PATH, WORKPLACE_PATH } from './paths';

//Обработать момент, когда страница презагружается

function Navigator() {

  const navigate = useNavigate();
  const path = useAppSelector(state => state.routeReducer.path);
  

  useEffect(() => {
    navigate(path)
  }, [path])

  return (
    <Routes>
      <Route path={AUTH_PATH} element={<AuthentictionPage />} />
      <Route path= {WORKPLACE_PATH} element={<WorkplacePage />} />
    </Routes>
  );
}

export default Navigator;
