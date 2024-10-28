import GallerySlide from "./gallerySlide/GallerySlide";

const slides = [
    {
      key: "23",
      content: (
        <GallerySlide
          galleryImageData={{
            // title: "Workshop",
            event: {
              title: "Git-Github Workshop",
              id: "1"
            },
            date: "2024-10-23",
            url: "/images/slides/1.jpg"
          }}
        />
      )
    },
    {
      key: "231312",
      content: (
        <GallerySlide
          galleryImageData={{
            event: {
              title: "Git-Github Workshop",
              id: "1"
            },
            date: "2024-10-23",
            url: "/images/slides/2.jpg"
          }}
        />
      )
    },
    {
      key: "23141312",
      content: (
        <GallerySlide
          galleryImageData={{
            event: {
              title: "Git-Github Workshop",
              id: "1"
            },
            date: "2024-10-23",
            url: "/images/slides/3.jpg"
          }}
        />
      )
    },
    {
      key: "23141311232",
      content: (
        <GallerySlide
          galleryImageData={{
            event: {
              title: "Git-Github Workshop",
              id: "1"
            },
            date: "2024-10-23",
            url: "/images/slides/4.jpg"
          }}
        />
      )
    },
    {
      key: "231413adw12",
      content: (
        <GallerySlide
          galleryImageData={{
            event: {
              title: "Git-Github Workshop",
              id: "1"
            },
            date: "2024-10-23",
            url: "/images/slides/5.jpg"
          }}
        />
      )
    }
  ]

  export default slides;