import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AllItems, CategoryItem, TopItems } from '../apis/getItems/Item';
import styled from 'styled-components';
import Card from '../components/common/Card';
import { useParams, useLocation } from 'react-router-dom';
import { theme } from '../styles/theme';

export default function ViewItems() {
  const params = useParams();
  const location = useLocation();
  const path = location.pathname;
  const categoryCheck = path.includes('/category');

  // 검색 키워드 관리
  const [keyword, setKeyword] = useState('');
  const key = location.search.split('=')[1];
  useEffect(() => {
    setKeyword(key);
  }, [key]);

  const { data: items } = useQuery('items', AllItems);
  const { data: topItems } = useQuery('topItems', TopItems);
  const { data: categoryData, refetch } = useQuery([`categoryitem`, location.state?.id, location.state?.layer], () => CategoryItem(location.state?.id, location.state?.layer), { enabled: false });

  useEffect(() => {
    if (categoryCheck) refetch();
  }, [categoryCheck]);

  let dataToRender;

  if (params.items == '최신 상품') {
    dataToRender = items;
  }
  if (params.items == '인기 상품') {
    dataToRender = topItems;
  }
  if (params.items == 'category') {
    dataToRender = categoryData?.content;
    console.log(categoryData);
  }
  if (params.items == 'search') {
    dataToRender = location.state;
  }

  return (
    <Layout>
      <Title>
        {params.items === 'search' ? (
          <h4>
            <span>{keyword}</span>의 검색결과 {dataToRender?.length}개
          </h4>
        ) : (
          <>
            {params.items == 'category' ? '' : params.items}

            {params.LargeCategory}
            {params.midCategoryId && ` - ${params.midCategoryId}`}
          </>
        )}
      </Title>
      {dataToRender?.length === 0 ? (
        <NotExits>
          <h3>{keyword}</h3>
          <p>에 대한 검색결과가 없습니다.</p>
        </NotExits>
      ) : (
        dataToRender && (
          <CardWrapper>
            {dataToRender.map((item: ItemType) => (
              <Card key={item.item_id} categoryTitle="" itemState={item.item_state} id={item.item_id} img={item.item_main_image} itemTitle={item.item_name} price={item.item_price} />
            ))}
          </CardWrapper>
        )
      )}
    </Layout>
  );
}
type ItemType = {
  item_id: number;
  item_name: string;
  item_main_image: string;
  item_price: string;
  item_state: 'SELLING' | 'RESERVED' | 'SOLDOUT';
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 78.125rem;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 3.13rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
  width: 78.125rem;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 600;
  line-height: 33px;
  align-self: flex-start;

  span {
    font-size: 2rem;
    color: ${theme.pointColor};
  }
`;

const NotExits = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 4rem;
    color: ${theme.pointColor};
  }
  p {
    font-size: 2rem;
  }
`;
