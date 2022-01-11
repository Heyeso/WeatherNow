import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SearchCardVM } from "../../../utils/constants";

const SearchPopupContainer = styled.div``;

const SearchPopup = () => {
  const [searchData, setSearchData] = useState<SearchCardVM | null>(null);
  const { search } = useParams();
  return <SearchPopupContainer>{search}</SearchPopupContainer>;
};

export default SearchPopup;
