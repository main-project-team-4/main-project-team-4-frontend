import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getCategory } from '../../apis/sidebar/category';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { theme } from '../../styles/theme';
import ChatSvg from '../../assets/svgs/ChatSvg';
import UploadSvg from '../../assets/svgs/UploadSvg';

function SideBar() {
  const [layer, setLayer] = useState(1);

  const navigate = useNavigate();
  const token = getCookie('token');

  // 카테고리 전체 가져오기
  const { data: category } = useQuery('category', getCategory, { staleTime: Infinity, cacheTime: Infinity });

  // 클릭시 대분류 페이지로 이동
  const [largeId, setLargeID] = useState(0);
  const [largeName, setLargeName] = useState('');
  const onClickLarge = (categoryName: string, LargeCategoryId: number) => {
    setLayer(1);
    setLargeID(LargeCategoryId);
    setLargeName(categoryName);
  };
  useEffect(() => {
    if (largeId && largeName) {
      navigate(`items/category/${largeName}`, { state: { layer, id: largeId } });
      setLargeName('');
    }
  }, [largeId, largeName]);

  // 클릭시 중분류 페이지로 이동
  const [midState, setMidState] = useState(false);
  const [midId, setMidId] = useState(0);
  const [midName, setMidName] = useState('');
  const [largeName2, setLargeName2] = useState('');
  const onClickMid = (LargeCategoryName: string, MidCategoryName: string, MidCategoryId: number) => {
    setLayer(2);
    setMidId(MidCategoryId);
    setMidName(MidCategoryName);
    setLargeName2(LargeCategoryName);
    setMidState(!midState);
  };
  useEffect(() => {
    if (midId && midName) {
      navigate(`items/category/${largeName2}/${midName}`, { state: { layer, id: midId } });
    }
  }, [midId, midName, midState]);

  return (
    <Container>
      <CategoryContainer>
        {category?.data.map((item: ItemType) => {
          return (
            <div key={item.category_l_id}>
              <h3 onClick={() => onClickLarge(item.category_l_name, item.category_l_id)}>{item.category_l_name}</h3>
              <ul>
                {item.children.map((item: ItemChildType) => (
                  <li key={item.category_m_id} onClick={() => onClickMid(item.category_l_name, item.category_m_name, item.category_m_id)}>
                    <span>{item.category_m_name}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </CategoryContainer>
      {token && (
        <BtnLayout>
          <>
            <Btn
              onClick={() => {
                navigate('/chat');
              }}
            >
              <ChatSvg />
              채팅
            </Btn>
            <Btn
              onClick={() => {
                navigate('/register', { state: '' });
              }}
            >
              <UploadSvg />
              상품등록
            </Btn>
          </>
        </BtnLayout>
      )}
    </Container>
  );
}

export default SideBar;

// 타입
type ItemType = {
  category_l_id: number;
  category_l_name: string;
  children: ItemChildType[];
};
type ItemChildType = {
  category_m_id: number;
  category_m_name: string;
  category_l_id: number;
  category_l_name: string;
};

// 스타일
const Container = styled.div`
  width: 78.125rem;
  height: 3.9375rem;

  display: flex;
  align-items: center;
`;

const CategoryContainer = styled.div`
  display: flex;

  margin-left: 24.8rem;
  margin-right: auto;
  div {
    max-height: 1.1875rem;
    z-index: 1;

    &:hover ul {
      max-height: 20rem;
      transition: max-height 0.5s ease-in-out;
      border: 1px solid ${theme.pointColor};
    }
  }
  h3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;

    padding-bottom: 1rem;

    &:hover {
      color: ${theme.pointColor};
    }
  }
  ul {
    width: 7.5rem;
    overflow: hidden;
    max-height: 0;

    background-color: white;
    border-radius: 0.375rem;
  }

  li {
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    cursor: pointer;

    &:hover {
      font-size: 1rem;
      color: ${theme.pointColor};
    }
    span {
      display: flex;
      justify-content: center;
      padding: 0.62rem 0rem;
    }
  }
`;

const BtnLayout = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-left: auto;
`;

const Btn = styled.button`
  all: unset;
  cursor: pointer;
  width: 6.1875rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.375rem;
  color: white;
  background-color: ${props => props.theme.pointColor};

  transition: transform 0.3s ease-in-out; /* 부드러운 변환을 위해 transition 추가 */

  &:hover {
    transform: scale(1.05); /* 호버 시에 크기를 1.2배로 증가 */
  }
`;
