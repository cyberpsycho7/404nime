import React, { useState } from 'react'

const AnimeInfoOverview = ({animeInfo, MALInfo, MALWork, show, isManga}) => {
    const [moreText, setMoreText] = useState(false)

  return (
    <div style={{display: `${show ? "flex" : "none"}`}} className=' flex 1480res:gap-12 gap-24 900res:flex-col 900res:gap-10 pr-5 1480res:pr-10 1480res:pl-5 '>
        <div className='flex flex-col flex-wrap gap-6 [&>div>div]:flex [&>div>div]:w-[340px] [&>div>div]:370res:w-full [&_span]:370res:text-sm [&_span]:w-[100px]
        [&_span]:flex-shrink-0 [&_span]:text-text-gray [&_p]:370res:text-sm [&_p]:font-light'>
            <h3 className='text-2xl font-medium 370res:text-[20px]'>Details</h3>
            <div className='flex flex-col gap-5 370res:gap-4 900res:flex-row flex-wrap'>
                <div>
                    <span>Type</span>
                    <p>{MALInfo?.type}</p>
                </div>
                <div>
                    {isManga ?
                        <>
                            <span>Chapters</span>
                            <p>{animeInfo?.chapters?.length}</p>
                        </>
                    :
                        <>
                            <span>Episodes</span>
                            <p>{animeInfo?.totalEpisodes}</p>
                        </>
                    }
                </div>
                <div>
                    <span>Genres</span>
                    <p>{animeInfo?.genres?.map((item, i) => {
                        if(i+1 === animeInfo?.genres.length) return `${item}`
                        return `${item}, `
                    })}</p>
                </div>
                <div>
                    {isManga ?
                        <>
                            <span>Published</span>
                            <p>{MALInfo?.published?.string}</p>
                        </>
                    :
                        <>
                            <span>Aired</span>
                            <p>{MALInfo?.aired?.string}</p>
                        </>
                    }
                </div>
                <div>
                    <span>Status</span>
                    <p>{!MALInfo?.status ? "?" : MALInfo?.status}</p>
                </div>
                <div>
                    <span>Season</span>
                    {isManga ?
                        <p className='first-letter:uppercase'>{animeInfo?.season ? animeInfo?.season : "?"}</p>
                    :
                        <p className='first-letter:uppercase'>{MALInfo?.season} {!MALInfo?.aired?.prop?.from?.year ? "?" : MALInfo?.aired?.prop?.from?.year}</p>
                    }
                </div>
                <div>
                    {isManga ? 
                        <>
                            <span>Authors</span>
                            <p>{MALInfo?.authors?.map((item, i) => {
                                if(i+1 === MALInfo?.authors.length) return `${item?.name}`
                                return `${item?.name} | `
                            })}</p>
                        </>
                    :
                        <>
                            <span>Studios</span>
                            <p>{MALInfo?.studios?.map((item, i) => {
                                if(i+1 === MALInfo?.studios.length) return `${item?.name}`
                                return `${item?.name}, `
                            })}</p>
                        </>
                    }
                </div>
                <div>
                    {isManga ?
                        <>
                            <span>Approved</span>
                            <p>{MALInfo?.approved ? "Yes" : "No"}</p>
                        </>
                    :
                        <>
                            <span>Source</span>
                            <p>{!MALInfo?.source ? "?" : MALInfo?.source}</p>
                        </>
                    }
                </div>
                <div className={`${isManga ? "!hidden" : ""}`}>
                    <span>Rating</span>
                    <p>{!MALInfo?.rating ? "?" : MALInfo.rating}</p>
                </div>
                <div className={`${isManga ? "!hidden" : ""}`}>
                    <span>Duration</span>
                    <p>{!MALInfo?.duration ? '?' : MALInfo?.duration}</p>
                </div>
            </div>
        </div>
        <div>
            <h3 className='text-2xl mb-6 font-medium 370res:text-[20px]'>Desription</h3>
            {/* <p className={`${moreText ? "line-clamp-none" : "900res:line-clamp-[6] line-clamp-[11]"} 400res:text-base 370res:text-sm duration-150 */}
            <p className={`400res:text-base 370res:text-sm duration-150
            text-text-gray text-lg 370res:!leading-8 !leading-9 text-justify overflow-hidden`}>{moreText ? MALInfo?.synopsis : MALInfo?.synopsis?.slice(0, 400)}</p>
            <span className={`${MALInfo?.synopsis?.length < 400 ? "hidden" : "block"} cursor-pointer`} onClick={() => setMoreText(!moreText)}>{moreText ? "Hide" : "More"}</span>
            {/* <span className={`${moreText ? "block" : "hidden"} cursor-pointer`} onClick={() => setMoreText(false)}>Hide</span> */}
        </div>
    </div>
  )
}

export default AnimeInfoOverview