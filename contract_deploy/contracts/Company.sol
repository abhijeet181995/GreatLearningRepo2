// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Company {
    address private owner;
    bytes32 private name;
    bytes32 private place;
    string private image;
    address[] private universities;

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

    function setName(bytes32 _name) public onlyOwner {
        name = _name;
    }

    function getPlace() public view returns (bytes32) {
        return place;
    }

    function setPlace(bytes32 _place) public onlyOwner {
        place = _place;
    }

    function getImage() public view returns (string memory) {
        return image;
    }

    function setImage(string memory _image) public onlyOwner {
        image = _image;
    }

    function getUniversities() public view returns (address[] memory) {
        return universities;
    }

    function addUniversity(address university) public onlyOwner {
        universities.push(university);
    }

    function removeUniversity(uint index) public {
        universities[index] = universities[universities.length - 1];
        universities.pop();
    }
}
