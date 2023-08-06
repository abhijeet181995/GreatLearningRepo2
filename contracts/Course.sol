// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Course {
    string private instructor;
    address private university;

    string private key;
    string private name;
    string private description;
    address[] private students;

    int32 private startDate;
    int32 private endDate;
    int32 private totalMarks;

    bool private isComplete;

    modifier onlyOwner() {
        require(msg.sender == university);
        _;
    }

    constructor(
        string memory _instructor,
        string memory _key,
        string memory _name,
        string memory _description,
        int32 _startDate,
        int32 _endDate,
        int32 _totalMarks
    ) {
        instructor = _instructor;
        key = _key;
        name = _name;
        description = _description;
        startDate = _startDate;
        endDate = _endDate;
        totalMarks = _totalMarks;
        isComplete = false;
        university = msg.sender;
    }

    function addStudent() public onlyOwner {
        students.push(msg.sender);
    }
}
