import styled from "styled-components";

const Button = styled.button`
  display: block;
  padding: 8px;
  border: none;
  background-color: #7d7d7d;
  color: white;
  border-radius: 8px;
  margin: 8px;

  :active {
    background-color: #545454;
  }

  :disabled {
    background-color: #c9c9c9;
  }
`

const PaginationButtonsWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const PaginationButtons = ({disabledNext, disabledPrev ,nextHandler, prevHandler}) => {
    return (
        <PaginationButtonsWrapper>
            <Button disabled={disabledPrev} onClick={prevHandler}>Previous page</Button>
            <Button disabled={disabledNext} onClick={nextHandler}>Next page</Button>
        </PaginationButtonsWrapper>
    );
};

export default PaginationButtons;
