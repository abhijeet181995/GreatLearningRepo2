import Landing from "./Landing";
import University from "./University";
import Student from "./Student";
import Company from "./Company";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchId();
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="university" element={<University />} />
            <Route path="student" element={<Student />} />
            <Route path="company" element={<Company />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ common }) => {
  return { common };
};

export default connect(mapStateToProps, actions)(App);
