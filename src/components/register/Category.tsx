import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getCategory } from '../../apis/sidebar/category';

type LargeOptionType = {
  large_category_id: number;
  large_category_name: string;
};

type MidOptionType = {
  mid_category_id: number;
  mid_category_name: string;
};

function Category({ setCategory }) {
  const { data, refetch } = useQuery('category', getCategory, { enabled: false });

  // 대분류 카테고리 상태관리
  const [largeIsOpen, setlargeIsOpen] = useState(false);
  const [largeSelected, setlargeSelected] = useState('대분류');

  // 대분류 선택 카테고리 상태관리
  const [categoryID, setCategoryID] = useState(0);

  // 중분류 카테고리 상태관리
  const [midIsOpen, setMidIsOpen] = useState(false);
  const [midSelected, setMidSelected] = useState('중분류');
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
  return (
    <Container>
      <h3>카테고리</h3>
      <SelectBox>
        <Select onClick={LargeToggleDropdown}>
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
        <Select onClick={MidToggleDropdown}>
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
