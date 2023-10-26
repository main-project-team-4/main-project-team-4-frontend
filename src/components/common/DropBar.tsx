import styled from 'styled-components';
import { useState, useRef } from 'react';
import { theme } from '../../styles/theme';

const data = [
  { state_name: '판매중', item_state: 'SELLING' },
  { state_name: '예약중', item_state: 'RESERVED' },
  { state_name: '판매완료', item_state: 'SOLDOUT' },
];

interface DropBarProps {
  setSelected: (state: string) => void;
}

export default function DropBar({ setSelected }: DropBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('판매중');
  const dropdownRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item_state: string, state_name: string) => {
    setSelected(item_state);
    setSelectedView(state_name);
    setIsOpen(false);
  };

  return (
    <Container ref={dropdownRef}>
      <Options isopen={isOpen ? 1 : 0}>
        {isOpen ? (
          data.map((option, index) => (
            <Option key={option.state_name} onClick={() => handleOptionClick(option.item_state, option.state_name)}>
              {option.state_name}
              {index === 0 && <DropdownIcon onClick={handleDropdownToggle} />}
            </Option>
          ))
        ) : (
          <Option onClick={handleDropdownToggle}>
            {selectedView}
            <DropdownIcon />
          </Option>
        )}
      </Options>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 29.5rem;
  top: 0rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Options = styled.ul<{ isopen: number }>`
  width: 7.5rem;
  border: 1px solid ${theme.pointColor};
  border-radius: 10px;
  background-color: white;
  list-style: none;
  height: ${({ isopen }) => (isopen === 1 ? '8.1875rem' : '2.6875rem')};
  overflow: hidden;
`;

const Option = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.755rem 0.625rem;
  color: ${theme.pointColor};
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;

const DropdownIcon = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  width: '19',
  height: '18',
  viewBox: '0 0 19 18',
  fill: 'none',
  children: <path d="M14.75 6.75L9.5 12L4.25 6.75" stroke="#2667FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
})``;
