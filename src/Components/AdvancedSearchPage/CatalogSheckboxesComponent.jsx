import React from 'react'

const CatalogCheckboxesComponent = ({setBoxesOpened, boxesOpened, componentHeight, mainTitle, componentArray, selectedBoxes, changeSelectedBoxes, selectedBoxesIsArray}) => {
  return (
  <div>
    <div
      className="flex justify-between pb-5 w-full items-center cursor-pointer border-b-2 border-b-white/10 mb-6 "
      onClick={() => setBoxesOpened(!boxesOpened)}
    >
      <span className="font-medium">{mainTitle}</span>
      <span>
        <svg
          className={`${
            boxesOpened ? "rotate-180" : ""
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
      style={{height: `${componentHeight}px`}}
      className={`${
        boxesOpened ? '' : "!h-0"
      } relative overflow-hidden duration-300 flex items-start flex-col gap-3`}
    >
      {componentArray?.map((item) => (
        <div
          className={`${
            selectedBoxesIsArray ?
              (selectedBoxes.includes(item) ? "text-white" : "") 
              :
              (selectedBoxes === item?.id ? "text-white" : "")
          } duration-300 flex gap-2 text-text-gray cursor-pointer`}
          onClick={()=> changeSelectedBoxes(selectedBoxesIsArray ? item : item?.id)}
        >
          <div
            className={`${
              selectedBoxesIsArray ? 
                (selectedBoxes.includes(item) ? "bg-white border-none" : "")
                :
                (selectedBoxes === item?.id) ? "bg-white border-none" : ""
            } duration-300 w-5 h-5 bg-def-black border-2 border-text-gray flex justify-center items-center rounded-[4px]`}
          >
            <svg
              className="w-4 h-4"
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
          </div>
          <span>{selectedBoxesIsArray ? item : item?.title}</span>
        </div>
      ))}
    </div>
  </div>

  )
}

export default CatalogCheckboxesComponent