import React, { useState, useEffect, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import { FaTumblrSquare } from "react-icons/fa";
import axios from "axios";

const Main = ({ Colors }) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const colorChange1 = useRef();
  const colorChange2 = useRef();
  const backgroundColorChange1 = useRef();
  const tweetpost = useRef();
  const tumblrPost = useRef();

  const getQuote = () => {
    axios
      .get("https://type.fit/api/quotes")
      .then((response) => {
        const { data } = response;
        let randomNo = Math.floor(Math.random() * data.length);
        setQuote(data[randomNo]);
        setAuthor(data[randomNo]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuote();
    console.log(Colors);
  }, []);
  useEffect(() => {
    let random = Math.floor(Math.random() * 100);
    colorChange1.current.style.color = Colors[random];
    colorChange2.current.style.color = Colors[random];
    document.querySelector(".icon").style.color = Colors[random];
    document.querySelector(".tweet-quote").style.color = Colors[random];
    document.querySelector(".tumblr-quote").style.color = Colors[random];
    console.log(Colors[random]);
    backgroundColorChange1.current.style.backgroundColor = Colors[random];
    document.body.style.backgroundColor = Colors[random];
  }, [quote]);
  // console.log(quote);
  const showTweet = () => {
    tweetpost.current.style.display = "block";
  };
  const showTumblr = () => {
    tumblrPost.current.style.display = "block";
  };
  const hideTweet = () => {
    tweetpost.current.style.display = "none";
  };
  const hideTumblr = () => {
    tumblrPost.current.style.display = "none";
  };
  return (
    <div className="container-fluid " id="quote-box">
      <div className="card ">
        <div className="card-body">
          <FaQuoteLeft className="icon" />
          <p className="card-text quote-text" id="text" ref={colorChange1}>
            {quote.text}
          </p>
          <div id="author">
            <p ref={colorChange2}>{author.author}</p>
          </div>
          <div className="card-link social-icons ">
            <div className="mysocials">
              <a
                href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${quote.text}`}
                target="_blank"
                alt=""
                rel="noopener noreferrer"
                className="tweet-quote"
                onMouseOver={showTweet}
                onMouseLeave={hideTweet}
                id="tweet-quote"
              >
                <AiFillTwitterSquare className="twitter"  id="tweet-quote-2" />
              </a>
              <a
                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freeCodeCamp&caption=${author.author}&content=${quote.text}.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
                target="_blank"
                alt=""
                rel="noopener noreferrer"
                className="tumblr-quote"
                onMouseOver={showTumblr}
                onMouseLeave={hideTumblr}
                id="tumblr-quote"
              >
                <FaTumblrSquare className="tumblr"  id="tumblr-quote-2"  />
              </a>
            </div>
            <div
              className="new-quote "
              id="new-quote"
              onClick={getQuote}
              ref={backgroundColorChange1}
              Z
            >
              <p>New Quote</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
