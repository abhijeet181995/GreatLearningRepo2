// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Student {
    address private owner;
    bytes32 private name;
    bytes32 private qualification;
    string private image;
    address[] private courses;
    mapping(address => string) cerificates;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setName(bytes32 _name) public onlyOwner {
        name = _name;
    }

    function setQualification(bytes32 _qualification) public onlyOwner {
        qualification = _qualification;
    }

    function setImage(string memory _image) public onlyOwner {
        image = _image;
    }

    function addCourse(address course) public onlyOwner {
        courses.push(course);
    }

    function getName() public view returns (bytes32) {
        return name;
    }

    function getQualification() public view returns (bytes32) {
        return qualification;
    }

    function getImage() public view returns (string memory) {
        return image;
    }

    function getCourses() public view returns (address[] memory) {
        return courses;
    }

    function addCertificate(address course, string memory hash) public {
        cerificates[course] = hash;
    }

    function getCertificate(
        address course
    ) public view returns (string memory) {
        return cerificates[course];
    }
}
