// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Ownable.sol";
import "./Property.sol";

contract property_manager is Ownable {
    

    struct S_property {
        Property _property;
        property_manager.Steps _step;
        string _identifier;
        
    }
    mapping(uint => S_property) public properties;
    uint index;
    enum Steps {PropertyNFT_Created,PropertyNFT_Paid,PropertyKey_Delivered}
    event Step (uint _Propertyindex, uint _step, address _address);

    function createPropertyNFt(string memory _identifier, uint _priceinwei) public onlyOwner {
        Property property=new Property (this, _priceinwei, index);
        properties[index]._property=property;
        properties[index]._step=Steps.PropertyNFT_Created;
        properties[index]._identifier=_identifier;

        emit Step(index, uint(properties[index]._step), address(property));
        index++;
    }
    function triggerpayment(uint _index) public payable {
            Property property=properties[_index]._property;
            require(property.priceinwei() == msg.value, "not fully paid");
            require(properties[_index]._step==Steps.PropertyNFT_Created, "the property is further in the suplly chain");
            properties[_index]._step=Steps.PropertyNFT_Paid;
            emit Step(_index, uint(properties[_index]._step), address(property));
    }

    function triggerkeydelivery(uint _index) public onlyOwner {
    require(properties[_index]._step==Steps.PropertyNFT_Paid, "the property is further in the suplly chain");
    properties[_index]._step=Steps.PropertyKey_Delivered;
    emit Step(_index, uint(properties[_index]._step),address(properties[_index]._property));
    }
    

}