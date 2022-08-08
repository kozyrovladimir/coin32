import React, {useEffect} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import {useState} from "react";

const InfiniteScrollComponent = ({games}) => {
    const [localGames, setLocalGames] = useState(games);

    useEffect(() => {
        console.log('use effect');
        setLocalGames(games);
        setLocalGameList(games.results);
    }, [games])

    const [localGameList, setLocalGameList] = useState(localGames.results);
    const [hasMore, setHasMore] = useState(localGames.next);
    const dataLength = localGames.count;

    const fetchMoreData = async () => {
        if (localGameList.length >= dataLength) {
            this.setState(setHasMore(false));
            return;
        }

        const response = await fetch(hasMore.toString());
        const newFilms = await response.json();
        await setLocalGameList(prewGames => [...prewGames, ...newFilms.results]);
    }
    return (
        <InfiniteScroll
            dataLength={localGameList.length}
            next={fetchMoreData}
            hasMore={!!hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <ul>
                {localGameList.map(({id, name, rating}, index) => (
                    <li key={index}><Link href={`/${id}`}>{name}</Link> :{rating}</li>
                ))}
            </ul>
        </InfiniteScroll>
    );
};

export default InfiniteScrollComponent;
