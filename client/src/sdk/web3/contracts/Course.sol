// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Course {
    bytes32 private instructor;
    address private university;

    bytes32 private name;
    bytes32 private description;
    address[] private students;

    uint private startDate;
    uint private endDate;
    uint private totalMarks;

    bool private isComplete;

    constructor(
        bytes32 _instructor,
        bytes32 _name,
        bytes32 _description,
        uint _startDate,
        uint _endDate,
        uint _totalMarks,
        address _university
    ) {
        instructor = _instructor;
        name = _name;
        description = _description;
        startDate = _startDate;
        endDate = _endDate;
        totalMarks = _totalMarks;

        isComplete = false;
        university = _university;
    }

    function addStudent(address _student) public {
        students.push(_student);
    }

    function getInstructor() public view returns (bytes32) {
        return instructor;
    }

    function getUniversity() public view returns (address) {
        return university;
    }

    function getName() public view returns (bytes32) {
        return name;
    }

    function getDescription() public view returns (bytes32) {
        return description;
    }

    function getStudents() public view returns (address[] memory) {
        return students;
    }

    function getStartDate() public view returns (uint) {
        return startDate;
    }

    function getEndDate() public view returns (uint) {
        return endDate;
    }

    function getTotalMarks() public view returns (uint) {
        return totalMarks;
    }

    function getIsComplete() public view returns (bool) {
        return isComplete;
    }

    function setIsComplete() public {
        isComplete = true;
    }

    function setInComplete() public {
        isComplete = false;
    }
}
