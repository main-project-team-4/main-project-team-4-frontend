import styled from 'styled-components';
import CardLayout from '../components/layout/CardLayout';
import DetailPosting from '../components/layout/DetailPosting';
import { ShopItem } from '../apis/getItems/Item';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { DetailItem } from '../apis/getItems/Item';

export default function Posting() {
  const location = useLocation();
  const { id } = location.state || {};

  const { data: detailItems } = useQuery(['detailitem', id], () => DetailItem(id));
  const shopId = detailItems?.shop_id;

  const { data: shopItem, refetch } = useQuery(['shopItem', detailItems?.shop_id], () => ShopItem({ shopId: detailItems?.shop_id, size: 4 }), {
    enabled: false,
  });

  useEffect(() => {
    if (detailItems) {
      refetch();
    }
  }, [detailItems, refetch]);

  return (
    <Container>
      <DetailPosting />
      {shopItem && <CardLayout storeState={true} title={`${shopItem[0]?.shop_name} 상점의 다른 상품`} data={shopItem} shop_Id={shopId} />}
    </Container>
  );
}

const Container = styled.div`
  width: 75rem;
  height: 74.5625rem;
  gap: 6.25rem;
  display: flex;
  flex-direction: column;

  margin: 7.75rem 10rem 0rem 0rem;
`;
