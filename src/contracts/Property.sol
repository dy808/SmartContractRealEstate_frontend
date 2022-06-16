// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./property_manager.sol";

contract Property {
    uint public priceinwei;
    uint public paidwei;
    uint public index;

    property_manager parentContract;

    constructor (property_manager _parentContract, uint _priceinwei, uint _index) public {
        priceinwei=_priceinwei;
        parentContract=_parentContract;
        index=_index;

    }
    receive() external payable {
        require(msg.value==priceinwei, "we only support full payment");
        require(paidwei==0,"item is already payed");
        paidwei+=msg.value;
        (bool success,)=address(parentContract).call{value:msg.value}(abi.encodeWithSignature("triggerpayment=uint256",index));
        require(success, "key delivery did not work");

    }

    
    fallback () external {

        }
    
}