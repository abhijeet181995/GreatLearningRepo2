// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Governance {
    mapping(address => address) student;
    mapping(address => address) university;
    mapping(address => address) company;
    address[] private courses;
    address[] private universities;

    function addStudent(address contractAddress) public {
        student[msg.sender] = contractAddress;
    }

    function addUniversity(address contractAddress) public {
        university[msg.sender] = contractAddress;
        universities.push(contractAddress);
    }

    function addCompany(address contractAddress) public {
        company[msg.sender] = contractAddress;
    }

    function fetchStudent() public view returns (address) {
        return student[msg.sender];
    }

    function fetchUniversity() public view returns (address) {
        return university[msg.sender];
    }

    function fetchCompany() public view returns (address) {
        return company[msg.sender];
    }

    function addCourse(address course) public {
        courses.push(course);
    }

    function getCourses() public view returns (address[] memory) {
        return courses;
    }

    function getUniversities() public view returns (address[] memory) {
        return universities;
    }
}
