import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppContext from '../AppContext';

const ToggleSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  background: ${props => props.$isDark ? '#4a5568' : '#cbd5e0'};
  border-radius: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 8px;

  &:hover {
    background: ${props => props.$isDark ? '#5a6578' : '#a0aec0'};
  }
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 3px;
  left: ${props => props.$isDark ? '33px' : '3px'};
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

function ThemeToggler(props) {
  const { onClick } = props;

  const handleToggle = (darkMode) => {
    darkMode.toggle();
    onClick();
  };

  return (
    <AppContext.Consumer>
      {(values) => (
        <ToggleSwitch
          $isDark={values.darkMode.value}
          onClick={() => handleToggle(values.darkMode)}
          role="button"
          aria-label={values.darkMode.value ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <ToggleSlider $isDark={values.darkMode.value}>
            {values.darkMode.value ? '🌙' : '☀️'}
          </ToggleSlider>
        </ToggleSwitch>
      )}
    </AppContext.Consumer>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};
ThemeToggler.defaultProps = {
  onClick: () => {},
};

export default ThemeToggler;
