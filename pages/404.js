import styled from "styled-components"

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const Error = () => {
    return (
        <NotFoundWrapper>
            <div>
                <h2>404</h2>
                <h3>Something is going wrong...</h3>
            </div>
        </NotFoundWrapper>
    );
};

export default Error;
