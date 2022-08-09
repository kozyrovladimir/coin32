import React, {useState} from 'react';
import styled from 'styled-components';
import {BiSearch} from "react-icons/bi";

const SearchWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 240px;
  padding: 12px;
  border-radius: 20px;
  background-color: ${props => props.focus ? '#626262' : '#3b3b3b'};
  color: #8f8f8f;
  transition: 300ms;

  &:hover {
    background-color: #626262;
    color: #3b3b3b;
  }
`

const SearchInput = styled.input`
  margin-left: 8px;
  background-color: inherit;
  border: none;
  width: 100%;
  color: white;

  &:focus {
    outline: none;
    background-color: #626262;
  }
`

const SearchButton = styled.button`
  height: 2.6rem;
  display: block;
  padding: 12px;
  border: none;
  background-color: #262626;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    background-color: #626262;
  }

  &:active {
    color: white;
  }
`

const SearchBar = ({value, onChangeHandler, onClickHandler}) => {
    const [focus, setFocus] = useState(false);
    const onFocusHandler = () => {
        setFocus(true);
    };
    const onBlurHandler = () => {
        setFocus(false);
    };

    const onKeyPressEnter = (event) => {
        if (event.charCode === 13) {
            onClickHandler();
        }
    }
    return (
        <SearchWrapper>
            {/*<SearchInput value={value} onChange={onChangeHandler} type={'text'}/>*/}
            <SearchInputWrapper focus={focus}>
                <BiSearch color={'white'} style={{height: '100%'}}/>
                <SearchInput onKeyPress={onKeyPressEnter} onFocus={onFocusHandler} onBlur={onBlurHandler} value={value} onChange={onChangeHandler} type="text"/>
            </SearchInputWrapper>
            <SearchButton onClick={onClickHandler}>
                Search
            </SearchButton>
        </SearchWrapper>
    );
};

export default SearchBar;
