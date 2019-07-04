import React from 'react';
import Slider from "react-slick";
import LessonItem from '../lessons/LessonItem';
import CourseItem from '../courses/CourseItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ContentSlider extends React.Component {
    render() {
      const settings = {
          dots: false,
          infinite: true,
          slidesToShow: 1
        };


        return (
            <Slider {...settings}>
              {this.props.lessons? (
                this.props.lessons.map(lesson => {
                  return (
                    <LessonItem
                    key={lesson._id}
                    lesson={lesson}
                    user={this.props.user}
                    />
                  )
                })
              ) : (
                this.props.courses.map(course => {
                  return (
                    <CourseItem
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
