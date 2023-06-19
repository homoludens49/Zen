const xml2js = require("xml2js");
const fs = require("fs");
const axios = require("axios");
const querystring = require('node:querystring')
const nodemailer = require("nodemailer");

const sendErrorEmail = (id, information) => {

  let transporter = nodemailer.createTransport({
    host: "smartmom.shop",
    port: "465",
    auth: {
      user: "info@smartmom.shop",
      pass: "Log9821204",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailoptions = {
    from: "info@smartmom.shop",
    to: "sakov.p@gmail.com",
    bcc: "sakov.p@gmail.com",
    subject: `Processing error occured in  ${id} `,
    text: `Error occured: ${information[0]}`,
  };

  transporter.sendMail(mailoptions, function (err, info) {
    if (err) {
      console.log("Error: ", err);
    } else {
      
      console.log("Error Message sent to me!");
    }
  });
};




const createXML = async (data) => {

  let errorList = []



  let id = data.id.toString();
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let poissueddate = `${year}-${month}-${day}`;
  let name1 = `${data.shipping.first_name} ${data.shipping.last_name}`;
  let name2 = data.billing.phone;
  let address1 = data.shipping.postcode;
  let address2 = `${data.shipping.address_1}, ${data.shipping.address_2}`;
  let city = data.shipping.city;
  let country = data.shipping.country;
  let email = data.billing.email
  let alsoRouteCode = 2;

  const getPartnumber = (sku) => {
    let partnumber = 0

    sku === "0799439610583"? partnumber = "10334990" 
    : sku === "0799439610552" ? partnumber = "10334989" 
    : sku === "0799439610521" ? partnumber = "10334988" 
    : sku === "0703625107139" ? partnumber = "10334987" 
    : sku === "0703625107115" ? partnumber = "10334986" 
    : sku === "0703625107092" ? partnumber = "10334985" 
    : sku === "0703625107825" ? partnumber = "10334984" 
    : sku === "0703625107849" ? partnumber = "10334983" 
    : sku === "0703625107153" ? partnumber = "10334982" 
    : sku === "0703625108952" ? partnumber = "10334981" 
    : sku === "0703625108136" ? partnumber = "10334980" 
    : sku === "0703625108013" ? partnumber = "10334979" 
    : sku === "0703625108938" ? partnumber = "10334978" 
    : sku === "0703625108730" ? partnumber = "10334977" 
    : sku === "0794712495086" ? partnumber = "10334976" 
    : sku === "0635292894459" ? partnumber = "10334975" 
    : sku === "0635292894428" ? partnumber = "10334974" 
    : sku === "635292894398" ? partnumber = "10334973" 
    : sku === "635292893858" ? partnumber = "10334972" 
    : sku === "0635292893766" ? partnumber = "10334971" 
    : sku === "0635292893674" ? partnumber = "10334970" 
    : sku === "0703625108891" ? partnumber = "10334969" 
    : sku === "0703625108914" ? partnumber = "10334968" 
    : sku === "0703625108716" ? partnumber = "10334967" 
    : sku === "6954644609300" ? partnumber = "10334966" 
    : sku === "6954644609287" ? partnumber = "10334965" 
    : sku === "6954644600147" ? partnumber = "10334964" 
    : sku === "6954644609065" ? partnumber = "10334963" 
    : sku === "6954644609089" ? partnumber = "10334962" 
    : sku === "6954644609072" ? partnumber = "10334961" 
    : sku === "6954644609058" ? partnumber = "10334960" 
    : sku === "6954644600895" ? partnumber = "10334939" 
    : sku === "6954644600888" ? partnumber = "10334938" 
    : sku === "6954644600901" ? partnumber = "10334937" 
    : sku === "6934644600871" ? partnumber = "10334936" 
    : sku === "6954644600291" ? partnumber = "10334935" 
    : sku === "6954644609638" ? partnumber = "10334934"
    : sku === "LD4400" ? partnumber = "10336190" 
    : sku === "LD7013" ? partnumber = "10336183" 
    : sku === "LD7065" ? partnumber = "10336180" 
    : sku === "LD4401" ? partnumber = "10336180" 
    : sku === "LD4412" ? partnumber = "10336179" 
    : sku === "LD7026" ? partnumber = "10336178" 
    : sku === "LD7035" ? partnumber = "10336169" 
    : sku === "LD4413" ? partnumber = "10336168" 
    : sku === "LD7025" ? partnumber = "10336167" 
    : sku === "LD4750" ? partnumber = "10336166" 
    : sku === "LD4484" ? partnumber = "10336158" 
    : sku === "LD4494" ? partnumber = "10336157" 
    : sku === "LD7012" ? partnumber = "10336148" 
    : sku === "LD4468" ? partnumber = "10336147"
    : sku === "LD4461" ? partnumber = "10336146" 
    : sku === "LD4434" ? partnumber = "10336145" 
    : sku === "LD4469" ? partnumber = "10336144"
    : sku === "LD4482" ? partnumber = "10336143" 
    : sku === "6954644609300" ? partnumber = "10334966" 
    : sku === "6954644609300LV" ? partnumber = "10337945" 
    : sku === "6954644609287LV" ? partnumber = "10337944"
    : sku === "6954644609287" ? partnumber = "10334965" 
    : errorList.push(`Item with sku ${sku} if not specified in also list`)

    return partnumber
}


  const item = data.line_items.map(
    (i) => `<OrderLine Type="P">
      <LineNumber>1</LineNumber>
      <ProductID>${getPartnumber(i.sku)}</ProductID>
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
            <EMail>${email}</EMail>
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



let url = process.env.AURL;
  let result = await axios.get(url, {
    timeout: 4000,
    responseType: "text",
    maxContentLength: 65536,
  });
  let response = result.data;
  let urlForXmlRequests = `https://${response}/scripts/XML_Interface.dll`;


  if (errorList.length === 0 ){
    let orderResult =  await axios.post(urlForXmlRequests,

      querystring.stringify({
  
              username: process.env.AU, 
  
              password: process.env.AP,
  
              XML: template
  
      }), {
  
        headers: {
  
          "Content-Type": "application/x-www-form-urlencoded"
  
        }
  
      }).then(function(response) {
        if(response.status === 200){
          let responseIdandData = {
            id: data.id,
            response: response.status,
            responseData: response.data
  
          }
          console.log(responseIdandData)
          //sendEmail(responseIdandData);
        }
          ;
  
      });
  }else{
    sendErrorEmail(data.id , errorList)
  }

  console.log(`Order ${id} was succesfully sent to ALSO`)


  await fs.writeFile(`files/${id}.xml`, template, function (err) {
    if (err) throw err;
    console.log("Xml file Saved!");
  });


};






module.exports = createXML;