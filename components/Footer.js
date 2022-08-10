import styled from 'styled-components'

const FooterWrapper = styled.div`
  padding: 10px;
  color: white;
  font-size: 1.4rem;
  text-align: center;
  border-top: 2px solid #626262;
`

const Footer = () => {
    return (
        <FooterWrapper>
            <span>2022</span>
        </FooterWrapper>
    );
};

export default Footer;
