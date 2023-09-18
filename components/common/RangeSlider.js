import { useState, useEffect, useRef } from "react";

const RangeSlider = ({ initialMin, initialMax, min, max, step, priceCap, sendMax, sendMin }) => {
  // const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);
  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
        sendMin(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
        sendMin(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
        sendMax(parseInt(e.target.value))
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
        sendMax(parseInt(e.target.value))
      }
    }
  };

  // useEffect(() => {
  //   progressRef.current.style.left = (minValue / max) * step + "%";
  //   progressRef.current.style.right = step - (maxValue / max) * step + "%";
  // }, [minValue, maxValue, max, step]);

  return (
    <div className="min-h-screen place-items-center bg-green-300">
      <div className="w-96 bg-white shadow-xl rounded-lg px-6 py-4">
        <div className="flex justify-between items-center my-6">
          <div className="rangeslideprice">
            <span className="font-semibold"> {minValue}</span>
            {/* <input
              onChange={(e) => setMinValue(e.target.value)}
              type="number"
              value={minValue}
              className="w-24 rounded-md border border-gray-400"
            /> */}
          </div>
          <div className="ml-2 font-semibold text-lg"> - </div>
          <div className="rangeslideprice">
            <span className="font-semibold"> {maxValue}</span>
            {/* <input
              onChange={(e) => setMaxValue(e.target.value)} type="number" value={maxValue}
              className="w-24 rounded-md border border-gray-400"
            /> */}
          </div>
        </div>

        <div className="filter-price-area mb-0">

          {/* <div class="slider-bar">
            <div class="selected"></div>
            <span class="slider-bar-selector min" id="priceMin"></span>
            <span class="slider-bar-selector max" id="priceMax"></span>
            <div ng-transclude></div>
          </div> */}

          {/* <div className="slider relative h-0 rounded-md bg-gray-300">
            <div
              className="progress absolute h-0 bg-green-300 rounded "
              ref={progressRef}
            ></div>
          </div> */}

          <div className="filter-price">
            <div className="price-field">
                <input
                  onChange={handleMin}
                  type="range"
                  min={min}
                  step={step}
                  max={max}
                  value={minValue}
                />
                <input
                  onChange={handleMax}
                  type="range"
                  min={min}
                  step={step}
                  max={max}
                  value={maxValue}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
