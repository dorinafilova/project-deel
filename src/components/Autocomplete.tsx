import React, { useEffect, useState } from "react";
import { IAlbumResponse } from "../services/types";
import { fetchAlbumsData } from "../services/api";
import useDebounce from "../hooks/useDebounce";

import "./Autocomplete.css";

const linkRefs = [];

const AutoComplete = () => {
  const [error, setError] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<IAlbumResponse[] | []>([]);

  // focusedRowId is used for the purposes of onKeyDown functionality implementation
  const [focusedRowId, setFocusedRowId] = useState(0);

  const debounceValue = useDebounce(searchQuery);

  useEffect(() => {
    if (debounceValue.length > 0) getAlbums(debounceValue);
  }, [debounceValue]);

  const getAlbums = (value: string) => {
    fetchAlbumsData(value)
      .then((res) => res.json())
      .then((albumsData) => setResults(albumsData))
      .catch((err) => setError(err));
  };


  const onSelectKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (focusedRowId !== -1) {
          setSearchQuery(results[focusedRowId].title);
        }

        break;
      case "ArrowUp":
        if (focusedRowId > -1) {
          setFocusedRowId(focusedRowId - 1);
        }
        break;
      case "ArrowDown":
        if (focusedRowId < results.length - 1) {
          setFocusedRowId(focusedRowId + 1);
        }
        break;
    }
  };

  return (
    <div className="wrapper">
      <div className="search-input-container">
        <div className="search-input-label">Search for an album</div>
        <input
          type="text"
          className="input"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={onSelectKeyDown}
          value={searchQuery}
        />
      </div>

      {searchQuery.length > 0 && error && (
        <div className="search-results-error">
          {"An error has occured while fetching the result"}
        </div>
      )}
      {searchQuery.length > 0 && !results?.length && !error && (
        <div className="search-results-empty">
          {"No matching results are found"}
        </div>
      )}
      <div className="search-results">
        {searchQuery.length > 0 &&
          results.map((album, index) => {
            const modifiedAlbumTitle = album.title.replace(
              new RegExp(searchQuery.toLocaleLowerCase()),
              (matchedText) => `<mark>${matchedText}</mark>`
            );

            return (
              <div
                className={`search-results-item  ${
                  focusedRowId === index ? "search-results-item-active" : null
                }`}
                key={index}
                onClick={() => setSearchQuery(album.title)}
                dangerouslySetInnerHTML={{ __html: modifiedAlbumTitle }}
                ref={(link) => {
                  linkRefs[index] = link;
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AutoComplete;
