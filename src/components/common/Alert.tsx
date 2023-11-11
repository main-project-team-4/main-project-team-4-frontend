import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '../../styles/theme';

export const StyledToastContainer = styled(ToastContainer)`
  /* margin-top: 60px; */
  .Toastify__toast {
    background-color: white;
    color: black;
    font-size: 16px;
    font-weight: 500;
  }
  .Toastify__progress-bar {
    background: ${theme.pointColor}; // 진행 바의 색상을 파란색으로 설정
  }
`;
