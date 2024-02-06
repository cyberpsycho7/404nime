import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import MiniSearchParent from '../Search/MiniSearchParent';
import logoText from "../../assets/logoText.png"
import Registration from '../Authorization/Registration';
import Login from '../Authorization/Login';
import UserContext from '../../Context/UserContext';

const NavBar = () => {
    const [searchValue, setSearchValue] = useState('')
    const [typeEnd, setTypeEnd] = useState(false)
    const [scrollIsZero, setScrollIsZero] = useState(true)
    const [inputFocus, setInputFocus] = useState(false)
    const [scrollY, setScrollY] = useState(false)
    const [showNavModal, setShowNavModal] = useState(false)
    const [searchManga, setSearchManga] = useState(false)
    const [pathName , setPathName] = useState("/")
    const [isShowRegistration , setIsShowRegistration] = useState(false)
    const [isShowLogin , setIsShowLogin] = useState(false)
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    
    const {user} = useContext(UserContext)
    const timeoutRef = useRef()

  const changeValue = (value) => {
    setTypeEnd(false)
    clearTimeout(timeoutRef.current)
    setSearchValue(value)

    timeoutRef.current = setTimeout(() => {
      setTypeEnd(true)
    }, 500)
  }

  const toggleAuth = () => {
    setIsShowRegistration(!isShowRegistration)
    setIsShowLogin(!isShowLogin)
  }

  const changeInput = (bool) => {
    setInputFocus(bool)
    setSearchValue('')
  }

  useEffect(() => {
    setPathName(location?.pathname.split("/"))
    let isLogInLocation = new URLSearchParams(location?.search).get("logIn")
    let isSignUpLocation = new URLSearchParams(location?.search).get("signUp")
    if(isLogInLocation === "true") {
      setIsShowLogin(true)
    } else if(isSignUpLocation === "true") {
      setIsShowRegistration(true)
    }
  }, [location])

  useEffect(() => {
    window.onscroll = (e) => {
      if(window.scrollY <= 1) setScrollIsZero(true)
      else setScrollIsZero(false)
      setScrollY(window.scrollY)
    }
  }, [])

  return (
    <div
    className={`sticky top-0 left-0 w-full after:border-b-[1px] after:border-b-silver/30 flex justify-center duration-500
    z-30 bg-gradient-to-b from-black/40 from-20% to-black/5 hover:after:!bg-def-black flex-initial
    ${(!scrollIsZero || searchValue)
      ? "after:bg-def-black"
      : "after:bg-none"} ${(pathName[1] === "" || pathName[1] === "more-info" || pathName[1] === "profile") ? "" : "after:!bg-def-black"}
      after:absolute after:content-[""] after:top-0 after:left-0 after:w-full after:h-full after:duration-300 after:-z-10`}
      >
        <Registration isShow={isShowRegistration} close={() => {
          setIsShowRegistration(false)
          setSearchParams([])
        }} toggleAuth={toggleAuth}/>
        <Login isShow={isShowLogin} close={() => {
          setIsShowLogin(false)
          setSearchParams([])
        }} toggleAuth={toggleAuth}/>
      <div
        className={`fixed bottom-28 right-12 h-14 w-14 bg-def-gray text-text-gray hover:text-white hover:border-white
      cursor-pointer border-text-gray border-[2px] rounded-full z-30 flex justify-center items-center materialIcon
      !text-4xl 450res:bottom-[6.5rem] 450res:right-5 duration-200 ${
        scrollY > 1000 ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
        onClick={() => window.scrollTo(0, 0)}
      >
        expand_less
      </div>
      <div className="flex justify-between h-[90px] items-center w-[1440px] mx-5">
        <div
          className={`${
            inputFocus ? "500res:hidden" : ""
          } text-center text-2xl font-[600] cursor-pointer flex gap-[22px] mx-0 w-max items-center`}
        >
          <Link to={"/"}>
            <img src={logoText} alt="404NIME" className="h-[24px]" />
          </Link>
          <div onClick={() => {
            setShowNavModal(!showNavModal)
            setSearchValue('')
          }}
            onMouseEnter={() => {
              if(!searchValue) setShowNavModal(true)
            }}
            className="cursor-pointer hidden 1200res:block 500res:hidden"
          >
            <svg className='w-7 h-7' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="white"/>
              <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="white"/>
              <path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div onMouseLeave={() => setShowNavModal(false)}
          className={`${showNavModal && !searchValue && !inputFocus ? "1200res:opacity-100 1200res:pointer-events-auto" : ""} 1200res:pointer-events-none 1200res:opacity-0
          duration-300 1200res:absolute 1200res:bg-def-black 1200res:border-[1px] 1200res:border-silver/30 1200res:p-5 rounded-xl
          static left-5 top-[110px] 540res:right-5 500res:flex-col 500res:py-5 500res:left-auto 500res:items-start
          flex items-center 650res:gap-5 650res:py-3 650res:px-5`}
        >
          <ul className="flex gap-7 [&>*]:cursor-pointer font-[300] text-lg 650res:gap-5 650res:text-sm 500res:flex-col">
            <li>
              <NavLink
                className={(param) =>
                  param.isActive ? "text-white" : "text-silver/70"
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(param) =>
                  param.isActive ? "text-white" : "text-silver/70"
                }
                to={"/advanced-search"}
              >
                Catalog
              </NavLink>
            </li>
            <li>
              <span
                style={{color: "rgb(232 232 232 / 0.7)" }}
                onClick={() => {
                  setSearchValue("Attack on titan")
                  setSearchManga(true)
                  setInputFocus(true)
                  setTypeEnd(true)
                }}
                to={"/news"}
              >
                Search for Manga
              </span>
            </li>
          </ul>
          <div className=''>
            {user?.isLoading ?
              <div className={`650res:block hidden w-[160px] rounded-md h-[46px] bg-white/20 animate-pulse`}></div>
            :
              (user?.isValid ? 
                <div className='650res:flex hidden items-center justify-center gap-5 500res:gap-3'>
                  <div className='cursor-pointer duration-200 flex items-center justify-center gap-2 font-light text-sm text-silver/70 [&_path]:fill-silver/70 hover:text-white [&_path]:hover:fill-white'>
                    <span>My Library</span>
                    <span>
                      <svg
                        className={`w-5 h-5`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12 14.5858L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                  <Link to={`/profile/${user?.login}`}>
                    <img src={user?.avatar} alt="user-avatar" className='cursor-pointer flex-shrink-0 rounded-full w-[44px] h-[44px]'/>
                  </Link>
                </div>
              :
                <div className='flex gap-3'>
                    <button onClick={() => {setIsShowLogin(true)}}
                    className="650res:block hidden text-sm py-[10px] px-3 bg-def-black-gray rounded-lg font-medium text-white cursor-pointer">
                      Log in
                    </button>
                    <button onClick={() => {setIsShowRegistration(true)}}
                    className="650res:block hidden text-sm py-[10px] px-3 bg-white rounded-lg font-medium text-def-black cursor-pointer">
                      Get started
                    </button>
                </div>)
            }
          </div>
          </div>{" "}
        <div
          className={`w-[440px] h-[52px] border-solid border-[2px] border-white/20 flex
                    p-3 rounded-xl bg-white/20 1200res:ml-auto 1200res:mr-5 900res:w-[30%]
                    650res:w-[60%] 650res:mr-0 relative 650res:static items-center duration-300
                    z-20 ${
                      inputFocus
                        ? "500res:w-full 500res:h-[70%]"
                        : "500res:py-[14px] 500res:px-4 500res:w-min 500res:bg-transparent 500res:border-none"
                    }
                    `}
        >
          <label
            className="flex mr-3"
            htmlFor={"input"}
            onClick={() => {
              changeInput(true);
            }}
          >
            <span className="cursor-pointer">
              <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path className='fill-white/80 500res:fill-white' fillRule="evenodd" clipRule="evenodd" d="M10 0.5C4.75329 0.5 0.5 4.75329 0.5 10C0.5 15.2467 4.75329 19.5 10 19.5C12.082 19.5 14.0076 18.8302 15.5731 17.6944L20.2929 22.4142C20.6834 22.8047 21.3166 22.8047 21.7071 22.4142L22.4142 21.7071C22.8047 21.3166 22.8047 20.6834 22.4142 20.2929L17.6944 15.5731C18.8302 14.0076 19.5 12.082 19.5 10C19.5 4.75329 15.2467 0.5 10 0.5ZM3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5899 16.5 10 16.5C6.41015 16.5 3.5 13.5899 3.5 10Z" fill='#ffffff'/>
              </svg>
            </span>
          </label>
          <input
            value={searchValue}
            type="text"
            placeholder="Search"
            className={`w-full h-full bg-transparent outline-none placeholder:font-normal placeholder:text-white/80 text-white
            `}
            id="input"
            onChange={(e) => changeValue(e.target.value.trimStart())}
          />
          <div
            className={`cursor-pointer duration-100 ${
              searchValue.trimStart() ? "block" : "hidden"
            } ${inputFocus ? "500res:block" : "500res:hidden"}`}
            onClick={() => {
              changeInput(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289Z" fill="white"/>
            </svg>
          </div>
          <MiniSearchParent
            typeEnd={typeEnd}
            searchValue={searchValue}
            setInputFocus={changeInput}
            searchManga={searchManga}
            setSearchManga={setSearchManga}
          />
        </div>
        <span
          onClick={() => {
            setShowNavModal(!showNavModal)
            setSearchValue('')
          }}
          onMouseEnter={() => setShowNavModal(true)}
          className={`${
            inputFocus ? "500res:hidden" : ""
          } ml-4 hidden 500res:block cursor-pointer`}
        >
          <svg className='w-7 h-7' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="white"/>
            <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="white"/>
            <path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="white"/>
          </svg>
        </span>
        <div>
          {user?.isLoading ?
            <div className={`w-[180px] 650res:hidden rounded-md h-[56px] bg-white/20 animate-pulse`}></div>
          :
            (user?.isValid ? 
              <div className='flex items-center justify-center gap-7 1200res:gap-5 650res:hidden'>
                <div className='cursor-pointer duration-200 flex items-center justify-center gap-2  text-silver/70 [&_path]:fill-silver/70 hover:text-white [&_path]:hover:fill-white'>
                  <span>My Library</span>
                  <span>
                    <svg
                      className={`w-5 h-5`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L12 14.5858L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
                <Link to={`/profile/${user?.login}`}>
                  <img src={user?.avatar} alt="user-avatar" className='cursor-pointer flex-shrink-0 rounded-full w-[44px] h-[44px]'/>
                </Link>
              </div>
            :
              <div className="flex gap-3 items-center 650res:hidden">
                <button onClick={() => {setIsShowLogin(true)}}
                className="btn-base bg-def-black-gray text-white cursor-pointer">
                  Log in
                </button>
                <button onClick={() => {setIsShowRegistration(true)}}
                className="btn-base bg-white text-def-black cursor-pointer">
                  Get started
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default NavBar