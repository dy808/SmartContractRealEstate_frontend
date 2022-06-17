This simple project consists of two smart contracts&webpage (this is actually truffle react box):
Contracts Property&Property Manager; in summary these two contracts allow owner of the contract to create a unique address for each property and give this address
to the potential buyer so buyer can pay directly to this address. Once buyer has payed for the property, delivery of the property key can be triggered
by contract owner (delivery feature not yet implemented in the webpage).

Webpage offers a list of three properties with prices. The idea is that potential buyer goes to a webpage, 
selects property and then pop-up shows up with the unique property address. Once buyers transfers the amount requested to this address, 
automatic pop-up shows up saying property has been paid.

Property Manager contract has three functions:
Each function has allocated index to show where currently in the supply chain is the item.
Supply Chain Steps are emited in the events and they are: PropertyNFT_Creted, PropertyNFT_Paid and PropertyKey_Delivered.
Note:PropertyKey_Delivered is still not implemented in the FrontEnd.
createPropertyNFt and triggerdelivery function are onlyOwner (they are calling Ownable contract) which means that only contract owner can create a new
item and can trigger delivery once payment is received.
triggerpaymeny function is not having onlyOwner, anyone can pay for the property if having enough funds.

createPropertyNFt
this function creates property and as a result it gives unique address for this created property (this address is created by 'Property' contract,
receive function encodeWithSignature)
triggerpayment
this function is triggered by index 0 in the supply chain (and it allocates index 1)
It has two require statements; 
if property not fully payed (triggered if amount sent to specific property address is less than requested with create item) 
if property is already payed and in delivery stage (triggered by having index 1) or it is delievered(triggered by index 2)

triggerkeydelivery
this function is triggered if property has index 1 in the supply chain (and it allocates index 2)
if property already has index 2, require statement will show error 'the property is further in the suplly chain'