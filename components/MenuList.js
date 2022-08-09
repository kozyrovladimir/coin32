import styled from "styled-components";
import {useState} from 'react';

const MenuWrapper = styled.div`
  width: 200px;
`

const MenuItems = styled.div`
  background-color: #7d7d7d;
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  display: ${props => props.hide ? 'none' : 'block'};
`

const MenuItemsGroup = styled.div`
    
`

const MainButton = styled.button`
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background-color: #7d7d7d;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #c7c7c7;
  }
`

const ButtonMenu = styled.button`
  display: block;
  width: 100%;
  background-color: inherit;
  border: none;
  padding: 8px;
  color: white;
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

const MenuList = ({value, items, menuItemOnClickHandler}) => {
    const [hide, setHide] = useState(true);
    const onClickHandler = () => {
        setHide(prevState => !prevState);
    }

    const buttonName = items.find( i => i.value === value).name;

    return (
        <MenuWrapper>
            <MainButton onClick={onClickHandler}>{buttonName}</MainButton>
            <AriaHidden hide={hide} onClick={onClickHandler}/>
            <MenuItems hide={hide}>
                <MenuItemsGroup>
                    {items.map(({name, value}, index) => {
                        return (<ButtonMenu onClick={(e) => {menuItemOnClickHandler(e); setHide(true)}} key={index} value={value}>
                            {name}
                        </ButtonMenu>)
                    })}
                </MenuItemsGroup>
            </MenuItems>
        </MenuWrapper>
    );
};

export default MenuList;
