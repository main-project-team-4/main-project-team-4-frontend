import styled from 'styled-components';
import Btn from './MyPageBtns/Btn';

export default function MypageCard() {
  return (
    <>
      <Layout>
        <Image src="https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg" />
        <TextLayout>
          {/* <Tag>판매완료</Tag> */}
          <h1>Lorem ipsum dolorsit ddㅇㅇㅇㅇ</h1>
          <Price>24,000원</Price>
        </TextLayout>
        <BtnLayout>
          {/* <ReviewBtn>
            <span className="material-symbols-outlined">edit</span>리뷰작성
          </ReviewBtn> */}

          {/* <UpdateBtn>
            <span className="material-symbols-outlined">edit</span>리뷰수정
          </UpdateBtn> */}

          <Btn bgColor="#ACACAC" color="white" icon="delete">
            리뷰삭제
          </Btn>

          <Btn bgColor="#717171" color="white" icon="edit">
            리뷰수정
          </Btn>
        </BtnLayout>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 18.25rem;
  /* height: 22.375rem; */
  border-radius: 0.75rem;

  border: 1px solid green;
`;

const Image = styled.img`
  width: 18.25rem;
  height: 13rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;

  border: 1px solid black;
`;

const TextLayout = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 17.5rem;
  flex-direction: column;
  padding: 0rem 1rem;
  margin-bottom: 2.25rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    height: 2.25rem;
    width: 16rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const Tag = styled.div`
  width: 5.375rem;
  box-sizing: border-box;
  padding: 0.375rem 1rem;
  border-radius: 6.25rem;
  background: #ececec;
  text-align: center;
  color: #838383;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 1rem;
  text-align: right;
`;

const BtnLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const ReviewBtn = styled.button`
  all: unset;
  border-radius: 0.5rem;
  background: #717171;
  color: white;

  display: flex;
  box-sizing: border-box;
  width: 16.25rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.125rem;
  margin-bottom: 2.25rem;
`;

// const UpdateBtn = styled.button`
//   all: unset;
//   border-radius: 0.5rem;
//   background: #717171;
//   color: white;

//   display: flex;
//   box-sizing: border-box;
//   width: 7.875rem;
//   padding: 1rem;
//   justify-content: center;
//   align-items: center;
//   gap: 0.5rem;
//   text-align: center;
//   font-size: 1.125rem;
//   font-weight: 700;
//   line-height: 1.125rem;
//   margin-bottom: 2.25rem;

//   span {
//     font-size: 22px;
//   }
// `;
