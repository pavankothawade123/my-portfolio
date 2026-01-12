import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   body {
     background: ${({ theme }) => theme.background} !important;
     color: ${({ theme }) => theme.color} !important;
     transition: all 0.50s linear;
     margin: 0;
     padding: 0;
  }

  #root {
     background: ${({ theme }) => theme.background};
     color: ${({ theme }) => theme.color};
     min-height: 100vh;
  }
`;

export default GlobalStyles;
