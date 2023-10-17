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

function Category() {
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
  const MidOptionClick = (option: string) => {
    setMidSelected(option);
    setMidIsOpen(false);
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
                <li key={option.large_category_id} onClick={() => LargeOptionClick(option.large_category_name, option.large_category_id)}>
                  {option.large_category_name}
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
                <li key={option.mid_category_id} onClick={() => MidOptionClick(option.mid_category_name)}>
                  {option.mid_category_name}
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
  width: 14.375rem;
  height: 4.4375rem;

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
`;
const Select = styled.div`
  width: 6.875rem;
  height: 2.4375rem;
  position: relative;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #ddd;
  border-radius: 10px;

  gap: 0.3125rem;
`;

const Options = styled.ul`
  position: absolute;
  top: 100%;
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
