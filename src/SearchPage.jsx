import React from "react";
import { Link } from "react-router-dom";
import Response from "./response";
import "./SearchPage.css";
import { useStateValue } from "./StateProvider";
import useGoogleSearch from "./useGoogleSearch";
import googleLogo from "./assets/Google_2015_logo.svg.png";
import Search from "./components/Search";
import SearchIcon from "@mui/icons-material/Search";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ArticleIcon from "@mui/icons-material/Article";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function SearchPage() {
  const [{ term = "Tesla" }, dispatch] = useStateValue();

  // Live API call 👇
  const {data} = useGoogleSearch(term)

  //Mock API call 👇
//   const data = Response;

  console.log(data);
  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img src={googleLogo} alt="" className="searchPage__logo" />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage__options">
            <div className="searchPage__optionLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/">All</Link>
              </div>
              <div className="searchPage__option">
                <ImageSearchIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__option">
                <SlideshowIcon />
                <Link to="/videos">Videos</Link>
              </div>
              <div className="searchPage__option">
                <ArticleIcon />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage__option">
                <MoreVertIcon />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage__optionRight">
              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results in (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>

          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a href={item.link} className='searchPage__resultLink' >
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image.src
                      }
                      alt=""
                      className="searchPage__resultImage"
                    />
                  )}
                {item.displayLink} 🔽
              </a>
              <a href={item.link} className="searchPage__resultTitle">
                <h2>{item.title}</h2>
              </a>
              <p href="" className="searchPage__resultSnippet">
                {item.snippet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
