// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Student {
    address private owner;
    string private name;
    string private qualification;
    string private image;
    address[] private courses;

    constructor() {
        owner = msg.sender;
    }
 
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setName(string memory _name) public onlyOwner {
        name = _name;
    }

    function setQualification(string memory _qualification) public onlyOwner {
        qualification = _qualification;
    }

    function setImage(string memory _image) public onlyOwner {
        image = _image;
    }

    function addCourse(address course) public onlyOwner {
        courses.push(course);
    }
}
