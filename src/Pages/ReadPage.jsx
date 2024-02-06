import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MangaPagination from '../Components/Reader/MangaPagination'
import PreloaderComponent from '../Components/Other/PreloaderComponent'
import { Link, useLocation, useParams } from 'react-router-dom'

const ReadPage = () => {
    const {id} = useParams()
    const search = useLocation().search
    const initChapter = Number(new URLSearchParams(search).get("chapter"))

    const [pageLoading, setPageLoading] = useState(true)
    const [mangaInfo, setMangaInfo] = useState(null)
    const [chaptersPages, setChaptersPages] = useState(null)
    const [fetchError, setFetchError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [preloader, setPreloader] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentChapter, setCurrentChapter] = useState(1)
    const [currentPagedStyle, setCurrentPagedStyle] = useState(localStorage.getItem("pagedStyle"))
    const [pageCount, setPageCount] = useState(1)
    const [currentChapterIndex, setCurrentChapterIndex] = useState(initChapter)

    
    const completeLoading = (state) => {
        setFetchError(state)
        setIsLoading(false)
        setTimeout(() => {
            setPreloader(false)
        }, 300)
    }
    
    const handleChangeTitle = (titles, currentChapter) => {
        document.title = `${titles?.english ? titles?.english : titles?.romaji} - Chapter ${currentChapter} | Read online on 404nime`
    }
    
    const fixChapters = (data) => {
        let fixedMangaInfo = {...data}
        let chaptersCopy = [...data?.chapters]
        let fixedChapters = chaptersCopy?.filter(item => item?.pages !== 0)
        fixedMangaInfo.chapters = fixedChapters
        return fixedMangaInfo
    }
    
    const handleNext = () => {
        if(currentPagedStyle === "list") {
            if(Number(currentChapterIndex) >= (mangaInfo?.chapters?.length - 1)) return
            setCurrentChapterIndex(Number(currentChapterIndex) + 1)
        }
        else {
            if(Number(currentPage) >= Number(mangaInfo?.chapters[currentChapterIndex].pages)) {
                if(Number(currentChapterIndex) >= (mangaInfo?.chapters?.length - 1)) return
                setCurrentChapterIndex(Number(currentChapterIndex) + 1)
            } else setCurrentPage(Number(currentPage)+1)
        }
    }

    const handlePrev = () => {
        if(currentPagedStyle === "list") {
            if(Number(currentChapterIndex) <= 0) return
            setCurrentChapterIndex(Number(currentChapterIndex) - 1)
        }
        else {
            if(Number(currentPage) <= 1) {
                if(Number(currentChapterIndex) <= 0) return
                setCurrentChapterIndex(Number(currentChapterIndex) - 1)
            } else setCurrentPage(Number(currentPage)-1)
        }
    }
    
    const fetchMangaChapter = (chapterId) => {
        axios.get(`https://march-api1.vercel.app/meta/anilist-manga/read?chapterId=${chapterId}&provider=mangadex`, {
            headers: {Referer: "localhost:8888"}
        })
        .then(resp => {
            setChaptersPages(resp.data)
            completeLoading(false)
        })
        .catch(() => completeLoading(true))
    }
        
    useEffect(() => {
        setFetchError(false)
        if(!currentPagedStyle) setCurrentPagedStyle("paged")
        axios.get(`https://march-api1.vercel.app/meta/anilist-manga/info/${id}?provider=mangadex`)
        .then(resp => {
            let fixedMangaInfo = fixChapters(resp.data)
            handleChangeTitle(fixedMangaInfo?.title, fixedMangaInfo?.chapters[currentChapterIndex].chapterNumber)
            setMangaInfo(fixedMangaInfo)
            setCurrentChapter(fixedMangaInfo?.chapters[currentChapterIndex].chapterNumber)
            fetchMangaChapter(fixedMangaInfo?.chapters[currentChapterIndex].id)
        })
        .catch((e) => {
            console.log(e);
            completeLoading(true)
        })
    }, [])  
    
    
    useEffect(() => {
        if(!mangaInfo) return
        setIsLoading(true)
        setPreloader(true)
        setCurrentPage(1)
        handleChangeTitle(mangaInfo?.title, mangaInfo?.chapters[currentChapterIndex].chapterNumber)
        setCurrentChapter(mangaInfo?.chapters[currentChapterIndex].chapterNumber)
        fetchMangaChapter(mangaInfo?.chapters[currentChapterIndex].id)
    }, [currentChapterIndex])
    
    useEffect(() => {
        setPageLoading(true)
    }, [currentPage])
    
    useEffect(() => {
        if(!currentPagedStyle) return
        localStorage.setItem("pagedStyle", `${currentPagedStyle}`)
    }, [currentPagedStyle]) 
                
    if(preloader) return <PreloaderComponent isLoaded={isLoading}/>
    else if(fetchError) return <div className='text-4xl text-white'>ERROR WHILE FETCHING TRY AGAIN LATER <button onClick={() => history.back()} className='btn-base'>BACK</button></div>
    return (
        <div className='opacity-0 animate-fadeInAnimate fill-mode-forward w-[1160px] mx-auto 1200res:!w-full 1200res:!px-5 flex flex-col items-center py-16'>
            <div className='w-full flex items-start flex-col gap-10 mb-3'>
                <h2 className='text-3xl'>{mangaInfo?.title?.english ? mangaInfo?.title?.english : mangaInfo?.title?.romaji} - Chapter {currentChapter}</h2>
                <div className='text-text-gray [&>a]:duration-200'>
                    <Link className='hover:text-white' to={"/"}>Home</Link>
                    <span> / </span>
                    <Link className='hover:text-white' to={`/more-info/${id}`}>{mangaInfo?.title?.english ? mangaInfo?.title?.english : mangaInfo?.title?.romaji}</Link>
                    <span> / </span>
                    <span>Chapter {currentChapter} - {mangaInfo?.chapters[currentChapterIndex]?.title}</span>
                </div>
            </div>
            <MangaPagination
                chaptersPages={chaptersPages}
                mangaInfo={mangaInfo}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                currentPagedStyle={currentPagedStyle}
                setCurrentPagedStyle={setCurrentPagedStyle}
                pageCount={pageCount}
                currentChapterIndex={currentChapterIndex}
                setCurrentChapterIndex={setCurrentChapterIndex}
                handleNext={handleNext}
                handlePrev={handlePrev}
            />
            <div className={`relative flex flex-col items-center my-10`} id='img'>
                <div className={`${pageLoading && currentPagedStyle !== "list" ? "bg-black/50 backdrop-blur-sm" : ""}
                ${currentPagedStyle === "list" ? "items-start pt-8" : "items-center"} z-10 absolute top-0 left-0 w-full h-full flex justify-center`}>
                    <div className={`${pageLoading && currentPagedStyle !== "list" ? "" : "!hidden"} loadingio-spinner-pulse-q546hrr845`}>
                        <div className="ldio-lm0a0msd0s9">
                            <div className='!bg-white'></div>
                            <div className='!bg-slate-300'></div>
                            <div className='!bg-slate-400'></div>
                        </div>
                    </div>
                </div>
                <a href='#img' className='absolute top-0 left-0 w-1/4 h-full z-20 block' title='PREV' onClick={handlePrev}></a>
                <a href='#img' className='absolute top-0 right-0 w-3/4 h-full z-20 block' title='NEXT' onClick={handleNext}></a>
                {currentPagedStyle === "list" ?  
                    chaptersPages?.map(item => <img key={item?.page} src={`${item?.img}`} alt='manga page' onLoad={() => setPageLoading(false)}/>)
                :
                    <img onLoad={() => setPageLoading(false)} src={`${chaptersPages[currentPage-1]?.img}`} alt="manga page" />
                }
            </div>
            <MangaPagination
                chaptersPages={chaptersPages}
                mangaInfo={mangaInfo}
                setCurrentChapter={setCurrentChapter}
                setCurrentPage={setCurrentPage}
                currentChapter={currentChapter}
                currentPage={currentPage}
                currentPagedStyle={currentPagedStyle}
                setCurrentPagedStyle={setCurrentPagedStyle}
                pageCount={pageCount}
                currentChapterIndex={currentChapterIndex}
                handleNext={handleNext}
                handlePrev={handlePrev}
            />
        </div>
    )
}

export default ReadPage