import {gamesAPI} from "../services/api";
import {useEffect, useState} from "react";
import GameCard from "../components/GameCard";
import styled from "styled-components";
import PaginationButtons from "../components/paginationButtons";
import SearchOptions from "../components/SearchOptions";
import SearchBar from "../components/SearchBar";
import {useQueryParam, StringParam, withDefault} from 'next-query-params';

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

export default function Home() {

    const [games, setGames] = useState(null);
    // const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));

    useEffect(() => {
        gamesAPI.getGames(createParamsObj(searchText, sort, platform)).then(
            response => {
                setGames(response.data);
            }
        )
    }, []);

    //search options
    // const [searchText, setSearchText] = useState('');
    const [searchText, setSearchText] = useQueryParam('search', withDefault(StringParam, ''));
    const onChangeSearchTextHandler = (event) => {
        setSearchText(event.currentTarget.value);
    };
    const [platform, setPlatform] = useState('');
    // const [platform, setPlatform] = useQueryParam('platform', withDefault(NumberParam, 1));
    const [sort, setSort] = useState('-rating');
    // const [sort, setSort] = useQueryParam('sort', withDefault(StringParam, ''));

    const onChangePlatformHandler = (event) => {
        setPlatform(event.currentTarget.value);
        setGames(null);
        const params = createParamsObj(searchText, sort, platform);
        gamesAPI.getGames(params).then(
            response => {
                setGames(response.data);
            }
        )


    }
    const onChangeSortHandler = (event) => {
        setSort(event.currentTarget.value);
        setGames(null);
        const params = createParamsObj(searchText, sort, platform);
        gamesAPI.getGames(params).then(
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
            params.platform = platform;
        }

        return params;
    }

    const searchOnClickHandler = () => {
        const params = createParamsObj(searchText, sort, platform);
        setGames(null);
        gamesAPI.getGames(params).then(
            response => {
                setGames(response.data);
            }
        )
    }

    const nextPage = () => {
        setGames(null);
        gamesAPI.getDataFromUrl(games.next).then(
            response => {
                setGames(response.data);
            }
        )
    }

    const prevPage = () => {
        setGames(null);
        gamesAPI.getDataFromUrl(games.previous).then(
            response => {
                setGames(response.data);
            }
        )
    }

    //data for platforms
    const platformsData = [
        {
            value: '',
            name: 'ALL'
        },
        {
            value: '4',
            name: 'PC'
        },
        {
            value: '5',
            name: 'APPLE'
        },
        {
            value: '187',
            // value: '187,18,16,15,27',
            name: 'PS'
        },
        {
            // value: '1,186,14,80',
            value: '186',
            name: 'XBOX'
        },
    ];

    //data for sort
    const sortData = [
        {
            value: '-rating',
            name: '-Rating'
        },
        {
            value: 'rating',
            name: 'Rating'
        },
        {
            value: '-released',
            name: 'Newest'
        },
        {
            value: 'released',
            name: 'Oldest'
        },
    ];

    return (<AppWrapper>
            <SearchOptionsWrapper>
                <SearchOptions
                    name={'platforms'}
                    value={platform}
                    items={platformsData}
                    onChangeHandler={onChangePlatformHandler}
                />
                <SearchOptions
                    name={'ordering'}
                    value={sort}
                    items={sortData}
                    onChangeHandler={onChangeSortHandler}
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
