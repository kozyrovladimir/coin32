import {gamesAPI} from "../services/api";
import {useEffect, useState} from "react";
import GameCard from "../components/GameCard";
import styled from "styled-components";
import PaginationButtons from "../components/paginationButtons";
import SearchOptions from "../components/SearchOptions";
import SearchBar from "../components/SearchBar";
import {useQueryParam, StringParam, withDefault, NumberParam} from 'next-query-params';
import {platformsData, sortData} from "../constants/filtrsData";
import MenuList from "../components/MenuList";
import { useRouter } from 'next/router';

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

// export async function getServerSideProps(context) {
//     const query = context.query;
//
//     return {
//         props: {
//             query: query
//         }
//     }
// }
// {query}

export default function Home() {

    const [games, setGames] = useState(null);

    const router = useRouter();
    // const {search, platform, sort, page} = router.query;

    // console.log(page);

    useEffect(() => {
        gamesAPI.getGames().then(
            response => {
                setGames(response.data);
            }
        )
    }, []);

    const [pageCount, setPageCount] = useQueryParam('page', withDefault(NumberParam, 1));

    // console.log(typeof pageCount);

    //search options
    // const [searchText, setSearchText] = useState('');
    const [searchText, setSearchText] = useQueryParam('search', withDefault(StringParam, ''));
    const onChangeSearchTextHandler = (event) => {
        setSearchText(event.currentTarget.value);
    };
    // const [platformState, setPlatformState] = useState('');
    const [platformState, setPlatformState] = useQueryParam('platform', withDefault(StringParam,   platformsData[0].value));
    // const [sortState, setSortState] = useState('-rating');
    const [sortState, setSortState] = useQueryParam('sort', withDefault(StringParam, sortData[1].value));

    // console.log(sortState);

    const onChangePlatformHandler = (event) => {
        setPlatformState(event.currentTarget.value);
        setGames(null);
        // setPageCount(1);
        const params = createParamsObj(searchText, sortState, event.currentTarget.value);
        gamesAPI.getGames({...params, page: 1}).then(
            response => {
                setGames(response.data);
            }
        )


    }
    const onChangeSortHandler = (event) => {
        setSortState(event.currentTarget.value);
        setGames(null);
        // setPageCount(1);
        const params = createParamsObj(searchText, event.currentTarget.value, platformState);
        gamesAPI.getGames({...params, page: 1}).then(
            response => {
                setGames(response.data);
            }
        )
    }

    const createParamsObj = (search, ordering, platform) => {
        const params = {};

        if (search) {
            params.search = search;
        }

        params.ordering = ordering;

        if (platform !== '') {
            params.platforms = platform;
        }

        return params;
    }

    const searchOnClickHandler = () => {
        // setPageCount(1);
        const params = createParamsObj(searchText, sortState, platformState);
        setGames(null);
        gamesAPI.getGames({...params, page: 1}).then(
            response => {
                setGames(response.data);
            }
        )
    }

    const nextPage = () => {
        setGames(null);
        setPageCount(prevState => prevState + 1);
        gamesAPI.getDataFromUrl(games.next).then(
            response => {
                setGames(response.data);
            }
        )
    }

    const prevPage = () => {
        setGames(null);
        setPageCount(prevState => prevState + 1);
        gamesAPI.getDataFromUrl(games.previous).then(
            response => {
                setGames(response.data);
            }
        )
    }

    return (<AppWrapper>
            <SearchOptionsWrapper>
                <MenuList
                    value={sortState}
                    items={sortData}
                    menuItemOnClickHandler={onChangeSortHandler}
                />

                <MenuList
                    value={platformState}
                    items={platformsData}
                    menuItemOnClickHandler={onChangePlatformHandler}
                />
                <SearchBar
                    onChangeHandler={onChangeSearchTextHandler}
                    value={searchText}
                    onClickHandler={searchOnClickHandler}
                />
            </SearchOptionsWrapper>
            <GridWrapper>
                { games ? games.results.map(({released, name, rating, background_image, id}, index) => {
                    return (<GameCard
                        key={id}
                        name={name}
                        released={released}
                        rating={rating}
                        image={background_image}
                        link={`/${id}`}
                    />)
                }) : <h2>Loading...</h2>}

            </GridWrapper>
        {games && <PaginationButtons
                disabledNext={!games.next}
                disabledPrev={!games.previous}
                nextHandler={nextPage}
                prevHandler={prevPage}
            />}
        </AppWrapper>
    )
}
