import React, { useContext, useEffect, useRef, useState } from 'react'
import MainBanner from '../Components/MainPage/MainBanner'
import SwiperComponent from '../Components/Other/SwiperComponent'
import axios from 'axios'
import PreloaderComponent from "../Components/Other/PreloaderComponent"
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import ErrorPage from './ErrorPage'
import UserContext from '../Context/UserContext'


const MainPage = ({currentWidth}) => {
  const [errorObj, setErrorObj] = useState(null)
  const [fetchError, setFetchError] = useState(false)
  const [finishedRequestCount, setFinishedRequestCount] = useState(0)
  const [isLoaded, setIsloaded] = useState(true)
  const [clearConfirm, setClearConfirm] = useState(false)
  const [preloader, setPreloader] = useState(true)
  const [popular, setPopular] = useState(null)
  const [bestScore, setBestScore] = useState(null)
  const [upcoming, setUpcoming] = useState(null)
  const [trendingNow, setTrendingNow] = useState(null)
  const [animeHistory, setAnimeHistory] = useState([])
  const [swiper, setSwiper] = useState(null)

  const {user} = useContext(UserContext)

  const bannerItems = useRef([
    {
      id: 127230,
      title: "Chainsaw Man",
      posterImg: "https://ik.imagekit.io/subanime/chainsawmanPoster.jpg",
      src: "https://ik.imagekit.io/subanime/chainsawmanTrailer.mp4",
      description: "Denji has a simple dream - to live happy and peacful life, spending time with a girl",
      rating: "R - 17+",
      trailerSrc: "https://www.youtube.com/embed/q15CRdE5Bv0?enablejsapi=1&wmode=opaque&autoplay=1"
    },
    {
      id: 158927,
      title: "SPY×FAMILY Season 2",
      posterImg: "https://ik.imagekit.io/subanime/spyxfamalyPoster.jpg",
      src: "https://ik.imagekit.io/subanime/spyxfamilyTrailer",
      description: "Second season of Spy x Family.",
      rating: "PG-13",
      trailerSrc: "https://www.youtube.com/embed/75LyKY6AV4U?enablejsapi=1&wmode=opaque&autoplay=1"

    },
    {
      id: 145064,
      title: "Jujutsu Kaisen 2nd Season",
      posterImg: "https://ik.imagekit.io/subanime/jujutsukaisenPoster2",
      src: "https://ik.imagekit.io/subanime/jujutsukaisenTrailer?updatedAt=1696862420071",
      description: "The Shibuya Incident Arc depicts how curse spirits Mahito, Jogo, and Geto conducted several plans throughout Shibuya to catch Gojo Satoru and his allies off-guard. These plans included unleashing screens throughout the city to weaken his fellow sorcerers. It also includes distracting both Tokyo and Kyoto Jujutsu High students with intense showdowns. Their goal: to see to the eternal imprisonment of Gojo Satoru.",
      rating: "R - 17+",
      trailerSrc: "https://www.youtube.com/embed/PKHQuQF1S8k?enablejsapi=1&wmode=opaque&autoplay=1"
    },
    {
      id: 147103,
      title: "Watashi no Shiawase na Kekkon",
      posterImg: "https://ik.imagekit.io/subanime/myhappymarriagePoster?updatedAt=1696864851180",
      src: "https://ik.imagekit.io/subanime/myhappymarriageTrailer.webm?updatedAt=1696864632812",
      description: "Misery seems everlasting in Miyo Saimori's life. Born into an arranged marriage, she was quickly discarded after her mother's tragic death. Her father remarried, and her younger half-sister Kaya received all the affection, while Miyo was degraded to a lowly servant. Lacking the strength to fight against her family's abuse, Miyo loses hope that her luck will ever turn. Unexpectedly, Miyo's father summons her to deliver surprising news: she is to marry Kiyoka Kudou, the head of the distinguished Kudou family. Despite his noble background, Kiyoka is known to be a callous man who has thus far dismissed all of his former fiancées. Upon arriving at the Kudou household, Miyo expects coarse treatment and to be tossed aside. However, contrary to her assumptions, Kiyoka shows her the kindness and love that she has desperately needed. Marrying Kiyoka may be Miyo's one chance to break free from her neglectful family and embrace a life of happiness. [Written by MAL Rewrite]",
      rating: "PG-13",
      trailerSrc: "https://www.youtube.com/embed/dURh9kVzcw8?enablejsapi=1&wmode=opaque&autoplay=1"
    },
  ])

  const setItems = (set, res) => {
    set(res.data.results)
    setFinishedRequestCount(prev => prev+1)
  }

  const setError = (e) => {
    setFetchError(true)
    setErrorObj(e)
    setPreloader(false)
    console.log(e);
  }

  const clearHistory = () => {
    //FIXME NADO SDELAT UDALENIE VSEI ISTORII
  }
    
  useEffect(() => {
    if(finishedRequestCount >= 4) {
      setIsloaded(false)
      setTimeout(() => {
        setPreloader(false)
      }, 300)
    }
  }, [finishedRequestCount])
    
  useEffect(() => {
    document.title = "404NIME - Anime Online"
    setFetchError(false)
    setIsloaded(true)
    setPreloader(true)

    axios.get(`https://march-api1.vercel.app/meta/anilist/trending?perPage=20`)
    .then(res => setItems(setTrendingNow, res))
    .catch(e => setError(e))

    axios.get(`https://march-api1.vercel.app/meta/anilist/popular?perPage=20`)
    .then(res => setItems(setPopular, res))
    .catch(e => setError(e))

    axios.get(`https://march-api1.vercel.app/meta/anilist/advanced-search?sort=["POPULARITY_DESC"]&status=NOT_YET_RELEASED&perPage=20`)
    .then(res => setItems(setUpcoming, res))
    .catch(e => setError(e))

    axios.get(`https://march-api1.vercel.app/meta/anilist/advanced-search?sort=["SCORE_DESC"]&perPage=20`)
    .then(res => setItems(setBestScore, res))
    .catch(e => setError(e))
  }, [])

  useEffect(() => {
    if(!user?.isValid) return
    axios.get(`https://four04nime.onrender.com/users/${user?._id}/anime-history`)
    .then(res => setAnimeHistory(res.data))
    .catch(e => console.log(e))
  }, [user])

  if(preloader) return <PreloaderComponent isLoaded={isLoaded}/>
  if(fetchError) return <ErrorPage errorObj={errorObj}/>
  return (
    <div className="animate-fadeInAnimate fill-mode-forward opacity-0 flex flex-col items-center">
      <div className="w-full -mt-[90px] relative">
        <div
          className="450res:p-1 450res:bottom-0 450res:right-16 370res:-bottom-20 700res:z-20 1650res:hidden 700res:block 700res:rounded-lg 700res:top-auto 700res:left-auto 700res:h-max 700res:right-24 700res:-bottom-2 700res:py-3 hover:bg-black/10 hover:backdrop-blur-sm duration-300 cursor-pointer z-10 absolute top-1/2 -translate-y-1/2 left-0 px-5 flex items-center justify-center h-full"
          onClick={() => swiper?.slidePrev(500)}
        >
          <svg
            className={`rotate-90 w-8 h-8`}
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
        </div>
        <div
          className="450res:p-1 450res:bottom-0 hover:bg-black/10 700res:right-4 700res:z-20 370res:-bottom-20 700res:rounded-lg 700res:top-auto 700res:h-max 700res:-bottom-2 700res:py-3 hover:backdrop-blur-sm duration-300 cursor-pointer z-10 absolute top-1/2 -translate-y-1/2 right-0 px-5 flex items-center justify-center h-full"
          onClick={() => swiper?.slideNext(500)}
        >
          <svg
            className={`-rotate-90 w-8 h-8`}
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
        </div>
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          slidesPerGroup={1}
          fadeEffect={true}
          loop={true}
          autoplay={false}
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
        >
          {bannerItems.current?.map((item) => (
            <SwiperSlide key={item?.id}>
              <MainBanner
                posterImg={item?.posterImg}
                animeId={item?.id}
                title={item?.title}
                description={item?.description}
                rating={item?.rating}
                trailerSrc={item?.trailerSrc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col w-def 1480res:w-full 1480res:!mx-5 z-10">
        <div className="">
          <h3 className="w-max text-2xl 1480res:px-[28px] px-2 font-medium mb-5 500res:mb-3 -mt-24 900res:-mt-20 700res:mt-20 500res:mt-16">
            Trending now
          </h3>
          {trendingNow ? (
            <SwiperComponent
              currentWidth={currentWidth}
              items={trendingNow}
              type={"anime"}
            />
          ) : null}

          {animeHistory?.length > 0 ? (
            <>
              <div className="flex justify-between items-center 1480res:px-[28px] px-2 500res:mb-3 500res:mt-16 mb-5 mt-20">
                <h3 className="text-2xl font-medium">Continue watch</h3>
                <div className="flex gap-2">
                  {!clearConfirm ? (
                    <button
                      className="w-max btn-base bg-white text-def-black gap-1 600res:text-sm 450res:text-xs 450res:p-[8px]"
                      onClick={() => {
                        setClearConfirm(true);
                      }}
                    >
                      Clear history
                    </button>
                  ) : (
                    <>
                      <button
                        className="w-max btn-base bg-red-500 text-white gap-1 600res:text-sm 450res:text-xs 450res:p-[8px]"
                        onClick={() => {
                          setAnimeHistory(null);
                          clearHistory()
                        }}
                      >
                        Clear history
                      </button>
                      <button
                        className="w-max btn-base bg-def-gray text-white gap-1 600res:text-sm 450res:text-xs 450res:p-[8px]"
                        onClick={() => {
                          setClearConfirm(false);
                        }}
                      >
                        Back
                      </button>
                    </>
                  )}
                </div>
              </div>
              <SwiperComponent
                currentWidth={currentWidth}
                items={animeHistory}
                type={"animeLonger"}
              />
            </>
          ) : null}

          <h3 className="text-2xl 1480res:px-[28px] px-2 font-medium 500res:mb-3 500res:mt-16 mb-5 mt-20">
            Most Popular
          </h3>
          {popular ? (
            <SwiperComponent
              currentWidth={currentWidth}
              items={popular}
              type={"anime"}
            />
          ) : null}

          <h3 className="text-2xl 1480res:px-[28px] px-2 font-medium 500res:mb-3 500res:mt-16 mb-5 mt-20">
            Best Score
          </h3>
          {bestScore ? (
            <SwiperComponent
              currentWidth={currentWidth}
              items={bestScore}
              type={"anime"}
            />
          ) : null}
        </div>
        <div className="">
          <h3 className="text-2xl 1480res:px-[28px] px-2 font-medium 500res:mb-3 500res:mt-16 mb-5 mt-20">
            Coming soon
          </h3>
          {upcoming ? (
            <SwiperComponent
              currentWidth={currentWidth}
              items={upcoming}
              type={"animeLonger"}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MainPage