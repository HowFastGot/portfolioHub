import noUiSlider from 'nouislider';
import "../libs/wNumb.js";

const uiSliderNo = function (filterSelector, rangeInputMinSelector, rangeInputMaxSelector) {
    try {
        const priceFilter = document.querySelector(filterSelector);
        const rangeInputMin = document.querySelector(rangeInputMinSelector),
              rangeInputMax = document.querySelector(rangeInputMaxSelector);

       const sliderUI = noUiSlider.create(priceFilter, {
            start: [0, 10000],
            connect: true,
            tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})], //подключили библиотеку wNumb
            range: {
                'min': [0],
                'max': [10000],
            },
        });
        rangeInputMin.addEventListener('change', function () {
            priceFilter.noUiSlider.set(parseInt(rangeInputMin.value));
        });

        rangeInputMax.addEventListener('change', function () {
            priceFilter.noUiSlider.set([parseInt(rangeInputMin.value), parseInt(rangeInputMax.value)]);
            if (rangeInputMin.value === "") {
                priceFilter.noUiSlider.set([0, parseInt(rangeInputMax.value)]);
            }
        });
        priceFilter.noUiSlider.on('update', function (values, handle) {
            if (handle) {
                rangeInputMax.value = Math.round(values[handle]);
            } else {
                rangeInputMin.value = Math.round(values[handle]);
            }
        });
    } catch (e) {
        console.log(`Ошибка в модуле "noUIslider: ${e.message}`);
    }
};

export default uiSliderNo;