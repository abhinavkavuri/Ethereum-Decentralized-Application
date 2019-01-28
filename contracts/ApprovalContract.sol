pragma solidity ^0.5.0;

contract ApprovalContract {

  address public sender;
  address payable public receiver;
  address constant public approver = 0x928a6054DB97621b7e63a50fAe07e9FA43A728fb;



  function deposit(address payable _receiver) external payable {
    require(msg.value > 0);
    sender = msg.sender;
    receiver = _receiver;
  }

  function viewApprover() external pure returns(address) {
    return(approver);
  }

  function approve() external {
    require(msg.sender == approver);
    receiver.transfer(address(this).balance);
  }

}
