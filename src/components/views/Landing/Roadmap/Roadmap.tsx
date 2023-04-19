import * as S from './Roadmap.styled'

const Roadmap = () => {
  return (
    <S.Section>
      <S.RoadmapTitle>Our Roadmap</S.RoadmapTitle>
      <S.RoadmapBlockWrapper>
        <S.RoadmapBlock>
          <h1>Sprint 1.0 - 중고거래가 가능한 최소 핵심 기능 위주로 구현</h1>
          <ul>
            <li>회원 가입 및 로그인 기능</li>
            <li>HD Wallet 기능</li>
            <li>Sign Transaction 기능</li>
            <li>중고 경매 글 등록 기능</li>
            <li>입찰 기능 (Factory & Auction Contract)</li>
            <li>경매 글 시간 종료 스케쥴링 기능</li>
          </ul>
        </S.RoadmapBlock>
        <S.RoadmapBlock>
          <h1>Sprint 2.0 - 서비스 개선</h1>
          <ul>
            <li>거래자간 채팅기능 추가</li>
            <li>EOA -{'>'} Nickname으로 적용</li>
            <li>월렛 기능 개발</li>
            <li>경매 내용 IPFS 저장 기능 추가 적용</li>
            <li>경매 종료 시, 거래 내역 NFT 발급</li>
            <li>고객센터</li>
            <li>로깅 적용</li>
            <li>UI Renewal 개선</li>
          </ul>
        </S.RoadmapBlock>
        <S.RoadmapBlock>
          <h1>Sprint 3.0 - 서비스 확장성 개선</h1>
          <ul>
            <li>SideChain 적용하여 속도 개선 및 가스 비용 개선 진행</li>
            <li>Beta Test</li>
          </ul>
        </S.RoadmapBlock>
        <S.RoadmapBlock>
          <h1>Sprint 4.0 - 보완개발 진행</h1>
          <ul>
            <li>미정</li>
          </ul>
        </S.RoadmapBlock>
      </S.RoadmapBlockWrapper>
    </S.Section>
  )
}

export default Roadmap
