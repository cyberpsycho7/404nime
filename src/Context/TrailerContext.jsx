import { createContext } from "react"

const TrailerContext = createContext({
    trailerSrc: "https://www.youtube.com/embed/MRvKQYxvgC4?enablejsapi=1&wmode=opaque&autoplay=1",
    setTrailerSrc: () => {},
    trailerShow: false,
    setTrailerShow: () => {},
  })

export default TrailerContext