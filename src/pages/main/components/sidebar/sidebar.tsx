import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  COLORS,
  containerProps,
  RateLimit,
  SearchCardVM,
} from "../../../../utils/constants";
import { ReactComponent as MenuIcon } from "./../../../../assets/menu.icon.svg";
import { ReactComponent as SearchIcon } from "./../../../../assets/search.icon.svg";
import { ReactComponent as CityIcon } from "./../../../../assets/city.icon.svg";
import { ReactComponent as DayIcon } from "./../../../../assets/day.icon.svg";
import { ReactComponent as NightIcon } from "./../../../../assets/night.icon.svg";
import Recent from "./components/recent";
import SearchResult from "./components/searchresult";
import $ from "jquery";

const SidebarContainer = styled.aside<containerProps>`
  width: 100%;
  height: 650px;
  max-height: 55px;
  margin: 10px 0 7px;
  padding: 10px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  border-radius: 20px;
  color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  background-color: ${(props) =>
    props.darkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND};
  transition: max-height 0.5s ease-in;
  h3 {
    color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  }
  .hide {
    display: none;
  }
  &.expand {
    max-height: 650px;
    background-color: ${(props) =>
      props.darkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND};
    transition: max-height 0.4s ease-out;
    #menu-top,
    #menu-bottom {
      opacity: 0;
      transform: translateY(6px);
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
    #menu-bottom {
      transform: translateY(-6px);
    }
  }
  #menu-icon,
  #search-icon {
    cursor: pointer;
    border-radius: 10px;
    margin: 0;
    height: 35px;
    width: 35px;
    margin-right: auto;
    * {
      stroke: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
    }
    :hover {
      background-color: ${(props) =>
        props.darkMode ? COLORS.HOVER_DARK : COLORS.HOVER};
    }
  }
  input {
    color: ${(props) => (props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT)};
  }
  #menu-icon {
    #menu-top,
    #menu-bottom {
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
  }
  .top-container {
    display: flex;
    align-items: center;
    overflow: hidden;
    .toggle-day {
      border-radius: 10px;
      cursor: pointer;
      margin-left: auto;
      height: 30px;
      width: 30px;
    }
  }
  .lds-roller div:after {
    background-color: ${(props) =>
      props.darkMode ? COLORS.TEXT_DARK : COLORS.TEXT};
  }
`;

const SearchBox = styled.div<containerProps>`
  overflow: hidden;
  border-radius: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
  padding: 0;
  margin: 20px auto 10px;
  background-color: ${(props) =>
    props.darkMode ? COLORS.CONTAINER_DARK : COLORS.CONTAINER};
  opacity: 0.7;
  transition: opacity 0.3s ease-out;
  :focus-within {
    opacity: 1;
    transition: opacity 0.3s ease-out;
  }
  #search-icon {
    margin: 0 0 0 3px;
    height: 50px;
    width: 56px;
    border-radius: 500px;
    :hover {
      background-color: ${(props) =>
        props.darkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND};
    }
  }
`;
const SearchInput = styled.input`
  font-family: "Montserrat medium";
  background-color: transparent;
  font-size: 16px;
  height: 100%;
  width: 100%;
  border: none;
  padding: 0 20px;
  letter-spacing: -0.5px;
  :focus {
    outline: none;
    background-color: transparent;
  }
`;
interface Props {
  setRateLimit: (value: RateLimit) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}
const Sidebar = ({ setRateLimit, darkMode, setDarkMode }: Props) => {
  const STORAGE_ID = "WEATHERNOW_SEARCH_RECENT";
  const [expand, setExpand] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<SearchCardVM | null>(null);
  const [recentData, setRecentData] = useState<SearchCardVM[] | null>(() => {
    try {
      const value = localStorage.getItem(STORAGE_ID);
      if (value) return JSON.parse(value).data;
      else {
        localStorage.setItem(STORAGE_ID, JSON.stringify({ data: [] }));
        return null;
      }
    } catch (err) {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(200);

  useEffect(() => {
    if (data) SaveToRecent(data);
  }, [data]);

  useEffect(() => {
    if (expand)
      setTimeout(() => {
        $(".hide").fadeIn(300);
      }, 300);
    else $(".hide").fadeOut(150);
  }, [expand]);

  const SaveToRecent = (dataToStore: SearchCardVM) => {
    const value = localStorage.getItem(STORAGE_ID);
    if (value) {
      const recent_data: { data: SearchCardVM[] } = JSON.parse(value);
      let EXIT = false;
      recent_data.data.forEach((element) => {
        if (JSON.stringify(element) === JSON.stringify(dataToStore)) {
          EXIT = true;
          return;
        }
      });
      if (EXIT) return null;
      if (recent_data.data?.length > 2) recent_data.data.splice(2, 1);
      recent_data.data = [dataToStore, ...recent_data.data];
      setRecentData(recent_data.data);
      localStorage.setItem(STORAGE_ID, JSON.stringify(recent_data));
    }
  };

  const SearchForBook = async (city: string) => {
    setLoading(true);
    await fetch(
      `${
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000/api/weather"
          : process.env.REACT_APP_API_URL
      }/?state=${city.replace(" ", "%20").toLowerCase()}`,
      {
        method: `GET`,
      }
    )
      .then((response) => {
        let rateLimits = {
          limit: response.headers.get("X-RateLimit-Limit"),
          remaining: response.headers.get("X-RateLimit-Remaining"),
        };
        setRateLimit(rateLimits);
        setStatus(response.status);
        return response.json();
      })
      .then((weatherData) => {
        if (weatherData.cod) {
          setStatus(404);
          setData(null);
        } else setData(weatherData);
      })
      .catch((err) => {
        setStatus(400);
        console.log(err);
      });
    setLoading(false);
  };

  return (
    <SidebarContainer className={expand ? "expand" : ""} darkMode={darkMode}>
      <div className="top-container">
        <MenuIcon id="menu-icon" onClick={() => setExpand(!expand)} />
        {darkMode ? (
          <NightIcon
            className="toggle-day"
            onClick={() => setDarkMode(!darkMode)}
          />
        ) : (
          <DayIcon
            className="toggle-day"
            onClick={() => setDarkMode(!darkMode)}
          />
        )}
      </div>
      <div className="hide">
        <SearchBox darkMode={darkMode}>
          <SearchInput
            type="text"
            placeholder="Enter a City..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? SearchForBook(search) : true
            }
          />
          <SearchIcon id="search-icon" onClick={() => SearchForBook(search)} />
        </SearchBox>
        {loading ? (
          <Loading />
        ) : (
          status !== 200 && (
            <ServerError
              message={status === 404 ? "City not found" : undefined}
            />
          )
        )}
        {!loading && data && (
          <SearchResult darkMode={darkMode} data={data}></SearchResult>
        )}
        <h3>Recent</h3>
        {recentData &&
          recentData.map(
            (element, index) =>
              JSON.stringify(element) !== JSON.stringify(data) && (
                <Recent key={index} darkMode={darkMode} data={element} />
              )
          )}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;

const ServerErrorContainer = styled.div`
  width: 100%;
  min-height: 25px;
  height: fit-content;
  margin: 30px 0;
  div {
    align-items: center;
    font-size: 14px;
    color: ${COLORS.TEXT};
    font-family: "Montserrat light";
    text-align: center;
    &.message {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-family: "Montserrat regular";
    }
    span {
      color: rgb(56, 192, 255);
    }
  }
`;
interface ServerErrorProps {
  message?: string;
}
export const ServerError = ({ message }: ServerErrorProps) => {
  return (
    <ServerErrorContainer className="hide">
      {message ? (
        <div className="message">
          <CityIcon />
          {message}
        </div>
      ) : (
        <div>
          You are unable to access <span>WeatherNow</span> Server at the moment,
          try again later or refresh the page.
        </div>
      )}
    </ServerErrorContainer>
  );
};

const LoadingContainer = styled.div`
  width: fit-content;
  height: fit-content;
  min-height: 30px;
  position: relative;
  box-sizing: border-box;
  margin: 30px auto;
  .lds-roller {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
  }
  .lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }
  .lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
  }
  .lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
  }
  .lds-roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }
  .lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
  }
  .lds-roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  .lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
  }
  .lds-roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  .lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
  }
  .lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  .lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
  }
  .lds-roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  .lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
  }
  .lds-roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  .lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
  }
  .lds-roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  .lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
  }
  .lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export function Loading() {
  return (
    <LoadingContainer className="loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoadingContainer>
  );
}
