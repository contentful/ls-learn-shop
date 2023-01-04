import { useState } from "react";

import { useKeenSlider } from "keen-slider/react";
import get from "lodash/get";
import Spacing from "../../layouts/Spacing";
import ProductTile from "./ProductTile";

function Carousel(props) {
  const items = get(props, "items");
  const title = get(props, "title");
  const [slideIndex, setSlideIndex] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 1,

      breakpoints,
      slidesPerView: 3,
      slides: {
        origin: "center",
        perView: 1,
      },
      slideChanged(slider) {
        console.log("slide changed");
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      // add plugins here
    ]
  );

  return (
    <Spacing>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center">
          <h2 className="w-full text-lg font-bold">{title}</h2>
          {loaded && instanceRef && instanceRef.current && (
            <>
              <div className="flex flex-row space-x-2 ">
                <button
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                  className=" bg-blau text-white p-2 rounded-xl"
                >
                  Prev
                </button>
                <button
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                  }
                  className="bg-blau text-white p-2 rounded-xl"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        <div
          ref={sliderRef}
          className="keen-slider h-full min-h-[400px] p-10 border-2  shadow-xl bg-gray-400  overflow-hidden  "
        >
          {items.map((prd, prdx) => {
            const productImages = get(prd, "fields.images");
            const id = get(prd, "sys.id");
            const title = get(prd, "fields.internalName");

            return (
              <div
                key={`key-${id}-${prdx}`}
                className={`keen-slider__slide number-slide${
                  prdx + 1
                } lazy__slide `}
              >
                <div className="w-full  ">
                  <ProductTile
                    index={id}
                    slideIndex={slideIndex}
                    key={id}
                    {...prd}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Spacing>
  );
}

const breakpoints = {
  "(min-width: 550px)": {
    mode: "free-snap",
    slides: { perView: 2, spacing: 0 },
  },
  "(min-width: 850px)": {
    slides: { perView: 2, spacing: 0 },
    mode: "free-snap",
  },
  "(min-width: 1150px)": {
    slidesPerView: 2,
    mode: "free-snap",
  },
  "(min-width: 1350px)": {
    slides: { perView: 3, spacing: 0 },
    mode: "free-snap",
  },
  "(min-width: 1650px)": {
    slides: { perView: 3, spacing: 0 },
    mode: "free-snap",
  },
};

export default Carousel;
