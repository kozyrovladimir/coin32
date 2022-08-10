import styled from "styled-components";

const LoaderOfPageWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader = styled.div`
  width: 150px;
  height: 150px;
  background-image: url("${props => props.imagePath}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const LoaderOfPage = () => {
    return (
        <LoaderOfPageWrapper>
            <Loader imagePath={'https://esmag.ru/design/themes/responsive/media/images/icons/preloader1.gif'}></Loader>
        </LoaderOfPageWrapper>
    );
};

export default LoaderOfPage;
