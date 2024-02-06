import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AnimeCard = ({info, type}) => {
  const [characterTitle, setCharacterTitle] = useState(info?.name?.full)
  const [characterImage, setCharacterImage] = useState(info?.image)
  const [characterRole, setCharacterRole] = useState(info?.role)

  return (
    <Link to={`/more-info/${info?.id ? info?.id : info?.animeId}`} className={`${type === "character" ? "" : ''}`}
      onClick={(e) => {
        if(type === "character") e.preventDefault()
      }}
      title={type === "character" ? (info?.voiceActors === undefined ? ("") : (`${info?.voiceActors[0]?.name?.native}`))
      :
      `${(info?.title?.english ? info?.title?.english : info?.title?.romaji)} ${info?.genres ? `| ${info?.genres}` : ""} ${info?.releaseDate ? `| ${info?.releaseDate}` : ""}`}
      onMouseEnter={(e) => {
        if(info?.voiceActors === undefined || info?.voiceActors.length < 1 || type !== "character") return
        setCharacterTitle(info?.voiceActors[0].name?.full)
        setCharacterImage(info?.voiceActors[0].image)
        setCharacterRole(info?.voiceActors[0].language)
      }}
      onMouseLeave={(e) => {
        if(info?.voiceActors === undefined || info?.voiceActors.length < 1 || type !== "character") return
        setCharacterTitle(info?.name?.full)
        setCharacterImage(info?.image)
        setCharacterRole(info?.role)
      }
    }>
      <div
        style={{ backgroundImage: type === "character" ? `url(${characterImage})` : `url(${info?.image})`, backgroundColor: info?.color }}
        className={`duration-200 cursor-pointer p-3 500res:p-2 700res:w-[133px] 700res:h-[196px] 500res:w-[102px] 500res:h-[150px] w-[190px] h-[280px] rounded-xl bg-center bg-cover bg-no-repeat
        relative -z-10`}
      >
        <div className="bg-gradient-to-t from-black/70 from-0% to-transparent to-60% absolute top-0 left-0 w-full h-full rounded-xl -z-10"></div>
        <div className="w-full h-full flex flex-col justify-end items-start text-[14px] 700res:text-[11px] 500res:text-[8px] text-white/80 gap-[5px]">
          <span className="line-clamp-1 overflow-hidden text-[15px] 700res:text-[12px] 500res:text-[10px] text-white">
            {type === "character" ? characterTitle : (info?.title?.english ? info?.title?.english : info?.title?.romaji)}
          </span>
          <span>
            {type === "relation" ? (
              <>
                <span className="capitalize">
                  {info?.relationType?.replace("_", " ").toLowerCase()}
                </span>
                <p>{info?.type?.replace("_", " ")}</p>
              </>
            ) : (
              ""
            )}
            {type === "recomm" ? (
              <p>
                {info?.type.replace("_", " ")}, {info?.episodes} episodes
              </p>
            ) : (
              ""
            )}
            {type === "manga" ? (
              <p>
                {info?.type.replace("_", " ")} {info?.chapters ? `, ${info?.chapters} ${info?.chapters.length == 1 ? "chapter" : "chapters"}` : ""} 
              </p>
            ) : (
              ""
            )}
            {type === "anime" ? (
              <p>
                {info?.releaseDate ? info?.releaseDate+", " : ""} {info?.genres[0]}
              </p>
            ) : (
              ""
            )}
            {type === "character" ? (
              <p className="capitalize">{characterRole}</p>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard