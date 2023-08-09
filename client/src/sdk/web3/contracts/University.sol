// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract University {
    address private owner;
    bytes32 private name;
    bytes32 private place;
    string private image;
    address[] private courses;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function getName() public view returns (bytes32) {
        return name;
    }

    function setName(bytes32 _name) public {
        name = _name;
    }

    function getPlace() public view returns (bytes32) {
        return place;
    }

    function setPlace(bytes32 _place) public {
        place = _place;
    }

    function getImage() public view returns (string memory) {
        return image;
    }

    function setImage(string memory _image) public {
        image = _image;
    }

    function createCourse(address course) public {
        courses.push(course);
    }

    function getCourses() public view returns (address[] memory) {
        return courses;
    }
}
