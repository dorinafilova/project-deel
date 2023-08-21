import React, { useEffect, useState } from "react";
import AutoComplete from "./Autocomplete";
import useDebounce from "../hooks/useDebounce";
import { fetchAlbumsData } from "../services/api";

const AlbumsWrapper = () => {
  const [error, setError] = useState(undefined);
  const [albumData, setAlbumData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debounceValue = useDebounce(searchQuery);

  const handleChange = (optionTitle: string) => {
    setSearchQuery(optionTitle);
  };

  useEffect(() => {
    if (debounceValue.length > 0) getAlbums(debounceValue);
  }, [debounceValue]);

  const getAlbums = (value: string) => {
    fetchAlbumsData(value)
      .then((res) => res.json())
      .then((albumsData) => setAlbumData(albumsData))
      .catch((err) => setError(err));
  };

  return (
    <AutoComplete
      options={albumData}
      searchQuery={searchQuery}
      error={error}
      onChange={handleChange}
    />
  );
};

export default AlbumsWrapper;
