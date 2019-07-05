import React from 'react';
import Slider from "react-slick";
import LessonSliderItem from './LessonSliderItem';
import CourseSliderItem from './CourseSliderItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ContentSlider extends React.Component {
    render() {
      const settings = {
          dots: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1
        };


        return (
            <Slider {...settings}>
              {this.props.lessons? (
                this.props.lessons.map(lesson => {
                  return (
                      <LessonSliderItem
                      key={lesson._id}
                      lesson={lesson}
                      user={this.props.user}
                      />
                  )
                })
              ) : (
                this.props.courses.map(course => {
                  return (
                    <CourseSliderItem
                    key={course._id}
                    course={course}
                    user={this.props.user}
                    />
                  )
                })
              )}
            </Slider>
        );
    }
}

export default ContentSlider
