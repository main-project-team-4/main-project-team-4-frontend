import styled from 'styled-components';
import { DetailItem } from '../../apis/getItems/Item';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { putWishes, checkWishes, changeItemState } from '../../apis/posting/posting';
import { getCookie } from '../../utils/cookie';
import { theme } from '../../styles/theme';
import DropBar from '../common/DropBar';
import { useRecoilValue } from 'recoil';
import { myDataState } from '../../Atoms';

export default function DetailPosting() {
  const [mainImg, setMainImg] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const token = getCookie('token');
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string>('');

  // 상품 조회
  const { data: detailItems, isSuccess: detailSuccess } = useQuery(['detailitem', id], () => {
    return DetailItem(id);
  });
  useEffect(() => {
    if (detailSuccess) {
      setSelected(detailItems.item_state);
    }
  }, [detailItems]);

  //내 정보 조회
  const myData = useRecoilValue(myDataState);

  // 상품 상태 변경
  const mutationItem = useMutation(changeItemState, {
    onSuccess: () => {
      queryClient.invalidateQueries('detailitem');
    },
    onError: error => {
      console.log(error);
    },
  });

  const ChangeState = () => {
    if (selected !== '') {
      mutationItem.mutate({
        data: {
          item_state: selected,
          item_id: detailItems.item_id,
          member_id: myData.member_id,
        },
        token: token,
      });
    }
  };

  //여기확인 필!!!!
  useEffect(() => {
    if (detailSuccess && !!myData) {
      if (myData.member_id === detailItems.member_id) {
        ChangeState();
      }
    }
  }, [selected]);

  useEffect(() => {
    if (detailItems) {
      setMainImg(detailItems.item_image_list[0]);
    }
  }, [detailItems]);

  //찜하기
  const [wishState, setWishState] = useState(false);
  const mutation = useMutation(putWishes, {
    onSuccess: () => {
      queryClient.invalidateQueries(['putwishes', detailItems.item_id]);
      setWishState(!wishState);
    },
  });
  const onClickHeart = () => {
    if (token) {
      mutation.mutate({ token, itemId: detailItems.item_id });
      setWishState(wishState);
    }
  };

  // 찜여부 확인
  const { data: isWishing } = useQuery(['checkWishes', location.state.id], () => checkWishes({ token, itemId: location.state.id }), {
    enabled: !!token,
  });

  useEffect(() => {
    if (isWishing !== undefined && isWishing !== null) {
      setWishState(isWishing.is_wishing);
    }
  }, [isWishing]);

  // 상품 수정 페이지로 이동
  const goRegister = () => {
    navigate('/register/modify', { state: detailItems });
  };

  const RenderHeartButton = ({ wishState, onClick }: HeartBtnType) => (
    <button onClick={onClick} className="Follow-Button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z"
          stroke="#2667FF"
          fill={wishState ? '#2667FF' : 'none'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      찜하기
    </button>
  );

  return detailItems ? (
    <Container>
      <ImageComtainer>
        <img className="firstImg" src={mainImg} alt="게시물"></img>
        <ImageBox>{detailItems.item_image_list?.map((item: string, index: number) => <img key={index} src={item} alt="게시물" onClick={() => setMainImg(item)} />)}</ImageBox>
      </ImageComtainer>
      <PostingContainer>
        <PostingBox>
          <div className="layout">
            <h1>{detailItems.item_name}</h1>
            {myData?.member_id === detailItems?.member_id && <DropBar itemState={selected} setSelected={setSelected} />}
          </div>
          <h3>{`${detailItems?.category_l_name} > ${detailItems?.category_m_name}`}</h3>
          <div className="content">{detailItems.item_comment}</div>
        </PostingBox>
        <PriceBox>
          <h1>{Number(detailItems.item_price).toLocaleString()} 원</h1>
          {myData?.member_id === detailItems?.member_id ? (
            <ChangeItemBtn onClick={goRegister}>수정하기</ChangeItemBtn>
          ) : (
            <div>
              <RenderHeartButton wishState={wishState} onClick={onClickHeart} />
              <button className="Chat-Button">채팅하기</button>
            </div>
          )}
        </PriceBox>
      </PostingContainer>
    </Container>
  ) : null;
}

type HeartBtnType = {
  wishState: boolean;
  onClick: () => void;
};
const Container = styled.div`
  height: 40.1875rem;
  width: 78.125rem;
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  gap: 3.125rem;
`;

const ImageComtainer = styled.div`
  width: 37.5rem;
  height: 40.1875rem;
  gap: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .firstImg {
    width: 37.5rem;
    height: 31.25rem;
    border-radius: 0.75rem;
    background-color: white;
  }
`;
const ImageBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.75rem;
  width: 37.5rem;
  height: 3.75rem;
  cursor: pointer;

  img {
    width: 4.125rem;
    height: 3.75rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }
`;

const PostingContainer = styled.div`
  width: 37.5rem;
  height: 40.1875rem;
  gap: 1.5rem;
`;

const PostingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  gap: 1.5rem;
  width: 37.5rem;
  height: 22.9375rem;

  h1 {
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .content {
    height: 15.625rem;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.015rem;
  }

  .layout {
    display: flex;
    width: 37.5rem;
    justify-content: space-between;
    align-items: center;
  }
`;

const PriceBox = styled.div`
  height: 8.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  div {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  h1 {
    margin-left: auto;
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 0.75rem;
  }

  .Follow-Button {
    all: unset;
    background-color: transparent;
    display: flex;
    /* width: 7.8rem; */
    height: 3.375rem;
    padding: 1rem 1.3rem;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    border: 1.5px solid ${theme.pointColor};
    color: ${theme.pointColor};

    &:hover {
    }
  }

  .Chat-Button {
    all: unset;
    display: flex;
    width: 29.25rem;
    box-sizing: border-box;
    height: 3.375rem;
    padding: 1.25rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: ${theme.pointColor};
    color: white;
    cursor: pointer;
    border-radius: 0.5rem;
    text-align: center;
    font-weight: 600;
    line-height: 1.25rem;
    &:hover {
    }
  }
`;

const ChangeItemBtn = styled.button`
  all: unset;
  display: flex;
  height: 3.375rem;
  padding: 1.25rem 1.5rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  color: white;
  background-color: ${theme.pointColor};
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.04);
  cursor: pointer;
`;
