import React, { useEffect, useState } from "react";
import { IAlbumResponse } from "../services/types";

import "./Autocomplete.css";
export interface IAutoCompleteProps<TOptions> {
  options: TOptions[];
  searchQuery: string;
  onChange: (optionTitle: string) => void;
  error: string | undefined;
}

const AutoComplete = ({
  options,
  searchQuery,
  onChange,
  error,
}: IAutoCompleteProps<IAlbumResponse>) => {
  const [inputOptions, setInputOptions] = useState<IAlbumResponse[]>([]);

  // focusedRowId is used for the purposes of onKeyDown functionality implementation
  const [focusedRowId, setFocusedRowId] = useState(0);

  useEffect(() => {
    if (options.length > 0) setInputOptions(options);
  }, [options]);

  const onSelectKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (focusedRowId !== -1 && inputOptions.length !== 0) {
          onChange(inputOptions[focusedRowId].title);
        }

        break;
      case "ArrowUp":
        if (focusedRowId > -1) {
          setFocusedRowId(focusedRowId - 1);
        }
        break;
      case "ArrowDown":
        if (focusedRowId < inputOptions.length - 1) {
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
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onSelectKeyDown}
          value={searchQuery}
        />
      </div>

      {searchQuery.length > 0 && error && (
        <div className="search-results-error">
          {"An error has occured while fetching the result"}
        </div>
      )}
      {searchQuery.length > 0 && !inputOptions?.length && !error && (
        <div className="search-results-empty">
          {"No matching results are found"}
        </div>
      )}
      <div className="search-results">
        {searchQuery.length > 0 &&
          inputOptions.map((album, index) => {
            const searchRegExp = new RegExp(`${searchQuery.toLocaleLowerCase()}`)
            const splitAlbumTitle = album.title.split(searchRegExp)
            const modifiedAlbumTitle = splitAlbumTitle.join(`<mark>${searchQuery}</mark>`);
            return (
              <div
                className={`search-results-item  ${
                  focusedRowId === index ? "search-results-item-active" : null
                }`}
                key={index}
                onClick={() => onChange(album.title)}
                dangerouslySetInnerHTML={{ __html: modifiedAlbumTitle }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AutoComplete;
