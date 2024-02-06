import React from 'react'

const CatologYearSelectComponent = ({setYearOpened, yearOpened, setYearValue, changeYear, yearValue}) => {
  return (
    <div>
    <div
      className="flex justify-between py-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 "
      onClick={() => setYearOpened(!yearOpened)}
    >
      <span className="font-medium">Year</span>
      <span>
        <svg
          className={`${
            yearOpened ? "rotate-180" : ""
          } w-5 h-5 duration-300`}
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
    <div
      className={`${
        yearOpened ? "h-[74px]" : "h-0"
      } relative overflow-hidden duration-300 flex gap-3 items-start`}
    >
      <span className="h-[44px] flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2V3H9V2C9 1.44772 8.55228 1 8 1C7.44772 1 7 1.44772 7 2V3H5C3.34315 3 2 4.34315 2 6V20C2 21.6569 3.34315 23 5 23H19C20.6569 23 22 21.6569 22 20V6C22 4.34315 20.6569 3 19 3H17V2ZM20 9V6C20 5.44772 19.5523 5 19 5H17V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6V5H9V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V5H5C4.44772 5 4 5.44772 4 6V9H20ZM4 11H20V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11Z"
            fill="white"
          />
        </svg>
      </span>
      <input
        className="outline-none border-2 focus:border-white/80 border-white/30
        bg-def-black appearance-none w-[110px] px-3 py-2 rounded-xl"
        value={yearValue}
        type="number"
        min="1960"
        max="2026"
        maxLength="4"
        step="1"
        placeholder="1960-2026"
        onChange={(e) => {
          setYearValue(e.target.value);
          changeYear(e.target.value, e.target.validity.valid);
        }}
      />
    </div>
  </div>
)
}

export default CatologYearSelectComponent