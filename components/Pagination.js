import styled from "styled-components";
import {BiChevronRight, BiChevronLeft, BiChevronsRight, BiChevronsLeft} from "react-icons/bi";

const PaginationButtonsWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  display: block;
  margin: 18px;
  padding: 14px 14px 12px;
  border: none;
  border-radius: 8px;
  background-color: #262626;
  color: white;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    background-color: #626262;
  }
  
  &:active {
    background-color: #545454;
  }
  
  &:disabled {
    background-color: #c9c9c9;
  }
`

const PageCount = styled.span`
  color: white;
  font-size: 1.2rem;
`

const Pagination = ({disabledNext, disabledPrev ,nextHandler, prevHandler, firstHandler, lastHandler, pageCount}) => {
    return (
        <PaginationButtonsWrapper>
            <Button disabled={disabledPrev} onClick={firstHandler}><BiChevronsLeft style={{width: '1.5rem', height: '100%'}}/></Button>
            <Button disabled={disabledPrev} onClick={prevHandler}><BiChevronLeft style={{width: '1.5rem', height: '100%'}}/></Button>
            <PageCount>{pageCount}</PageCount>
            <Button disabled={disabledNext} onClick={nextHandler}><BiChevronRight style={{width: '1.5rem', height: '100%'}}/></Button>
            <Button disabled={disabledNext} onClick={lastHandler}><BiChevronsRight style={{width: '1.5rem', height: '100%'}}/></Button>
        </PaginationButtonsWrapper>
    );
};

export default Pagination;
