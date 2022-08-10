import styled from "styled-components";
import {useState} from 'react';

const MenuWrapper = styled.div`
  margin-right: 20px;
  margin-bottom: 20px;
`

const MenuItems = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  position: absolute;
  z-index: 2;
  flex-direction: column;
  display: ${props => props.hide ? 'none' : 'block'};
`

const MainButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background-color: #262626;
  color: white;
  cursor: pointer;
  transition: 200ms;
  
  &:hover {
    background-color: #626262;
  }
  
  &:active {
    color: white;
  }

  :disabled {
    background-color: #c9c9c9;
  }
`

const MenuButton = styled.button`
  background-color: inherit;
  display: block;
  width: 100%;
  border: none;
  padding: 8px;
  cursor: pointer;
  :hover {
    background-color: #c7c7c7;
  }
`

const AriaHidden = styled.div`
  display: ${props => props.hide ? 'none' : 'block'};
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const MenuList = ({value, items, menuItemOnClickHandler, helpText}) => {
    const [hide, setHide] = useState(true);
    const onClickHandler = () => {
        setHide(prevState => !prevState);
    }

    const buttonName = items.find( i => i.value === value).name;

    return (
        <MenuWrapper>
            <MainButton onClick={onClickHandler}>{helpText} {buttonName}</MainButton>
            <AriaHidden hide={hide} onClick={onClickHandler}/>
            <MenuItems hide={hide}>
                    {items.map(({name, value}, index) => {
                        return (<MenuButton onClick={(e) => {menuItemOnClickHandler(e); setHide(true)}} key={index} value={value}>
                            {name}
                        </MenuButton>)
                    })}
            </MenuItems>
        </MenuWrapper>
    );
};

export default MenuList;
