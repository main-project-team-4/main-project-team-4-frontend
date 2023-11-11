import styled, { keyframes } from 'styled-components';

export default function TabLayout({ icon, text }: TabType) {
  return (
    <Layout>
      <Icon key={text} className="material-symbols-outlined">
        {icon}
      </Icon>
      <div>{text}</div>
    </Layout>
  );
}

// 튕김 애니메이션 keyframes 정의
const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-15px);
  }
`;

// 타입
type TabType = {
  icon: string;
  text: string;
};

// Icon 컴포넌트 애니메이션 스타일
const Icon = styled.span`
  display: inline-block;
  font-size: 8rem;
  color: #b9b9b9;
  animation: ${bounceAnimation} 0.6s ease-in-out;
`;

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 38rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    font-size: 1.25rem;
    margin-top: 1rem;
    color: #969696;
  }
`;
