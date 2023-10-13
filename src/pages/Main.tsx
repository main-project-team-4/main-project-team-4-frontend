import { Outlet } from 'react-router-dom';
import CardLayout from '../components/layout/CardLayout';
import ReviewCard from '../components/store/ReviewCard';
import Tab from '../components/common/Tab';

export default function Main() {
  return (
    <>
      <CardLayout />
      {/* <Link to="/top20">
        <div>ViewItems</div>
      </Link> */}
      {/* <Tab
        tabs={[
          { name: '판매상품', content: <ReviewCard /> },
          { name: '상점리뷰', content: <CardLayout /> },
          { name: '팔로잉', content: <CardLayout /> },
          { name: '팔로워', content: <CardLayout /> },
        ]}
      /> */}
      <Outlet />
    </>
  );
}
