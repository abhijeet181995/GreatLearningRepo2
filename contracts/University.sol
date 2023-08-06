// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract University {
    address private owner;
    string private name;
    string private place;
    string private image;
    address[] private courses;
 
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor(string memory _name, string memory _place, string memory _image) {
        name = _name;
        place = _place;
        image = _image;
        owner = msg.sender;
    }

    function setName(string memory _name) public onlyOwner {
        name = _name;
    }

    function setPlace(string memory _place) public onlyOwner {
        place = _place;
    }

    function setImage(string memory _image) public onlyOwner {
        image = _image;
    }

    function createCourse(address course) public onlyOwner {
        courses.push(course);
    }
}
