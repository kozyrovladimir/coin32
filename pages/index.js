import {gamesAPI} from "../services/api";
import {useState} from "react";
import GameCard from "../components/GameCard";
import styled from "styled-components";
import PaginationButtons from "../components/paginationButtons";
import SearchBar from "../components/SearchBar";
import {useQueryParam, StringParam, withDefault, NumberParam} from 'next-query-params';
import {platformsData, sortData} from "../constants/filtrsData";
import MenuList from "../components/MenuList";
import {createParamsObj} from "../utils/createParams";
import LoaderOfPage from "../components/LoaderOfPage";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const AppWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
`

const SearchOptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export async function getServerSideProps(context) {
    const {search, ordering, platforms, page} = context.query;

    const response = await gamesAPI.getGames(createParamsObj(search, ordering, platforms, page));
    const games = response.data;

    if (!games.results) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            games: games,
        }
    }
}

export default function Home({games}) {

    const [localGames, setLocalGames] = useState(games);

    const [pageCount, setPageCount] = useQueryParam('page', withDefault(NumberParam, 1));
    const [searchText, setSearchText] = useQueryParam('search', withDefault(StringParam, ''));
    const [platformState, setPlatformState] = useQueryParam('platforms', withDefault(StringParam, platformsData[0].value));
    const [sortState, setSortState] = useQueryParam('ordering', withDefault(StringParam, sortData[0].value));

    const onChangeSearchTextHandler = (event) => {
        setSearchText(event.currentTarget.value);
    };

    const onChangePlatformHandler = (event) => {
        setPlatformState(event.currentTarget.value);
        setLocalGames(null);
        const params = createParamsObj(searchText, sortState, event.currentTarget.value);
        gamesAPI.getGames(params).then(
            response => {
                setLocalGames(response.data);
                setPageCount(1);
            }
        )


    }
    const onChangeSortHandler = (event) => {
        setSortState(event.currentTarget.value);
        setLocalGames(null);
        const params = createParamsObj(searchText, event.currentTarget.value, platformState);
        gamesAPI.getGames(params).then(
            response => {
                setLocalGames(response.data);
                setPageCount(1);
            }
        )
    }

    const searchOnClickHandler = () => {
        const params = createParamsObj(searchText, sortState, platformState);
        setLocalGames(null);
        gamesAPI.getGames({...params, page: 1}).then(
            response => {
                setLocalGames(response.data);
                setPageCount(1);
            }
        )
    }

    const nextPage = () => {
        setLocalGames(null);
        setPageCount(prevState => ++prevState);
        gamesAPI.getDataFromUrl(localGames.next).then(
            response => {
                setLocalGames(response.data);
            }
        )
    }

    const prevPage = () => {
        setLocalGames(null);
        setPageCount(prevState => --prevState);
        gamesAPI.getDataFromUrl(localGames.previous).then(
            response => {
                setLocalGames(response.data);
            }
        )
    }

    return (<AppWrapper>
            <SearchOptionsWrapper>
                <MenuList
                    value={sortState}
                    items={sortData}
                    menuItemOnClickHandler={onChangeSortHandler}
                    helpText={'Order by:'}
                />

                <MenuList
                    value={platformState}
                    items={platformsData}
                    menuItemOnClickHandler={onChangePlatformHandler}
                    helpText={'Platform:'}
                />
                <SearchBar
                    onChangeHandler={onChangeSearchTextHandler}
                    value={searchText}
                    onClickHandler={searchOnClickHandler}
                />
            </SearchOptionsWrapper>
            {localGames ? <GridWrapper>
                {localGames.results.map(({released, name, rating, background_image, id}, index) => {
                    return (<GameCard
                        key={id}
                        name={name}
                        released={released}
                        rating={rating}
                        image={background_image}
                        link={`/${id}`}
                    />)
                })} </GridWrapper> : <LoaderOfPage/>}

            {localGames && <PaginationButtons
                disabledNext={!localGames.next}
                disabledPrev={!localGames.previous}
                nextHandler={nextPage}
                prevHandler={prevPage}
            />}
            <span>Page: {pageCount}</span>
        </AppWrapper>
    )
}
