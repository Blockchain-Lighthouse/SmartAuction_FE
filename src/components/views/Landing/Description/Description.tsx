import * as S from './Description.styled'

const Description = () => {
  return (
    <S.Section>
      <S.Title>
        We are a research and development team that creates innovative services that do not <br />
        require trust among many people through Web3 services.
      </S.Title>
      <S.BlockWrapper>
        <S.Block>
          <S.IconWrapper>
            <i className='ri-shield-keyhole-line' />
          </S.IconWrapper>
          <h1>Trustless by Blockchain Tech</h1>
          <p>
            We strive to create a world <br />
            without fraud, where trust is <br />
            not necessary.
          </p>
        </S.Block>
        <S.Block>
          <S.IconWrapper>
            <i className='ri-group-line' />
          </S.IconWrapper>
          <h1>User&apos;s perspective</h1>
          <p>
            We always think and research <br />
            from the user&apos;s perspective.
          </p>
        </S.Block>
        <S.Block>
          <S.IconWrapper>
            <i className='ri-service-line' />
          </S.IconWrapper>
          <h1>Simple is the Best</h1>
          <p>
            We believe that the easiest to <br />
            use is the best.
          </p>
        </S.Block>
      </S.BlockWrapper>
    </S.Section>
  )
}

export default Description
