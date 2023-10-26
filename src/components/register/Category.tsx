import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { getCategory } from '../../apis/sidebar/category';

type LargeOptionType = {
  category_l_id: number;
  category_l_name: string;
};

type MidOptionType = {
  category_m_id: number;
  category_m_name: string;
};
type CategoryProps = {
  setCategory: (categoryId: number) => void;
  largeSelected: string;
  setlargeSelected: (selected: string) => void;
  midSelected: string;
  setMidSelected: (selected: string) => void;
  categoryID: number;
  setCategoryID: (id: number) => void;
};

function Category({ setCategory, largeSelected, setlargeSelected, midSelected, setMidSelected, categoryID, setCategoryID }: CategoryProps) {
  const { data, refetch } = useQuery('category', getCategory, { enabled: false });

  // 대분류 카테고리 상태관리
  const [largeIsOpen, setlargeIsOpen] = useState(false);

  // 중분류 카테고리 상태관리
  const [midIsOpen, setMidIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const LargeToggleDropdown = () => {
    refetch();
    setlargeIsOpen(!largeIsOpen);
    setShowMessage(false);
  };

  const LargeOptionClick = (option: string, categoryID: number) => {
    setlargeSelected(option);
    setCategoryID(categoryID);
    setlargeIsOpen(false);
  };

  const MidToggleDropdown = () => {
    if (largeSelected === '대분류') {
      setShowMessage(true);
    }
    setMidIsOpen(!midIsOpen);
  };
  const MidOptionClick = (option: string, categoryId: number) => {
    setMidSelected(option);
    setMidIsOpen(false);
    setCategory(categoryId);
  };

  // 참조 생성
  const largeDropdownRef = useRef(null);
  const midDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 대분류 드롭다운 외부 클릭 검사
      if (largeDropdownRef.current && !largeDropdownRef.current.contains(event.target)) {
        setlargeIsOpen(false);
      }

      // 중분류 드롭다운 외부 클릭 검사
      if (midDropdownRef.current && !midDropdownRef.current.contains(event.target)) {
        setMidIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <Container>
      <h3>카테고리</h3>
      <SelectBox>
        <Select ref={largeDropdownRef} onClick={LargeToggleDropdown}>
          {largeSelected}
          <span className="expand-icon material-symbols-outlined">expand_more</span>
          {largeIsOpen && (
            <Options>
              {data?.data.map((option: LargeOptionType) => (
                <li key={option.category_l_name} onClick={() => LargeOptionClick(option.category_l_name, option.category_l_id)}>
                  {option.category_l_name}
                </li>
              ))}
            </Options>
          )}
        </Select>
        <Select ref={midDropdownRef} onClick={MidToggleDropdown}>
          {midSelected}
          <span className="expand-icon material-symbols-outlined">expand_more</span>
          {showMessage && <Message>대분류를 먼저 선택해주세요</Message>}
          {largeSelected !== '대분류' && midIsOpen && (
            <Options>
              {data?.data[categoryID - 1]?.children.map((option: MidOptionType) => (
                <li key={option.category_m_id} onClick={() => MidOptionClick(option.category_m_name, option.category_m_id)}>
                  {option.category_m_name}
                </li>
              ))}
            </Options>
          )}
        </Select>
      </SelectBox>
    </Container>
  );
}
// type OptionType = {
//   category_m_id:number
//   category_m_name
// }
export default Category;

const Container = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.62rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const SelectBox = styled.div`
  display: flex;
  gap: 0.62rem;
  font-size: 0.875rem;
`;

const Select = styled.div`
  display: flex;
  padding: 0.625rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;

  span {
    font-size: 1.125rem;
  }
`;

const Options = styled.ul`
  position: absolute;
  top: 115%;
  left: 0%;
  right: 75%;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  list-style: none;

  width: 6.875rem;

  li {
    padding: 8px;

    cursor: pointer;
    &:hover {
      background-color: #efefef;
    }
  }
`;

const Message = styled.div`
  margin-left: 1rem;
  width: 10rem;
  color: red;
  font-size: 0.8rem;
  position: absolute;
  top: 33%;
  left: 100%;
`;
