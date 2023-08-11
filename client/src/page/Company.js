import React, { Component } from "react";
import Button from "../component/Button";
import Footer from "../component/Footer";
import Header from "../component/Header";
import InfoBox from "../component/InfoBox";
import SelectionBox from "../component/SelectionBox";
import PaginatedList from "../component/PaginatedList";
import logo from "../images/company.logo.png";
import universities from "../data/universities.json";
import { renderUniversityFn } from "../util/university";
import Body from "../component/Body";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import InputBox from "../component/InputBox";
import { FcApproval, FcCancel, FcRefresh } from "react-icons/fc";

class Company extends Component {
  constructor(props) {
    super(props);
    this.elRef = React.createRef();
  }
  componentDidMount() {
    this.props.fetchCompanyDetails(this.props.common.id);
    this.props.fetchAllUniversities();
  }

  render() {
    const logout = (
      <Link to="/">
        <Button outline danger>
          Logout
        </Button>
      </Link>
    );

    const image = this.props.company.image || logo;
    const name = this.props.company.name;
    const place = this.props.company.place;
    const allowedUniversities = this.props.company.allowedUniversities || [];
    const universityList = this.props.common.universities || universities;

    const setName = (name) => {
      this.props.setCompanyName(this.props.common.id, name);
    };
    const setPlace = (place) => {
      this.props.setCompanyPlace(this.props.common.id, place);
    };
    const setImage = (image) => {
      this.props.setCompanyImage(this.props.common.id, image);
    };
    const addUniversity = (university) => {
      this.props.addAllowedUniversity(this.props.common.id, university);
    };
    const removeUniversity = (university) => {
      this.props.removeAllowedUniversity(this.props.common.id, university);
    };
    const setCertificateHash = (hash) => {
      this.props.setHash(hash);
      this.props.setStatus(undefined);
    };
    const validateCertificate = () => {
      this.props.validateCertificate(this.props.common.hash);
    };

    const fetchStatus =
      !this.props ||
      !this.props.common ||
      this.props.common.isValid === undefined ? (
        <FcRefresh />
      ) : this.props.common.isValid ? (
        <FcApproval />
      ) : (
        <FcCancel />
      );

    return (
      <div className="flex flex-col h-screen justify-between">
        <Header title="Company Page" action={logout} />
        <Body>
          <div className="grid grid-cols-5">
            <InfoBox
              inImage={image}
              inTitle={name}
              inSubTitle={place}
              onImageChange={setImage}
              onTitleChange={setName}
              onSubTitleChanged={setPlace}
              className="m-2"
            />
            <div className="col-span-2 m-2">
              <SelectionBox
                itemList={universityList}
                onSelect={addUniversity}
              />
              <PaginatedList
                items={allowedUniversities}
                size={5}
                className=""
                renderItemFn={renderUniversityFn("Remove", removeUniversity)}
              />
            </div>
            <div className="col-span-2 m-2">
              <div className="flex w-full  justify-between">
                <InputBox
                  value={this.props.common.hash}
                  setValue={setCertificateHash}
                />
                <div className="p-4 text-xl">
                  {this.props.common.hash && fetchStatus}
                </div>
              </div>
              <Button success className="m-auto" onClick={validateCertificate}>
                Validate Certificate
              </Button>
            </div>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ common, company }) => {
  return { common, company };
};

export default connect(mapStateToProps, actions)(Company);
