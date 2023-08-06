import { Component } from "react";
import Button from "../component/Button";
import CourseAccordion from "../component/CourseAccordion";
import CourseForm from "../component/CourseForm";
import Footer from "../component/Footer";
import Header from "../component/Header";
import InfoBox from "../component/InfoBox";
import universityLogo from "../images/university.logo.png";
import Body from "../component/Body";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import { generateRandomKey } from "../util/key";

class University extends Component {
  componentDidMount() {
    this.props.fetchUniversity(this.props.common.id);
  }

  render() {
    const logout = (
      <Link to="/">
        <Button outline danger>
          Logout
        </Button>
      </Link>
    );

    let courses = this.props.university.courses || [];
    const image = this.props.university.image || universityLogo;
    const name = this.props.university.name;
    const place = this.props.university.place;

    const handleNewCourse = async (course) => {
      course.university = this.props.common.id;
      course.key = generateRandomKey();
      course.students = [];
      this.props.addNewCourse(course);
    };

    const handleImageChange = (image) => {
      this.props.setUniversityImage(this.props.common.id, image);
    };

    const handleNameChange = (name) => {
      this.props.setUniversityName(this.props.common.id, name);
    };

    const handlePlaceChange = (place) => {
      this.props.setUniversityPlace(this.props.common.id, place);
    };

    const handleCourseComplete = ({ key }) => {
      this.props.markCourseComplete(key, this.props.common.id);
    };

    return (
      <div className="flex flex-col h-screen justify-between">
        <Header title="University Page" action={logout} />
        <Body>
          <div className="grid grid-cols-5 m-2">
            <InfoBox
              inImage={image}
              inTitle={name}
              inSubTitle={place}
              onImageChange={handleImageChange}
              onTitleChange={handleNameChange}
              onSubTitleChanged={handlePlaceChange}
              className="m-2"
            />
            <div className="col-span-2 m-2">
              <CourseAccordion
                courses={courses}
                actionNeeded={(course) => !course.isComplete}
                action={handleCourseComplete}
                actionName="Mark as Complete"
              />
            </div>
            <div className="col-span-2 m-2">
              <CourseForm onSubmit={handleNewCourse} />
            </div>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ university, common }) => {
  return { university, common };
};

export default connect(mapStateToProps, actions)(University);
