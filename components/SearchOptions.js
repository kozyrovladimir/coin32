import React from 'react';
import styled from "styled-components";

const Select = styled.select`
  padding: 10px;
  border: none;
  background-color: #7d7d7d;
  color: white;
  margin-right: 20px;
  border-radius: 8px;

  &:focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
  }
`

const Option = styled.option`

`

const SearchOptions = ({onChangeHandler, value, name, items}) => {
    return (
        <div>
            <Select onChange={onChangeHandler}  value={value} name={name} id={name}>
                {items.map(({name, value}, index) => {
                    return (<Option onClick={(e) => { console.log(e.currentTarget.value)}} key={index} value={value}>
                        {name}
                    </Option>)
                })}
            </Select>
        </div>
    );
};

export default SearchOptions;
