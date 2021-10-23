import React, { useEffect, useReducer, useState } from 'react';
import RobloxManager from './managers/RobloxManager';
import { Games, NavigationProps, navReducer } from './types/Common';
import styled from 'styled-components'
import { DefaultTableNavigation } from './components/DefaultTableNavigation';
import { RobloxGame } from './components/RobloxGame';
import { useMountEffect } from './util/hooks';

export interface Filter {
  name: string;
  genre: string;
}

export interface GamesFilter extends Filter {
  offset: number;
  limit: number;
}

let timeOutId: any = undefined;

const MainPage = () => {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [games, setGames] = useState<Games[]>([]);
  const [navProps, navDispatch] = useReducer(navReducer, {
    offset: 0,
    recordCount: 0,
    recordLimit: 25
  });

  const [filter, setFilter] = useState<Filter>({
    name: "",
    genre: ""
  });

  useMountEffect(() => {
    getGames(navProps.offset);
  })

  useEffect(() => {
    const timeOutId = setTimeout(() => getGames(navProps.offset), 2000);
    return () => clearTimeout(timeOutId);
  }, [filter])

  const getGames = async (offset: number) => {
    const data = await RobloxManager.getGames({ ...filter, limit: navProps.recordLimit, offset: offset });
    setGames(data.games);
    navDispatch({ type: "SET_RECORDCOUNT", payload: data.count });
    setLoaded(true);
  }

  const handleOffset = (offset: number) => {
    navDispatch({ type: "SET_OFFSET", payload: offset });
    getGames(offset)
  }

  return <App games={games} filter={filter} setFilter={setFilter} navProps={navProps} handleOffset={handleOffset} />
}

interface Props {
  games: Games[]
  filter: Filter
  navProps: NavigationProps
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  handleOffset: (offset: number) => void
}

const App: React.FC<Props> = ({ games, filter, setFilter, navProps, handleOffset }) => {
  return (
    <div>
      <header>
        Roblox Games
        <input type="text" value={filter.name} onChange={(e) => setFilter({ ...filter, name: e.currentTarget.value })} />
        <input type="text" value={filter.genre} onChange={(e) => setFilter({ ...filter, genre: e.currentTarget.value })} />
      </header>
      <GamesContainer>
        {games.map(e => <RobloxGame data={e} />)}
      </GamesContainer>
      <DefaultTableNavigation {...navProps} handleOffset={e => handleOffset(e)} />
    </div>
  );
}

export default MainPage;

const GamesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
  max-width: 1000px;
  margin: auto;
`