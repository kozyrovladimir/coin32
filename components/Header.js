import styled from 'styled-components'
import {useRouter} from "next/router";

const HeaderWrapper = styled.div`
  color: white;
  font-size: 3rem;
  border-bottom: 2px solid #626262;
  padding: 10px;
`

const LogoWrapper = styled.div`
  margin: 0 auto;
  max-width: 1060px;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <LogoWrapper>
                <span>COIN32</span>
            </LogoWrapper>
        </HeaderWrapper>
    );
};

export default Header;
