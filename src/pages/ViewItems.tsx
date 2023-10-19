import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AllItems, CategoryItem, searchItems, TopItems } from '../apis/getItems/Item';
import styled from 'styled-components';
import Card from '../components/common/Card';
import { useParams, useLocation } from 'react-router-dom';

export default function ViewItems() {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('keyword');
    console.log('URL Keyword: ', key); // URL에서 얻은 keyword를 출력
    setKeyword(key);
  }, []);

  useEffect(() => {
    console.log('State Keyword: ', keyword); // 상태로 설정된 keyword를 출력
  }, [keyword]);

  const params = useParams();
  // console.log('이게 파람즈', params);
  const location = useLocation();
  const [layer, setLayer] = useState(2);

  useEffect(() => {
    if (!params.midCategoryId) {
      setLayer(1);
    } else {
      setLayer(2);
    }
  }, [params.midCategoryId]);

  const { data: items } = useQuery('items', AllItems, { stale: true });
  const { data: topItems } = useQuery('topItems', TopItems, { stale: true });
  const { data: categoryData } = useQuery(`categoryitem-${params.category}`, () => CategoryItem(params.category, layer));
  const { data: searchItems } = useQuery(['search', keyword], () => searchItems(keyword), {
    enabled: !!keyword,
  });

  console.log(searchItems);

  let dataToRender;

  if (params.items == '최신 상품') {
    dataToRender = items;
  }
  if (params.items == '인기 상품') {
    dataToRender = topItems;
  }
  if (params.items == 'category') {
    dataToRender = categoryData;
  }
  if (params.items == 'search') {
    dataToRender = searchItems;
  }

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
              <Card key={item.item_id} id={item.item_id} img={item.item_main_image} title={item.item_name} price={item.item_price} />
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
