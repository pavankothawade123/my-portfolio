import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <div style={styles.mainContainer}>
      <h1 style={styles.nameStyle}>{data?.name}</h1>
      <div style={{ flexDirection: 'row' }}>
        <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
        <TypeAnimation
          sequence={data?.roles?.flatMap(role => [role, 2000]) || []}
          wrapper="h2"
          speed={50}
          style={styles.inlineChild}
          repeat={Infinity}
        />
      </div>
      <Social />
    </div>
  ) : <FallbackSpinner />;
}

export default Home;
