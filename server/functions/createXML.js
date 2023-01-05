const xml2js = require("xml2js");
const fs = require("fs");
const axios = require("axios");

const createXML = async (data) => {
  let url = `https://b2b.alsolatvia.lv/DirectXML.svc/GetXMLDomainName/2/11269801`;
  let result = await axios.get(url, {
    timeout: 4000,
    responseType: "text",
    maxContentLength: 65536,
  });
  let response = result.data;
  let urlForXmlRequests = `https://${response}/scripts/XML_Interface.dll`;

  let catalogueTemplate = `<?xml version="1.0" encoding="UTF-8"?>
  <CatalogRequest>
    <Route>
      <From>
      <ClientID>11269801</ClientID>
      </From>
      <To>
        <ClientID>2</ClientID>
      </To>
    </Route>
    <Filters>
      <Filter FilterID="StockLevel" Value="OnStock" />
      <Filter FilterID="Price" Value="WOVAT" />
    </Filters>
  </CatalogRequest>`;

  encodeURIComponent(catalogueTemplate);

  let catalogueRequestUrl = `${urlForXmlRequests}?USERNAME=xmlSmart01User&PASSWORD=Sm4rTusr80xMl!&$XML="${encodeURIComponent(
    catalogueTemplate
  )}`;

  console.log(catalogueRequestUrl);

  let catalogueResult = await axios.get(catalogueRequestUrl, {
    timeout: 4000,
    responseType: "text",
    maxContentLength: 65536,
  });
  let catalogueResponse = catalogueResult.data;
  console.log(catalogueResponse);

  let id = data.id.toString();
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let poissueddate = `${year}-${month}-${day}`;

  let name1 = `${data.shipping.first_name} ${data.shipping.last_name}`;
  let name2 = data.shipping.phone;
  let address1 = data.shipping.postcode;
  let address2 = `${data.shipping.address_1}, ${data.shipping.address_2}`;

  let city = data.shipping.city;

  let country = data.shipping.country;
  let email = data.billing.email;
  let phone = data.shipping.phone;

  let alsoRouteCode = 2;

  const item = data.line_items.map(
    (i) => `<OrderLine Type="P">
    <LineNumber>1</LineNumber>
    <ProductID>${i.sku}</ProductID>
    <Quantity>
      <QtyRequested>${i.quantity}</QtyRequested>
    </Quantity>
    <WareHouseID>1</WareHouseID>
  </OrderLine>`
  );

  let template = `<?xml version="1.0" encoding="UTF-8"?>
<PurchaseOrder>
  <OrderHeader>
    <POIssuedDate>${poissueddate}</POIssuedDate>
    <PreferredShippingDate>${poissueddate}</PreferredShippingDate>
    <PartialShipmentAllowed>1</PartialShipmentAllowed>
    <OrderNumber>
      <BuyerOrderNumber>${id}</BuyerOrderNumber>
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
          <ID>${alsoRouteCode}</ID>
        </Party>
      </SupplierParty>
      <DeliveryParty>
        <Party>
          <ID>${id}</ID>
          <NameAddress>
            <Name1>${name1}</Name1>
            <Name2>${name2}</Name2>
            <Address1>${address1}</Address1>
            <Address2>${address2}</Address2>
            <City>${city}</City>
            <PostalCode>1000</PostalCode>
            <Country>${country}</Country>
          </NameAddress>
        </Party>
      </DeliveryParty>
    </OrderParties>
  </OrderHeader>
  <ListofOrderDetails>
    ${item}
  </ListofOrderDetails>
  <OrderSummary>
    <Note>${id}</Note>
    <ResellerNote>${id}</ResellerNote>
  </OrderSummary>
</PurchaseOrder>`;

  await fs.writeFile(`files/${id}.xml`, template, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

module.exports = createXML;
