import React from 'react';

const PrevArrow = (props) => {
  const { currentSlide, slideCount, ...filteredProps } = props;

  return (
    <button {...filteredProps}>&larr;</button>
  );
};

const NextArrow = (props) => {
  const { currentSlide, slideCount, ...filteredProps } = props;

  return (
    <button {...filteredProps}>&rarr;</button>
  );
};

const sliderSettings = {
  dots: false,
  draggable: true,
  infinite: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  mobileFirst: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 4,
      },
    },

    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
      },
    },

    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
      },
    },

    {
      breakpoint: 460,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '50px',
        arrows: false,
        infinite: true,
      },
    },
  ],
};

export default sliderSettings;
