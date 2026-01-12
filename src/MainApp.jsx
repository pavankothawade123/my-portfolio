import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {data && data.sections.map((route) => {
              const SectionComponent = React.lazy(() =>
                /* @vite-ignore */
                import(`./components/${route.component}`)
              );
              return (
                <Route
                  key={route.headerTitle}
                  path={route.path}
                  element={<SectionComponent header={route.headerTitle} />}
                />
              );
            })}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
