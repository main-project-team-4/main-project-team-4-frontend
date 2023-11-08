import { useState, useEffect } from 'react';
import { theme } from '../../styles/theme';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
import { useMutation, useQueryClient } from 'react-query';
import { ReviewRegistration, ChangeReview } from '../../apis/shop/shop';
import { getCookie } from '../../utils/cookie';
type ModalProps = {
  modalClose: () => void;
  modalConfirm?: () => void;
  onRatingChange?: (rating: number) => void;
  itemId?: number;
  reviewId?: number;
};

export function ReviewInputModal({ itemId, modalConfirm, modalClose, onRatingChange, shopId, setModalState, reviewInfo, reviewId }: ModalProps) {
  const [rating, setRating] = useState(0);
  const [inputCount, setInputCount] = useState(0);
  const [review, setReview, reviewHandleChange] = useInput('');
  const [alert, setAlert] = useState(false);
  const token = getCookie('token');
  const queryClient = useQueryClient();

  const handleClick = newRating => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  useEffect(() => {
    if (reviewInfo) {
      console.log('reviewInfo', reviewInfo);

      setRating(reviewInfo.review_rating);
      setReview(reviewInfo.review_comment);
      setInputCount(reviewInfo.review_comment.length);
    }
  }, [reviewInfo]);

  // 리뷰 작성
  const textAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
    reviewHandleChange(e);
  };
  const reviewOnClick = () => {
    if (inputCount < 10) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, [3000]);
      return;
    } else {
      mutationReview.mutate({
        data: {
          item_id: itemId,
          review_comment: review,
          review_rating: rating,
        },
        token,
      });
      setModalState(false);
    }
  };

  const mutationReview = useMutation(ReviewRegistration, {
    onSuccess: () => {
      queryClient.invalidateQueries('reviewregister');
      queryClient.invalidateQueries('orders');
    },
    onError: error => {
      console.error(error);
    },
  });

  //리뷰 수정
  const mutaitionReviewChange = useMutation(ChangeReview, {
    onSuccess: () => {
      queryClient.invalidateQueries('reviewchange');
    },
    onError: error => {
      console.error(error);
    },
  });

  const onClickChangeReview = () => {
    mutaitionReviewChange.mutate({
      reviewId,
      data: {
        item_id: itemId,
        review_comment: review,
        review_rating: rating,
      },
      token,
    });
    setModalState(false);
  };

  return (
    <>
      <Overlay>
        <Container>
          <Title>리뷰작성</Title>
          <hr style={{ backgroundColor: '#E7E8EA', position: 'absolute', top: '4.56rem', left: '0rem', border: 'none', height: '1px', width: '100%' }} />
          <h3>별점</h3>
          <StartList>
            {[...Array(5)].map((_, index) => (
              <Star key={index} filled={rating >= index + 1} onMouseEnter={() => handleClick(index + 1)} />
            ))}
          </StartList>
          <AlertLayout>
            <h3>후기</h3> {alert && <p>최소 10자 이상 작성해주세요</p>}
          </AlertLayout>

          <TextArea placeholder="최소 10자 이상 자세한 후기를 남겨주세요" value={review} maxLength={200} onChange={textAreaHandler}></TextArea>
          <div style={{ marginLeft: 'auto', marginTop: '0.32rem' }}>
            <span style={{ fontSize: '14px' }}>{inputCount}</span>
            <span style={{ fontSize: '14px' }}> / 200자</span>
          </div>
          <hr style={{ backgroundColor: '#E7E8EA', position: 'absolute', top: '18.88rem', left: '0rem', border: 'none', height: '1px', width: '100%' }} />

          <BtnLayout>
            <Btn type="back" onClick={modalClose}>
              취소
            </Btn>
            <Btn type="check" onClick={reviewInfo ? onClickChangeReview : reviewOnClick}>
              확인
            </Btn>
          </BtnLayout>
        </Container>
      </Overlay>
    </>
  );
}

export function ReviewModal({ reviewInfo, modalConfirm, modalClose }: ModalProps) {
  return (
    <>
      <Overlay>
        <Container>
          <CloseBtn onClick={modalClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
              <path d="M7.5 22.5L22.5 7.5M7.5 7.5L22.5 22.5" />
            </svg>
          </CloseBtn>
          <Title>리뷰</Title>
          <hr style={{ backgroundColor: '#E7E8EA', position: 'absolute', top: '4.56rem', left: '0rem', border: 'none', height: '1px', width: '100%' }} />
          <Layout>
            <ProfileContainer>
              {reviewInfo?.member_image ? <img src={reviewInfo?.member_image} alt="picture" /> : <ProfileImg />}
              <div>{reviewInfo?.member_nickname}</div>
            </ProfileContainer>
            <ItemContainer>
              <h3>상품 이미지</h3>
              {/* <ImgList>
                {reviewInfo.item_image_list.map(img => {
                  <img key={img} src={img} alt="pic" />;
                })}
              </ImgList> */}
            </ItemContainer>
            <StarContainer>
              <h3>별점</h3>
              <StarList>
                {[...Array(reviewInfo?.review_rating)].map((_, index) => (
                  <Star key={index} filled={true} />
                ))}
              </StarList>
            </StarContainer>
            <ReviewContainer>
              <h3>거래 후기</h3>
              <div>{reviewInfo?.review_comment}</div>
            </ReviewContainer>
          </Layout>
        </Container>
      </Overlay>
    </>
  );
}

const Star = ({ filled, onMouseEnter }) => {
  return (
    <svg
      onMouseEnter={onMouseEnter}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? '#2667FF' : 'none'}
      stroke="#2667FF"
      strokeWidth="1.5"
      cursor="pointer"
    >
      <g clipPath="url(#clip0_1063_5028)">
        <path
          d="M11.049 2.92664C11.3483 2.00537 12.6517 2.00538 12.951 2.92664L14.4699 7.60055C14.6038 8.01254 14.9877 8.29148 15.4209 8.29149L20.3354 8.29168C21.3041 8.29172 21.7068 9.53127 20.9232 10.1007L16.9474 12.9895C16.5969 13.2441 16.4503 13.6955 16.5841 14.1075L18.1026 18.7815C18.4019 19.7028 17.3475 20.4689 16.5638 19.8995L12.5878 17.011C12.2373 16.7564 11.7627 16.7564 11.4122 17.011L7.43622 19.8995C6.65252 20.4689 5.5981 19.7028 5.8974 18.7815L7.41589 14.1075C7.54974 13.6955 7.40309 13.2441 7.05263 12.9895L3.07683 10.1007C2.29317 9.53127 2.69592 8.29172 3.66461 8.29168L8.57911 8.29149C9.01231 8.29148 9.39623 8.01254 9.53011 7.60055L11.049 2.92664Z"
          stroke="#2667FF"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_1063_5028">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const ProfileImg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <g clip-path="url(#clip0_1414_4833)">
        <circle cx="20" cy="20" r="20" fill="#90B0FD" />
        <path
          d="M26.6667 15.5556C26.6667 19.2375 23.6819 22.2222 20 22.2222C16.3181 22.2222 13.3333 19.2375 13.3333 15.5556C13.3333 11.8737 16.3181 8.88889 20 8.88889C23.6819 8.88889 26.6667 11.8737 26.6667 15.5556Z"
          fill="#0F172A"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.71342 32.8972C8.38214 37.2412 13.8689 40 20 40C26.1311 40 31.6179 37.2412 35.2866 32.8972C30.7719 30.3453 25.556 28.8889 20 28.8889C14.444 28.8889 9.22815 30.3453 4.71342 32.8972ZM26.6667 15.5556C26.6667 19.2375 23.6819 22.2222 20 22.2222C16.3181 22.2222 13.3333 19.2375 13.3333 15.5556C13.3333 11.8737 16.3181 8.88889 20 8.88889C23.6819 8.88889 26.6667 11.8737 26.6667 15.5556Z"
          fill="#0F172A"
        />
      </g>
      <defs>
        <clipPath id="clip0_1414_4833">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const CloseBtn = styled.button`
  position: absolute;
  top: 1.38rem;
  right: 1.38rem;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    stroke: #0f172a;
    strokewidth: 1.5;
    strokelinecap: round;
    strokelinejoin: round;
  }
`;
const Overlay = styled.div`
  z-index: 19;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(20, 22, 23, 0.4);
`;

const Container = styled.div`
  width: 33.75rem;
  position: relative;
  /* height: 25.5725rem; */
  box-sizing: border-box;
  background-color: white;
  border: 1px solid ${theme.outline};
  border-radius: 0.75rem;

  display: flex;
  flex-direction: column;

  position: relative;
  padding: 1.38rem 1.38rem 1.38rem 1.38rem;
  z-index: 20;

  h3 {
    display: flex;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Title = styled.p`
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2.81rem;
`;
const StartList = styled.div`
  display: flex;
  gap: 0.62rem;
  margin-top: 0.62rem;
  margin-bottom: 1.25rem;
`;

const TextArea = styled.textarea`
  display: flex;
  border: none;
  max-width: 31rem;
  min-width: 31rem;
  overflow: hidden;
  max-height: 5.2rem;
  min-height: 5.2rem;
  padding: 0.625rem 0.9375rem;
  box-sizing: border-box;
  border-radius: 0.75rem;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  background: ${theme.inputColor};
`;

const BtnLayout = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.81rem;
  justify-content: flex-end;
`;

const Btn = styled.button<{ type: string }>`
  width: 8rem;
  height: 2.5rem;
  padding: 0.625rem 2.5rem;
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background: ${props => (props.type === 'back' ? theme.cancelBtn : theme.pointColor)};
`;

const AlertLayout = styled.div`
  display: flex;
  align-items: center;
  P {
    font-size: 12px;
    color: red;
    margin-left: 1rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 0.62rem;
  align-items: center;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
  }
  div {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
`;

const ImgList = styled.div`
  display: flex;
  gap: 0.62rem;
  img {
    width: 5.625rem;
    height: 5.625rem;
    border-radius: 0.375rem;
    background: white;
    border: 1px solid #d9d9d9;
  }
`;
const StarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
`;

const StarList = styled.div`
  display: flex;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;

  div {
    display: flex;
    width: 31rem;
    max-height: 7.2462rem;
    min-height: 3.6488rem;
    padding: 0.625rem 0.9375rem;
    align-items: flex-start;
    gap: 0.5rem;
    border-radius: 0.75rem;
    background: var(--input-color, #f4f4f4);
  }
`;
