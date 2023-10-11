import { useCallback, useState } from 'react';
import styled from 'styled-components';

export default function ReviewCard() {
  const [open, setOpen] = useState(false);

  const viewHandler = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <>
      <Layout>
        <Profile>
          <img src="" alt="profile" />
          <Info>
            <span>홍길동</span>
            <p>상품명</p>
          </Info>
        </Profile>
        <Review open={open}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id aliquid rem beatae, sunt quisquam eum repellendus ipsam accusantium quaerat quos tenetur sed aspernatur? Nisi voluptate quae sit,
          amet commodi quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa iure quidem itaque dolore facere facilis odit, harum voluptates vero. Maxime et expedita odio odit saepe
          distinctio quo quibusdam vel maiores.
        </Review>
        <ViewAll onClick={viewHandler}>
          {open ? '접기' : '전체보기'}
          <span class="material-symbols-outlined">{open ? 'expand_less' : 'expand_more'}</span>
        </ViewAll>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  width: 75rem;
  /* height: 14rem; */
  padding: 1.25rem;
  flex-direction: column;

  border: 1px solid black;
`;

const Profile = styled.div`
  display: flex;
  gap: 1.88rem;
  margin-bottom: 1.75rem;

  img {
    width: 6.875rem;
    height: 6.875rem;
    border-radius: 0.75rem;
    background: #ececec;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 1.22rem;
  span {
    font-size: 1.5rem;
    font-weight: 700;
  }
  p {
    overflow: hidden;
    color: #000;
    font-size: 1.125rem;
    font-weight: 500;
  }
`;

const Review = styled.div`
  font-weight: 400;
  height: ${props => (props.open ? 'auto' : '2.25rem')};
  overflow: hidden;
  margin-bottom: 0.625rem;
`;

const ViewAll = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  font-size: 0.9rem;
  line-height: 0.875rem;
  align-self: flex-end;
  text-align: right;
  cursor: pointer;
  color: #8f8f8f;
  span {
    color: #c2c2c2;
  }
`;
