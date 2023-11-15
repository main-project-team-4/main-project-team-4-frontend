import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '../../styles/theme';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: white;
    color: black;
    font-size: 16px;
    font-weight: 500;

    display: flex;
  }
  .Toastify__toast-icon svg {
    fill: ${theme.pointColor};
  }
  .Toastify__progress-bar {
    background: ${theme.pointColor};
  }
`;
