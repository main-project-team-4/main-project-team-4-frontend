import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
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
  width: 78.125rem;
  height: auto;
  display: flex;
  flex-direction: column;

  /* border: 1px solid black; */
`;

const TabMenusContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 33.625rem;
  height: 1.8125rem;
  margin-bottom: 1.25rem;
  gap: 3.12rem;
`;

const TabMenu = styled.button<{ active: number }>`
  cursor: pointer;
  width: 5.1875rem;
  height: 1.8125rem;
  border: none;
  background: none;
  outline: none;
  transition:
    background-color 0.3s,
    color 0.3s;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: ${({ active }) => (active === 0 ? 'black' : '#969696')};
  flex-grow: 1;

  &:hover {
    color: black;
  }
`;

const Info = styled.div`
  flex-grow: 1;
  /* border-top: 1px solid #e0e0e0; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
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
