// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateIssuer {
    address public owner;
    uint256 totalInstitutes;
    
    struct Certificate {
        uint256 courseId;
        string courseName;
        uint256 issueDate;
 //       uint256 certificateId;
    }

    struct Course {
        string courseName;
        uint256 courseFee;
        address[] registeredStudents;
        mapping(address => bool) isStudentRegistered;
        uint256 courseId;
    }

    struct Institute {
        string name;
        uint256 totalCourses;
        mapping(uint256 => Course) courses;
        uint256 instituteId;
    }

    mapping(address => Institute) public institutes;
    mapping(address => mapping(uint256 => Certificate)) public studentCertificates;

    event InstituteAdded(address indexed instituteAddress, string name, uint256 instituteId);
    event CourseAdded(address indexed instituteAddress, uint256 indexed courseId, string courseName);
    event StudentRegistered(address indexed studentAddress, address indexed instituteAddress, uint256 indexed courseId);
    event CertificateIssued(address indexed studentAddress, uint256 indexed courseId, string courseName, uint256 issueDate);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addInstitute( string memory name)  public payable{
        require(institutes[msg.sender].instituteId == 0, "Institute already exists");
        institutes[msg.sender].name = name;
        institutes[msg.sender].instituteId = ++totalInstitutes;
        emit InstituteAdded(msg.sender, name, totalInstitutes);
    }

    function addCourse(
        string memory courseName,
        uint256 courseFee
    )  public payable {
        require(institutes[msg.sender].instituteId != 0, "Institute not registered");
        require(institutes[msg.sender].totalCourses < 256, "Max courses reached for the institute");

        uint256 courseId = institutes[msg.sender].totalCourses;
        institutes[msg.sender].courses[courseId].courseName = courseName;
        institutes[msg.sender].courses[courseId].courseFee = courseFee;
        institutes[msg.sender].courses[courseId].courseId = courseId;
        institutes[msg.sender].totalCourses++;

        emit CourseAdded(msg.sender, courseId, courseName);
    }

    function registerForCourse(address instituteAddress, uint256 courseId) public payable {
        Course storage course = institutes[instituteAddress].courses[courseId];
        require(msg.value >= course.courseFee, "Insufficient course fee");
        require(!course.isStudentRegistered[msg.sender], "Already registered for the course");

        course.registeredStudents.push(msg.sender);
        course.isStudentRegistered[msg.sender] = true;

        emit StudentRegistered(msg.sender, instituteAddress, courseId);
    }

    function issueCertificate(address studentAddress, uint256 courseId) public payable {
        require(institutes[msg.sender].courses[courseId].isStudentRegistered[studentAddress], "Student not registered for the course");
        require(studentCertificates[studentAddress][courseId].issueDate == 0, "Certificate already issued");

        string memory courseName = institutes[msg.sender].courses[courseId].courseName;
        uint256 issueDate = block.timestamp; 

        studentCertificates[studentAddress][courseId] = Certificate(courseId, courseName, issueDate);

        emit CertificateIssued(studentAddress, courseId, courseName, issueDate);
    }

    function getStudentCertificate(address studentAddress, uint256 courseId) public view returns (Certificate memory) {
        return studentCertificates[studentAddress][courseId];
    }

    function getInstituteCourses(address instituteAddress) public view returns (string[] memory) {
        uint256 totalCourses = institutes[instituteAddress].totalCourses;
        string[] memory courses = new string[](totalCourses);
        for (uint256 i = 0; i < totalCourses; i++) {
            courses[i] = institutes[instituteAddress].courses[i].courseName;
        }
        return courses;
    } 
}
