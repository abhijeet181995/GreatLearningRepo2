import Header from "../component/Header";
import Footer from "../component/Footer";
import Button from "../component/Button";
import InfoBox from "../component/InfoBox";
import profile from "../images/student.logo.jpg";
import CourseAccordion from "../component/CourseAccordion";
import FilterCourseBox from "../component/FilterCourseBox";
import Body from "../component/Body";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class Student extends Component {
  componentDidMount() {
    this.props.fetchStudentDetails(this.props.common.id);
    this.props.fetchAllCourses();
  }

  render() {
    const logout = (
      <Link to="/">
        <Button outline danger>
          Logout
        </Button>
      </Link>
    );

    const name = this.props.student.name;
    const qualification = this.props.student.qualification;
    const image = this.props.student.image || profile;
    const courses = this.props.student.courses || [];

    const setImage = (value) => {
      this.props.updateStudentImage(this.props.common.id, value);
    };
    const setName = (value) => {
      this.props.updateStudentName(this.props.common.id, value);
    };
    const setHighestDegree = (value) => {
      this.props.updateStudentQulification(this.props.common.id, value);
    };

    const handleCourseSelect = (course) => {
      const studentId = this.props.common.id;
      const courseId = course.key;
      this.props.addStudentToCourse(studentId, courseId);
    };

    const handleCertificateDownload = (certificate) => {
      console.log({ certificate });
    };

    return (
      <div className="flex flex-col h-screen justify-between">
        <Header title="Student Page" action={logout} />
        <Body>
          <div className="grid grid-cols-5">
            <InfoBox
              inImage={image}
              inTitle={name}
              inSubTitle={qualification}
              onImageChange={setImage}
              onTitleChange={setName}
              onSubTitleChanged={setHighestDegree}
              className="m-2"
            />
            <div className="col-span-2 m-2">
              <CourseAccordion
                courses={courses}
                actionNeeded={({ isComplete }) => isComplete}
                actionName="Download Cerificate"
                action={handleCertificateDownload}
              />
            </div>
            <div className="col-span-2 m-2">
              <FilterCourseBox
                items={this.props.common.courses}
                onItemSelect={handleCourseSelect}
              />
            </div>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ common, student }) => {
  return { common, student };
};

export default connect(mapStateToProps, actions)(Student);
