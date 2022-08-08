import React from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
    flex-shrink: 0;
`;

const SearchInput = styled.input`
  margin-right: 20px;
  margin-bottom: 20px;
  width: 240px;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #b4b4b4;
  color: white;

  &:focus {
    outline: none;
  }
`

const SearchButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #7d7d7d;
  color: white;
  border-radius: 8px;

  &:active {
    background-color: #d5d5d5;
  }

  &:hover {
    cursor: pointer;
  }
`

const SearchBar = ({value, onChangeHandler, onClickHandler}) => {
    return (
        <SearchWrapper>
            <SearchInput value={value} onChange={onChangeHandler} type={'text'}/>
            <SearchButton onClick={onClickHandler}>
                Search
            </SearchButton>
        </SearchWrapper>
    );
};

export default SearchBar;
