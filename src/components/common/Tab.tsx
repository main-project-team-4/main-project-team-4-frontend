import { useState } from 'react';
import styled from 'styled-components';

type TabType = {
  name: string;
  content: JSX.Element;
};

type PropsType = {
  tabs: TabType[];
};

export default function Tab({ tabs = [] }: PropsType) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <TabLayout>
      <TabMenusContainer>
        {tabs.map((tab, index) => (
          <TabMenu key={index} onClick={() => setCurrentTab(index)} active={currentTab === index ? 0 : 1}>
            {tab.name}
          </TabMenu>
        ))}
      </TabMenusContainer>
      {tabs[currentTab] ? (
        <Info>{tabs[currentTab].content}</Info>
      ) : (
        <Loading>Loading...</Loading> // 로딩 or 비어있는 상태 처리
      )}
    </TabLayout>
  );
}

const TabLayout = styled.div`
  width: 75rem;
  height: auto;
  display: flex;
  flex-direction: column;

  /* border: 1px solid black; */
`;

const TabMenusContainer = styled.div`
  display: flex;
  width: 29.25rem;
  margin-bottom: 1.87rem;
  gap: 3.12rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const TabMenu = styled.button<{ active: number }>`
  cursor: pointer;
  padding: 10px;
  border: none;
  background: none;
  outline: none;
  transition:
    background-color 0.3s,
    color 0.3s;
  font-size: 1rem;
  text-align: center;
  color: ${({ active }) => (active === 0 ? 'black' : '#969696')};
  flex-grow: 1;

  &:hover {
    background-color: #c0c0c0;
    color: white;
  }
`;

const Info = styled.div`
  flex-grow: 1;
  padding: 20px;
  /* border-top: 1px solid #e0e0e0; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: pre-line;
  text-align: center;
`;

const Loading = styled.div`
  flex-grow: 1;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  text-align: center;
  color: grey;
`;
