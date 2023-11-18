# Re:Use
빠르게 바뀌는 유행으로 버려지는 옷들이 많은 요즘,

리유즈는 버려지는 옷에게 다시 새로운 주인을 찾아줄 수 있지 않을까라는 고민에서 고안된 
옷 중심 중고거래 서비스입니다.

프로젝트 링크: www.re-use.store

[
![이미지600*340](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/837868ee-6f52-42bd-92a2-84d271f3548b)
](url)

# Demo
| 메인화면 및 로그인 | 상품 등록 |
| :---: | :---: |
|![1](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/fab31f21-b242-44ec-8886-c9456955478f)|![2](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/586e1359-071a-4871-9dec-f303dc063855) |
| **찜하기 & 상점 이동** | **실시간 채팅** |
|![3](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/2fdeddfc-71fe-418c-a9fd-6da7ad97d257)|![4](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/3dd722f2-f50b-4498-8d02-276cb2d88bd5)|
| **마이 페이지 & 리뷰 작성**| **상점 페이지**|
|![5](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/8d29cb84-07ea-40cd-afe4-58de4ee0c13a)|![6](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/50d98bd5-6d79-4aa8-bd9a-ec875c783de3)|


# System Architecture
![image](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/1a594e9d-4d40-4403-8293-eaab96075978)


# Tech Stack


| Frontend | Backend | DevOps | DB | Others |
| :---: | :---: | :---: | :---: | :---: |
|![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)<br>![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)<br> ![Vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)<br>![Styled-Components](https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=Styledcomponents&logoColor=white)<br>![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)<br>![recoil](https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)<br>|![Java](https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white)<br>![spring](https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)<br>![springsecurity](https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)<br>![apachetomcat](https://img.shields.io/badge/apachetomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=white)<br>![QueryDSL](https://img.shields.io/badge/QueryDSL-499848?style=for-the-badge&logo=QueryDSL&logoColor=white)<br>![Lombok](https://img.shields.io/badge/Lombok-F8DC75?style=for-the-badge&logo=Lombok&logoColor=white)<br>![junit5](https://img.shields.io/badge/junit5-F8DC75?style=for-the-badge&logo=junit5&logoColor=white)<br>![WebSocket](https://img.shields.io/badge/WebSocket-F8DC75?style=for-the-badge&logo=WebSocket&logoColor=white)<br>![Stomp](https://img.shields.io/badge/Stomp-F8DC75?style=for-the-badge&logo=Stomp&logoColor=white)<br>|![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)<br>![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white)<br>![AMAZON_EC2](https://img.shields.io/badge/AMAZON_EC2-FF9900?style=for-the-badge&logo=AMAZONEC2&logoColor=white)<br>![gradle](https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)<br>![githubactions](https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)<br>|![MySql](https://img.shields.io/badge/MySql-4479A1?style=for-the-badge&logo=MySql&logoColor=white)<br>![AMAZON_RDS](https://img.shields.io/badge/AMAZON_RDS-527FFF?style=for-the-badge&logo=AMAZONRDS&logoColor=white)<br> ![AMAZON_S3](https://img.shields.io/badge/AMAZON_S3-569A31?style=for-the-badge&logo=AMAZONS3&logoColor=white)<br>![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white)<br>|![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)<br>![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)<br>![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)<br>![POSTMAN](https://img.shields.io/badge/POSTMAN-FF6C37?style=for-the-badge&logo=POSTMAN&logoColor=white)<br>

# 기술적 의사결정

| 사용 기술 | 사용 이유 | 
| :---: | :---: | 
| React |  컴포넌트의 재사용성이 높음, 가상 DOM을 활용해  렌더링 횟수를 줄임 |
|React-Query | Boilerplate 코드를 줄일 수 있음, 캐싱된 데이터 사용|
|React-Router v6(BrowserRouter) | Outlet을 통해 중첩된 라우트 관리, 컴포넌트 재사용성 용이|
| Recoil | 간단한 로직에 맞춰진 경량의 상태 관리 , 복잡한 데이터 처리가 필요없는 부분에 적합 |
|TypeScript | 코드의 안정성을 높임, 코드 유지보수 개선|
|Browser Image Compression | 이미지 최적화를 위함 |
|SockJS / Stomp |  다양한 웹 환경에서의 높은 접근성과 빠르고 안정적인 메시지 교환을 가능하게 하기 위함|

# 구현 기능
<details>
  <summary><b>상세보기</b></summary>
  <div markdown="1">
   <p>소셜 로그인</p>
    <p>상품 검색</p>
    <p>인기 상품 조회</p>
    <p>카테고리별 상품 조회</p>
    <p>상품 찜하기</p>
    <p>상대방 팔로우 하기</p>
    <p>채팅 기능</p>
    <p>알림 기능</p>
    <p>상품 등록, 수정 기능</p>
    <p>프로필 사진 추가, 변경 기능</p>
    <p>사용자 위치 등록, 위치 기반 상품 추천 기능</p>
    <p>상품 리뷰 기능</p>
   </div>
</details>

# API
<details>
  <summary><b>상세보기</b></summary>
  <div markdown="1">
    <img src=https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/a9b9c913-4af1-4219-93b4-de623a0ec638/>
    <img src=https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/07b98fce-157e-46a3-b00e-7c0f5d841652/>
    <img src=https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/bf656010-ca31-4c8a-8226-0f618d8d0cae/>
   </div>
</details>

# Team Member


| Name | 박정훈 | 강찬영 | 김경윤 | 정재익 | 김용빈 | 이지은 | 정예원 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Profile | ![image](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/90740546-dd12-46c0-b997-f706aaa91c6c) | ![image](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/a2481260-483a-4d80-a81b-9fe72f8c4298) | ![image](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/ac00e265-012f-4b47-9d48-68c9e164ef88) | ![image](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/3d4eec0f-aaaa-426c-8b71-a018cd3aa051) | ![image](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/9d84cb40-9bc5-4be7-a71d-0f2fdd44695e) | ![image](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/71379413-a4ee-4e5b-928a-1db7ca30ec3b) | ![image](https://github.com/main-project-team-4/main-project-team-4-frontend/assets/133847649/18aac8ed-191d-4872-843d-be75c2f59dda) |
| Role | Team Leader<br/>Backend<br/>DevOps | Backend | Backend | Backend | Vice Leader<br/>Frontend | Frontend | Design |
| GitHub | [박정훈](https://github.com/iksadNorth) | [강찬영](https://github.com/CHANYOUNGKANG) | [김경윤](https://github.com/gukjan9) | [정재익](https://github.com/JeongJaeIk1207) | [김용빈](https://github.com/rladydqls99) | [이지은](https://github.com/egg-silver) | - |
