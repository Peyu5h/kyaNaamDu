// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ComplaintSystem {
    enum ComplaintStatus { Pending, ReviewInProgress, Declined, Resolved }

    struct Complaint {
        uint256 id;
        string title;
        string description;
        string location;
        string proofIpfsHash;
        ComplaintStatus status;
        address sender;
        address governanceAuthority;
        string actionTaken;
    }

    mapping(uint256 => Complaint) public complaints;
    uint256 public complaintCount;

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized as contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addGovernanceAuthority(address _authority) external onlyOwner {
        complaintsAuthority[_authority] = true;
    }

    function submitComplaint(
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _proofIpfsHash
    ) external returns (uint256) {
        uint256 complaintId = complaintCount++;
        Complaint storage newComplaint = complaints[complaintId];
        newComplaint.id = complaintId;
        newComplaint.title = _title;
        newComplaint.description = _description;
        newComplaint.location = _location;
        newComplaint.proofIpfsHash = _proofIpfsHash;
        newComplaint.status = ComplaintStatus.ReviewInProgress;
        newComplaint.sender = msg.sender;

        emit ComplaintSubmitted(complaintId, msg.sender, _title);
        return complaintId;
    }

    function declineComplaint(uint256 _complaintId) external {
        Complaint storage currentComplaint = complaints[_complaintId];
        require(complaintsAuthority[msg.sender], "Not authorized to decline");
        require(currentComplaint.status == ComplaintStatus.ReviewInProgress, "Complaint not in review state");

        currentComplaint.status = ComplaintStatus.Declined;
        currentComplaint.governanceAuthority = msg.sender;

        emit ComplaintReviewed(_complaintId, currentComplaint.status, "Complaint declined");
    }

    function takeAction(uint256 _complaintId, string memory _criminal, string memory _actionTaken) external {
        Complaint storage currentComplaint = complaints[_complaintId];
        require(complaintsAuthority[msg.sender], "Not authorized to take action");
        require(currentComplaint.status == ComplaintStatus.ReviewInProgress, "Complaint not in review state");

        currentComplaint.status = ComplaintStatus.Resolved;
        currentComplaint.governanceAuthority = msg.sender;
        currentComplaint.actionTaken = string(abi.encodePacked("Criminal: ", _criminal, ", Action Taken: ", _actionTaken));

        emit ComplaintReviewed(_complaintId, currentComplaint.status, currentComplaint.actionTaken);
    }

    function getComplaint(uint256 _complaintId) external view returns (Complaint memory) {
        return complaints[_complaintId];
    }

    function getAllComplaints() external view returns (Complaint[] memory) {
        Complaint[] memory allComplaints = new Complaint[](complaintCount);
        for (uint256 i = 0; i < complaintCount; i++) {
            allComplaints[i] = complaints[i];
        }
        return allComplaints;
    }

    event ComplaintSubmitted(uint256 indexed complaintId, address indexed sender, string title);
    event ComplaintReviewed(uint256 indexed complaintId, ComplaintStatus status, string actionTaken);

    mapping(address => bool) public complaintsAuthority;
}
