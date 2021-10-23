import { faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import DataManager from "../managers/DataManager";
import Colours from "../style/Colours";
import { Games } from "../types/Common";

interface Props {
  data: Games;
}

export const RobloxGame: React.FC<Props> = ({
  data
}) => {
  return (
    <Container href={`https://www.roblox.com/games/${data.gameId}`}>
      <Thumbnail src={data.details.img ?? ""} alt="" />
      <h3>{data.details.name}</h3>
      <StatsContainer>
        <span>
          <FontAwesomeIcon icon={faThumbsUp} /> {DataManager.nFormatter(parseInt(data.totalUpVotes))}
        </span>
        <span>
          <FontAwesomeIcon icon={faUser} /> {DataManager.nFormatter(parseInt(data.details.playing))}
        </span>
      </StatsContainer>
    </Container>
  );
};

const Container = styled.a`
  display: flex;
  flex-direction: column;
  width: 150px;
  margin: 1em;
  color: ${Colours.default.white};
  text-decoration: unset;

  h3 {
    margin-top: 0.2em;
    margin-bottom: 0.1em;
    flex-grow: 1;
  }

  span {
    font-size: 0.8em;
  }
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Thumbnail = styled.img`
  border-radius: 0.5em;
`
