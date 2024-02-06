import axios from 'axios'
import React, { useState, useEffect } from 'react'
import MiniSearchCard from '../Search/MiniSearchCard'
import MiniSearchPreloader from '../Search/MiniSearchPreloader'
import ErrorSearch from '../Search/ErrorSearch'

const MiniSearchParent = ({searchValue, typeEnd, setInputFocus, searchManga, setSearchManga}) => {
    
    const [preloader, setPreloader] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchError, setSearchError] = useState(false)
    const [searchEmpty, setSearchEmpty] = useState(false)

    useEffect(() => {
      setSearchError(false)
      setSearchEmpty(false)
      if(!searchValue) {
          setTimeout(() => setShowModal(false), 250)
          setSearchResults([])
          return
      } else setShowModal(true)
      if(!typeEnd) return

      setPreloader(true)
      let fetchUrl = `https://march-api1.vercel.app/meta/anilist/advanced-search?type=ANIME&perPage=15&query=${searchValue}`
      if(searchManga) fetchUrl = `https://march-api1.vercel.app/meta/anilist-manga/${searchValue}`

      axios.get(fetchUrl, {headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
      }}).then(resp => {
        setSearchResults(resp.data.results)
        if(resp.data.results.length < 1) setSearchEmpty(true)
      }).catch(() => {
        setSearchError(true)
        setSearchEmpty(false)
      }).finally(() => setPreloader(false))
    }, [searchValue, typeEnd, searchManga])

    return (
      <div>
        <div
          className={` w-max 900res:left-1/2 900res:-translate-x-1/2 cursor-pointer
            absolute top-[90px] left-0 650res:left-0 650res:w-full 650res:transform-none 650res:rounded-none 650res:bg-def-black 650res:backdrop-blur-none
            rounded-2xl backdrop-blur-lg bg-black/40 ${
              showModal ? "p-4 h-[60px]" : "h-0 p-0"
            } duration-300`}
          onClick={() => setSearchManga(!searchManga)}
        >
          <div className={`${showModal ? "" : "hidden"} w-full h-full flex justify-start gap-3 items-center `}>
            <span
              className={`${searchManga ? "bg-white" : ""}
              duration-300 w-5 h-5 bg-transparent border-2 border-white flex justify-center items-center rounded-[4px]`}
              >
              <svg
                className={`${searchManga ? " opacity-100" : "opacity-0"} w-4 h-4`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z"
                  fill="#121212"
                  />
              </svg>
            </span>
            <p>Search for Manga</p>
          </div>
        </div>
        <div
          className={` w-full 900res:w-[433px] 900res:left-1/2 900res:-translate-x-1/2
          absolute top-[165px] 650res:top-[150px] left-0 650res:left-0 650res:w-full 650res:transform-none 650res:rounded-none 650res:bg-def-black 650res:backdrop-blur-none
          rounded-2xl backdrop-blur-lg bg-black/40 ${
            showModal ? "650res:h-screen p-4 h-[400px]" : "h-0 p-0"
          } duration-300`}
        ></div>
        <div
          className={`w-full 900res:w-[433px] 900res:left-1/2 900res:-translate-x-1/2 overflow-x-hidden overflow-y-scroll scroll-px-0 
          absolute top-[165px] 650res:top-[150px] left-0 flex flex-col gap-2 scrollbar-none z-30 650res:left-0 650res:w-full 650res:transform-none 650res:rounded-none 
          rounded-2xl ${showModal ? "650res:h-screen p-4 h-[400px]" : "h-0 p-0"} duration-300`}
          >
          {preloader ? (
            <MiniSearchPreloader/>
            ) :
            (!searchError ?
              (searchEmpty ? (
                <ErrorSearch isMini={true} notFound={true}/>)
                : 
                searchResults?.map((item) => (
                  <MiniSearchCard key={item.id} item={item} setInputFocus={setInputFocus}/>))
                  ) : (
                    <ErrorSearch isMini={true} notFound={false}/>
                    ))
                  }
        </div>
      </div>
      );
    }
    
    export default MiniSearchParent