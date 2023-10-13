import styled from 'styled-components';

export default function Btn({ bgColor, color, icon, children }) {
  return (
    <Button bgColor={bgColor} color={color}>
      <span className="material-symbols-outlined">{icon}</span>
      {children}
    </Button>
  );
}

const Button = styled.button`
  all: unset;
  border-radius: 0.5rem;
  background: ${props => props.bgColor || '#717171'};
  color: ${props => props.color || 'white'};

  display: flex;
  box-sizing: border-box;
  width: '7.875rem';
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.125rem;
  margin-bottom: 2.25rem;

  span {
    font-size: 22px;
  }
`;
