const xml2js = require("xml2js");
const fs = require("fs");

let data = {
  order: [
    {
      Name: "Ronaldo",
    },
  ],
};

const createXML = async (data) => {
  console.log(data);

  const id = data.id.toString();
  const poissueddate = new Date();
  const name1 = "Smartmom SIA";
  const address1 = data.shipping.address_1;
  const address2 =
    data.shipping.first_name && data.shipping.last_name && data.shipping.phone;
  const city = data.shipping.city;
  const postalcode = data.shipping.postcode;
  const country = data.shipping.country;
  const email = data.billing.email;
  const phone = data.shipping.phone;

  let template = `<?xml version="1.0" encoding="UTF-8"?>
<PurchaseOrder>
  <OrderHeader>
    <POIssuedDate>${poissueddate}</POIssuedDate>
    <PreferredShippingDate>${poissueddate + 1}</PreferredShippingDate>
    <PartialShipmentAllowed>1</PartialShipmentAllowed>
    <OrderNumber>
      <BuyerOrderNumber>4000098926</BuyerOrderNumber>
    </OrderNumber>
    <Transport>
      <Carrier>OI</Carrier>
      <DeliveryDeadline>0</DeliveryDeadline>
    </Transport>
    <OrderParties>
      <BuyerParty>
        <Party>
          <ID>11269801</ID>
        </Party>
      </BuyerParty>
      <SupplierParty>
        <Party>
          <ID>{ALSO_ROUTE_CODE}</ID>
        </Party>
      </SupplierParty>
      <DeliveryParty>
        <Party>
          <ID>${id}</ID>
          <NameAddress>
            <Name1>${name1}</Name1>
            <Address1>${address1}</Address1>
            <Address2>${address2}</Address2>
            <City>${city}</City>
            <PostalCode>${postalcode}</PostalCode>
            <Country>${country}</Country>
	        <EMail>${email}</Email>
            <Contact>
            	<Phone>${phone}</Phone>
            </Contact>
          </NameAddress>
        </Party>
      </DeliveryParty>
      <EndUserParty>
        <Party>
          <Reference>${id}</Reference>
          <NameAddress>
            <Name1>Example Bank, A/S</Name1>
            <Address2>Liliju 29</Address2>
            <City>Marupe</City>
            <PostalCode>1299</PostalCode>
            <Country>LV</Country>
          </NameAddress>
          <Contact>
            <Name>Janis Berzins</Name>
            <Phone>+37144433322</Phone>
            <EMail>janis.berzins@example.lv</EMail>
          </Contact>
        </Party>
      </EndUserParty>
    </OrderParties>
  </OrderHeader>
  <ListofOrderDetails>
    <OrderLine Type="P">
      <LineNumber>1</LineNumber>
      <ProductID>2088349</ProductID>
      <PartNumber>S26381-K511-L402</PartNumber>
      <Quantity>
        <QtyRequested>20</QtyRequested>
      </Quantity>
      <WareHouseID>1</WareHouseID>
      <BIDNumber>90597874-036</BIDNumber>
      <BIDName>SOME COMPANY, INC.</BIDName>
    </OrderLine>
  </ListofOrderDetails>
  <OrderSummary>
    <Note>4000098926</Note>
    <ResellerNote>4000098926</ResellerNote>
  </OrderSummary>
</PurchaseOrder>`;

  const builder = new xml2js.Builder();
  const xml = builder.buildObject(template);

  fs.writeFile(`files/${id}.xml`, template, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

console.log(createXML);

module.exports = createXML;
