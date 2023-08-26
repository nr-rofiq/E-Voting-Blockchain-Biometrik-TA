// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Voting {

    // struct Candidate {
    //     uint id;
    //     string name;
    //     uint voteCount;
    //     string details;
    //     string election_id;
    // }

    struct Candidate {
        uint id;
        string nama_capres;
        string nama_cawapres;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;

    uint public candidateCount;

    string public nama = "Yok bisa yokk";

    function addCandidate(string memory _nama_capres, string memory _nama_cawapres) public {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _nama_capres, _nama_cawapres, 0);
    }

    function getCandidate(uint _id) public view returns(uint, string memory, string memory, uint) {
        Candidate memory dataCandidate = candidates[_id];
        return (dataCandidate.id, dataCandidate.nama_capres, dataCandidate.nama_cawapres, dataCandidate.voteCount);
    }

    // struct Voter {
    //     uint id;
    //     string nama;
    //     string nik;
    //     bool isVoting;
    // }

    // mapping(uint => Candidate) public candidates;
    // mapping(address => bool) public voters;

    // uint public candidatesCount;

    // string public candidate = "I am superhero";

    // event votedEvent(
    //     uint indexed _candidateId
    // );

    // function setCandidate(string memory _candidate) public {
    //     candidate = _candidate;
    // }

    // function addCandidate(string memory _name, string memory _details, string memory _election_id) public {
    //     candidatesCount++;
    //     candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _details, _election_id);
    // }

    // function vote(uint _candidateId) public {
    //     require(!voters[msg.sender]);

    //     require(_candidateId > 0 && _candidateId <= candidatesCount);
        
    //     voters[msg.sender] = true;
        
    //     candidates[_candidateId].voteCount++;
    
    //     emit votedEvent(_candidateId);
    // }

}