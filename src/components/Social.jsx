import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import endpoints from '../constants/endpoints';

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  email: FaEnvelope,
};

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontSize: '2.5em',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  link: {
    textDecoration: 'none',
    display: 'inline-block',
  }
};

function Social() {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.social, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="social">
      {data ? data.social.map((social) => {
        const Icon = iconMap[social.network] || FaEnvelope;
        return (
          <a
            key={social.network}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            <Icon
              style={{
                ...styles.iconStyle,
                color: theme.socialIconBgColor || theme.color,
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </a>
        );
      }) : null}
    </div>
  );
}

export default Social;
