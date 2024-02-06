import React from 'react'

const MangaPagination = ({handleNext, handlePrev, setCurrentChapterIndex, currentChapterIndex, currentPagedStyle, setCurrentPagedStyle, chaptersPages, mangaInfo, currentPage, setCurrentPage}) => {
  return (
    <div className='w-full flex justify-between items-center flex-wrap gap-5'>
        <div className='flex items-center gap-5'>
            <span className='relative'>
                <select
                    name="chapter"
                    className="bg-white/25 text-white p-2 outline-none rounded-sm appearance-none pr-[22px]
                    [&>option]:bg-white [&>option]:text-text-gray cursor-pointer"
                    value={currentChapterIndex}
                    onChange={(e) => {
                        setCurrentChapterIndex(Number(e.target.value));
                    }}
                >
                    {mangaInfo?.chapters?.map((item, i) => (
                        <option key={item?.id} value={i}>
                            Chapter {item?.chapterNumber}
                        </option>
                    ))}
                    
                </select>
                <span className='absolute right-[5px] top-1/2 -translate-y-1/2 '>
                    <svg className='w-[12px]' xmlns="http://www.w3.org/2000/svg" version="1.0" width="16.000000pt" height="16.000000pt" viewBox="0 0 16.000000 16.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                            <path d="M47 132 c-15 -16 -24 -31 -20 -35 8 -9 98 -9 106 0 7 6 -41 63 -53 63 -3 0 -18 -13 -33 -28z" fill='#888'/>
                            <path d="M26 62 c-3 -5 8 -22 24 -37 l30 -29 30 29 c16 15 27 32 24 37 -3 4 -27 8 -54 8 -27 0 -51 -4 -54 -8z" fill='#888'/>
                        </g>
                    </svg>
                </span>
            </span>
            <span className='relative'>
                <select
                    name="chapter"
                    className="bg-white/25 text-white p-2 outline-none rounded-sm appearance-none pr-[22px]
                    [&>option]:bg-white [&>option]:text-text-gray cursor-pointer"
                    value={currentPagedStyle}
                    onChange={(e) => {
                        setCurrentPagedStyle(e.target.value)
                    }}
                >
                    <option value="paged">Paged style</option>
                    <option value="list">List style</option>
                </select>
                <span className='absolute right-[5px] top-1/2 -translate-y-1/2 '>
                    <svg className='w-[12px]' xmlns="http://www.w3.org/2000/svg" version="1.0" width="16.000000pt" height="16.000000pt" viewBox="0 0 16.000000 16.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                            <path d="M47 132 c-15 -16 -24 -31 -20 -35 8 -9 98 -9 106 0 7 6 -41 63 -53 63 -3 0 -18 -13 -33 -28z" fill='#888'/>
                            <path d="M26 62 c-3 -5 8 -22 24 -37 l30 -29 30 29 c16 15 27 32 24 37 -3 4 -27 8 -54 8 -27 0 -51 -4 -54 -8z" fill='#888'/>
                        </g>
                    </svg>
                </span>
            </span>
        </div>
        <div className='flex gap-4 items-center'>
            <span className={`${currentPagedStyle === "list" ? "hidden" : ""} relative`}>
                <select
                    name="page"
                    className="bg-white/25 text-white p-2 outline-none rounded-sm appearance-none pr-[22px]
                    [&>option]:bg-white [&>option]:text-text-gray cursor-pointer"
                    value={currentPage} 
                    onChange={(e) => {
                        setCurrentPage(Number(e.target.value));
                    }}
                >
                    {chaptersPages?.map((item) => (
                        <option value={item?.page}>
                            {item?.page} / {chaptersPages?.length}
                        </option>
                    ))}
                </select>
                <span className='absolute right-[5px] top-1/2 -translate-y-1/2 '>
                    <svg className='w-[12px]' xmlns="http://www.w3.org/2000/svg" version="1.0" width="16.000000pt" height="16.000000pt" viewBox="0 0 16.000000 16.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                            <path d="M47 132 c-15 -16 -24 -31 -20 -35 8 -9 98 -9 106 0 7 6 -41 63 -53 63 -3 0 -18 -13 -33 -28z" fill='#888'/>
                            <path d="M26 62 c-3 -5 8 -22 24 -37 l30 -29 30 29 c16 15 27 32 24 37 -3 4 -27 8 -54 8 -27 0 -51 -4 -54 -8z" fill='#888'/>
                        </g>
                    </svg>
                </span>
            </span>
            <div className='flex gap-2 items-center'>
                <a href='#img'
                    className='btn-base 600res:!p-2 bg-white text-def-gray flex items-center gap-1 !rounded-md !pr-[14px] !pl-[10px] !py-[12px] cursor-pointer'
                    onClick={handlePrev}
                >
                    <span>
                        <svg
                            className={`rotate-90 w-4 h-4`}
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
                                fill="black"
                            />
                        </svg>
                    </span>
                    <span>Prev</span>
                </a>
                <a href='#img'
                    className='btn-base 600res:!p-2 bg-white text-def-gray flex items-center gap-1 !rounded-md !pl-[14px] !pr-[10px] !py-[12px] cursor-pointer'
                    onClick={handleNext}    
                >
                    <span>Next</span>
                    <span>
                        <svg
                            className={`-rotate-90 w-4 h-4`}
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
                                fill="black"
                            />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    </div>
  )
}

export default MangaPagination