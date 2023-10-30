import styled from 'styled-components';

type PropsType = {
  closeModal: () => void;
};
export default function LoginModal({ closeModal }: PropsType) {
  return (
    <>
      <ModalBackDrop>
        <Layout>
          <Close onClick={closeModal}>
            <span className="material-symbols-outlined">close</span>
          </Close>

          <TextArea>
            <p>안 입는 옷?! 그냥 버린다고?!</p>
            <p>이제 그냥 버리지 말고 ㅇㅇ하자!</p>
            <br />
            <span>Re:Use</span>
            <br />
            <p>옷 전용 중고거래 서비스</p>
          </TextArea>

          <Btn
            onClick={() => {
              //test 서버
              //window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=851d6c649ed19d32afa2743c91134e57&redirect_uri=http://localhost:5173/kakao';
              //배포서버
              window.location.href =
                'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=851d6c649ed19d32afa2743c91134e57&redirect_uri= https://main-project-team-4-frontend.vercel.app/kakao';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.00043 2.16699C4.80722 2.16699 1.4082 4.7989 1.4082 8.04735C1.4082 10.161 2.84752 12.0135 5.00935 13.0499C4.85022 13.63 4.43449 15.1538 4.35134 15.4796C4.24812 15.8841 4.50187 15.8785 4.66959 15.7703C4.80005 15.6846 6.74972 14.3855 7.59123 13.8252C8.04854 13.8912 8.51875 13.9263 9.00043 13.9263C13.1937 13.9263 16.5927 11.2944 16.5927 8.04735C16.5927 4.8003 13.1937 2.16699 9.00043 2.16699Z"
                fill="#141617"
              ></path>
            </svg>
            카카오로 3초만에 시작하기
          </Btn>
        </Layout>
      </ModalBackDrop>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;
  height: 580px;
  padding: 0px 20px 40px;
  background: rgb(255, 255, 255);
  border-radius: 12px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Close = styled.div`
  span {
    /* align-self: right; */ /* 이 부분 삭제 */
    text-align: right;
    margin-top: 1rem;
    margin-left: 28rem; /* 오른쪽 여백 추가 */
    cursor: pointer;
    color: #a0a0a0;
  }
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding-top: 108px;
  box-sizing: border-box;
  line-height: 160%;
  white-space: pre-line;

  span {
    font-weight: 600;
    font-size: 1.5rem;
    color: rgb(20, 22, 23);
  }
`;

const Btn = styled.button`
  border: none;
  cursor: pointer;
  width: 70%;
  height: 56px;
  background: rgb(254, 229, 0);
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  color: rgb(20, 22, 23);
  border-radius: 60px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  gap: 8px;
  margin-top: 5rem;
`;

const ModalBackDrop = styled.div`
  z-index: 22;
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
