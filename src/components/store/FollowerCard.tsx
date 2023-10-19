import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function FollowerCard({ img, name, shop, checkMine, follow }) {
  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
  };

  const handleFollowButtonClick = (e) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();
  return (
    <FollowerBox onClick={() => navigate(`/store/${name}`, { state: shop })}>
      <ProfileBox src={img || 'https://ifh.cc/g/APoRmB.jpg'}></ProfileBox>

      <NameBox>
        <h3>{name}</h3>
        <p>상품 : 3개</p>
        {checkMine && (follow === 'followers' ? <button onClick={handleDeleteButtonClick}>삭제</button> : <button onClick={handleFollowButtonClick}>팔로잉</button>)}
      </NameBox>
    </FollowerBox>
  );
}

export default FollowerCard;

const FollowerBox = styled.div`
  width: 15.625rem;
  margin: 2.25rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const ProfileBox = styled.div`
  width: 9.375rem;
  height: 9.375rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ececec;
  border-radius: 100%;
  margin-bottom: 1.5rem;
  background-image: url(${props => props.src || 'https://ifh.cc/g/APoRmB.jpg'});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; // or 'contain' depending on your requirement

  span {
    font-size: 3rem;
    color: #a7a7a7;
  }
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2.25rem; /* 150% */
    letter-spacing: -0.015rem;
    margin-bottom: 0.5rem;

    color: #7a7a7a;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem; /* 150% */
    letter-spacing: -0.015rem;

    color: #7a7a7a;
  }

  button {
    all: unset;
    width: 9.375rem;
    padding: 0.75rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    background: #717171;
    color: white;
    margin-top: 1rem;
    margin-bottom: 2.25rem;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #404040;
    }
  }
`;
