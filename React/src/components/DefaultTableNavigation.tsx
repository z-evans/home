import {
  faStepBackward,
  faBackward,
  faForward,
  faStepForward
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import Colours from "../style/Colours";
import { NavigationProps } from "../types/Common";

interface Props extends NavigationProps {
  handleOffset: (offset: number) => void;
}

export const DefaultTableNavigation: React.FC<Props> = ({
  handleOffset,
  offset,
  recordLimit,
  recordCount
}) => {
  const totalPages = Math.ceil(recordCount / recordLimit);
  const currentPage = Math.floor(offset / recordLimit) + 1;

  return (
    <div>
      <NavigationContainer>
        <div>
          <NavigationIcon
            onClick={() => {
              handleOffset(0);
            }}
            solid={true}
            primaryColor={
              Colours.default.saintTropazBlue
            }
            data-testid="nav-step-backward"
          >
            <div>
              <FontAwesomeIcon icon={faStepBackward} />
            </div>
          </NavigationIcon>
          <NavigationIcon
            onClick={() => {
              if (offset >= recordLimit) handleOffset(offset - recordLimit);
            }}
            solid={true}
            primaryColor={
              Colours.default.saintTropazBlue
            }
            data-testid="nav-backward"
          >
            <div>
              <FontAwesomeIcon icon={faBackward} />
            </div>
          </NavigationIcon>
        </div>
        <div>
          <NavigationIcon
            onClick={() => {
              if (
                currentPage == totalPages &&
                offset != recordLimit &&
                offset != 0
              ) {
                handleOffset(offset - recordLimit * 2);
              } else if (offset >= recordLimit) {
                handleOffset(offset - recordLimit);
              }
            }}
            solid={currentPage == 1 ? true : false}
            primaryColor={
              Colours.default.saintTropazBlue
            }
            data-testid="nav-number-first"
          >
            <div>
              {currentPage == 1 || totalPages == 2
                ? 1
                : currentPage == totalPages
                  ? currentPage - 2
                  : currentPage - 1}
            </div>
          </NavigationIcon>
          {totalPages < 2 ? (
            ""
          ) : (
            <NavigationIcon
              onClick={() => {
                if (currentPage == 1) handleOffset(offset + recordLimit);
                else if (currentPage == totalPages && currentPage != 2)
                  handleOffset(offset - recordLimit);
              }}
              solid={
                currentPage == 2 && totalPages == 2
                  ? true
                  : currentPage == 1
                    ? false
                    : currentPage == totalPages
                      ? false
                      : true
              }
              primaryColor={
                Colours.default.saintTropazBlue
              }
              data-testid="nav-number-middle"
            >
              <div>
                {currentPage == 1 || totalPages == 2
                  ? 2
                  : currentPage == totalPages
                    ? currentPage - 1
                    : currentPage}
              </div>
            </NavigationIcon>
          )}
          {totalPages < 3 ? (
            ""
          ) : (
            <NavigationIcon
              onClick={() => {
                if (currentPage == 1) handleOffset(offset + recordLimit * 2);
                else if (offset < recordCount - recordLimit)
                  handleOffset(offset + recordLimit);
              }}
              solid={
                currentPage == 1
                  ? false
                  : currentPage == totalPages
                    ? true
                    : false
              }
              primaryColor={
                Colours.default.saintTropazBlue
              }
              data-testid="nav-number-last"
            >
              <div>
                {currentPage == 1
                  ? 3
                  : currentPage == totalPages
                    ? currentPage
                    : currentPage + 1}
              </div>
            </NavigationIcon>
          )}
        </div>
        <div>
          <NavigationIcon
            onClick={() => {
              if (offset < recordCount - recordLimit)
                handleOffset(offset + recordLimit);
            }}
            solid={true}
            primaryColor={
              Colours.default.saintTropazBlue
            }
            data-testid="nav-forward"
          >
            <div>
              <FontAwesomeIcon icon={faForward} />
            </div>
          </NavigationIcon>
          <NavigationIcon
            onClick={() => {
              handleOffset(recordCount - (recordCount % recordLimit));
            }}
            solid={true}
            primaryColor={
              Colours.default.saintTropazBlue
            }
            data-testid="nav-step-forward"
          >
            <div>
              <FontAwesomeIcon icon={faStepForward} />
            </div>
          </NavigationIcon>
        </div>
      </NavigationContainer>
      <StatsContainer color={Colours.default.grey}>
        <span data-testid="nav-records">{recordCount} Records Retrieved</span>
        <span data-testid="nav-pages">
          Page {currentPage} / {totalPages}
        </span>
      </StatsContainer>
    </div>
  );
};

export const FormNavigationContainer = styled("div")`
  display: flex;
`;

export const FormNavigationButton = styled("a")`
  padding: 0.25em;
  border: 1px solid
    ${({ borderColor }: { borderColor?: string }) => borderColor ?? "#000"};
  border-bottom: none;
  color: ${({ color }: { color?: string }) => color ?? "#000"} !important;
  ${({
  background
}: {
  background?: string;
  borderColor?: string;
  color?: string;
}) => (background ? `background: ${background};` : "")}
  cursor: pointer;
  min-width: 60px;
  text-align: center;
`;

export const NavigationContainer = styled("div")`
  display: flex;
  justify-content: center;
  padding: 1em;
  margin: auto;
  > div {
    display: flex;
    padding: 0.25em;
  }
`;

export const StatsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  font-size: 0.85em;
  color: ${({ color }) => color ?? "#000"};
  #amount-shown {
    width: 200px;
    margin: auto;
    margin-bottom: 1em;
  }
  #amount-shown > * {
    width: 100%;
  }
`;

export const NavigationIcon = styled("a")`
  height: 50px;
  width: 50px;
  cursor: pointer;
  border: 1px solid
    ${({ primaryColor }: { primaryColor?: string; color?: string }) =>
    primaryColor ?? ""};
  background: ${({
      solid,
      primaryColor
    }: {
      solid?: boolean;
      primaryColor?: string;
      color?: string;
    }) => (solid ? primaryColor : "")};
  margin: 0 0.125em;
  > div {
    display: flex;
    margin: auto;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  * {
    color: ${({
      primaryColor,
      solid
    }: {
      solid?: boolean;
      primaryColor?: string;
    }) => (solid ? "#FFF" : primaryColor)};
  }
  :hover {
    background: ${({
      primaryColor
    }: {
      primaryColor?: string;
      color?: string;
    }) => primaryColor ?? ""};
    * {
      color: #fff;
    }
  }
`;