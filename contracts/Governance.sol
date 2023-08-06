// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Governance {
    mapping(address => address) student;
    mapping(address => address) university;
    mapping(address => address) company;

    function addstudent(address contractAddress) public {
        student[msg.sender] = contractAddress;
    }

    function adduniversity(address contractAddress) public {
        university[msg.sender] = contractAddress;
    }

    function addcompany(address contractAddress) public {
        company[msg.sender] = contractAddress;
    }
}
