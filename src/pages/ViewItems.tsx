import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AllItems, CategoryItem, searchItems } from '../apis/getItems/Item';
import styled from 'styled-components';
import Card from '../components/common/Card';
import { useParams, useLocation } from 'react-router-dom';

export default function ViewItems() {
  const params = useParams();
  // console.log('이게 파람즈', params);
  const location = useLocation();
  const queryClient = useQueryClient();
  const itemsData = queryClient.getQueryData('items');
  // const categoryData = queryClient.getQueryData(`categoryitem-${params.category}`);
  // const searchItemsData = queryClient.getQueryData('search');

  // let dataToRender;

  // if (params.items == '최신 상품') {
  //   dataToRender = itemsData;
  // }
  // if (params.items == 'category') {
  //   dataToRender = categoryData;
  // }
  // if (params.items == 'search') {
  //   dataToRender = searchItemsData;
  // }

  // const { isLoading, isError, data: items } = useQuery('items', AllItems, { stale: true });
  const { data: CategoryItems } = useQuery(`categoryitem-${params.category}`, { stale: true });
  // const { data: searchItems } = useQuery(`search-${params.category}`);

  let dataToRender;

  if (params.items == '최신 상품') {
    dataToRender = itemsData;
  }
  if (params.items == 'category') {
    dataToRender = CategoryItems;
  }
  if (params.items == 'search') {
    dataToRender = location;
  }

  // if (isLoading) {
  //   return <h2>로딩중입니다</h2>;
  // }
  // if (isError || !items) {
  //   return <h2>오류가 발생하였습니다</h2>;
  // }
  return (
    <>
      <Layout>
        <Title>
          {params.LargeCategory}
          {params.midCategoryId && ` - ${params.midCategoryId}`}
        </Title>
        {dataToRender && (
          <CardWrapper>
            {dataToRender.map(item => (
              <Card key={item.item_id} img={item.image_url} title={item.item_name} price={item.price} />
            ))}
          </CardWrapper>
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 75rem;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 3.13rem;
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
  width: 74.875rem;
  flex-wrap: wrap;
`;

const Title = styled.p`
  font-size: 28px;
  font-weight: 600;
  line-height: 33px;
  align-self: flex-start;
`;
