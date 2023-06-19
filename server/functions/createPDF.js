const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");

const puppeteerCreatePdf = async (data) => {

 
  const sendEmail = (information) => {
    let transporter = nodemailer.createTransport({
      host: "smartmom.shop",
      port: "465",
      auth: {
        user: process.env.IM,
        pass: process.env.IMP,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailoptions = {
      from: process.env.IM,
      to: information.shipping.email,
      bcc: process.env.MM,
      subject: `Elektroniska pavadzime pasutijumam ${information.id} no Smartmom.shop`,
      text: "Labdien, \nPaldies ka pasūtījāt no Smartmom.shop! Jūsu pirkums tiks piegadāts 2 - 4 darba dienu laikā. Pielikumā ir elektroniskā pavadzīme. \nAr cieņu, Jūsu Smartmom.shop",
      attachments: [
        {
          path: `E:/CodeProjects/Zen/server/files/${information.id}.pdf`,
        },
      ],
    };

    transporter.sendMail(mailoptions, function (err, info) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log("Message sent!!!");
      }
    });
  };





  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const today = new Date();

  const item = data.line_items.map(
    (i) => `<tr key=${i.id}>
             <td>${i.name}</td>
             <td>${i.quantity}</td>
             <td>${(i.price / 1.21).toFixed(2)}</td>
             <td>${(i.price - i.price / 1.21).toFixed(2)}</td>
             <td>${i.price}</td>
              <td>${(i.price * i.quantity).toFixed(2)}</td>
          </tr>`
  );
  await page.setContent(
    `<html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             width: 100%
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 26px;
             line-height: 36px;
             color: #333;
             }
             .invoice-box table tr.top table td.image {
              font-size: 50px;
              text-align: left;
              line-height: 50px;
              color: #333;
              }
             .invoice-box table tr.top table td.title2 {
              border-bottom: 1px solid #ddd;
              text-align: left;
              font-size: 16px;
              line-height: 20px;
              color: #333;
     
              }
             .invoice-box table tr.information table td {
             padding-bottom: 10px;
           
             }
             .invoice-box table tr.information table td.td1 {
              font-size: 12px;
  
              }
             .invoice-box table tr.heading td {
             background: #eee;
             font-size: 12px;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             border-right: 1px solid white;
             }
             .invoice-box table tr.heading td:nth-child(3) {
              width:45px;
              }
              .invoice-box table tr.heading td:nth-child(4) {
                width:45px;
                }
                .invoice-box table tr.heading td:nth-child(5) {
                  width:45px;
                  }
                  .invoice-box table tr.heading td:nth-child(6) {
                    width:45px;
                    }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             font-size: 14px;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"> 
                              Rēķins / Pavadzīme Nr. ${data.id}
                           </td>
                           <td class="image"><img  src="https://smartmom.shop/wp-content/uploads/2020/11/smartmomlogo_fin.png"
                               style="width:70%; max-width:126px;max-hight:126px; margin-left:230px;">
                           </td>
                         </tr>
                         <tr> 
                       <td class="title2">
                         Pasutijuma Datums: ${`${today.getDate()}. ${
                           today.getMonth() + 1
                         }. ${today.getFullYear()}.`}
                       </td>
                       </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                        <tr>
                            <td class='td1'>
                            Piegādātājs:Sia "SmartMom" PVN Reģistrācijas Nr. LV40203072022<br/>     				
                            Faktiska adrese / Juridiskā adrese:	Dambja iela 3A, Rīga, LV-1005<br/>	
                            AS "SEB banka", Bankas kods: UNLALV2X, Konta Nr.: LV83UNLA0055000114035<br/> 			
                            AS “Swedbank", Bankas kods: HABALV22,	Konta Nr.: LV23HABA0551043798886<br/> 			
                            Tālr. +37122044652, +37125410262	<br/> 			
                            E-Pasts: smartmominfo@gmail.com		<br/> 		
                            </td>
                        </tr>
                         <tr>
                            <td>
                              Preču saņēmējs:   <strong>${
                                data.billing.first_name
                              } ${data.billing.last_name}</strong><br/>			
                              Piegādes adrese:  <strong>${
                                data.shipping.address_1
                              }</strong> <br/>		
                              Tālr.: <strong>${
                                data.shipping.phone
                              } </strong><br/>
                              E-pasts: <strong>${
                                data.billing.email
                              } </strong><br/> 
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Prece</td>
                   <td>Daudzums gab.</td>
                   <td>Cena bez PVN</td>
                   <td> PVN 21% </td>
                   <td>Cena ar PVN</td>
                   <td>Summa ar PVN</td>
                </tr>
                ${item}
                <tr class="item">
                   <td>Piegade</td>
                   <td>1</td>
                   <td>€ ${(data.shipping_lines[0].total / 1.21).toFixed(
                     2
                   )}</td>
                   <td>€ ${(
                     data.shipping_lines[0].total -
                     data.shipping_lines[0].total / 1.21
                   ).toFixed(2)}</td>
                   <td>€ ${data.shipping_lines[0].total}</td>
                </tr>
                <br />
                <br />
             
                <tr class="total">
                   <td><strong>Kopā bez PVN: € ${(
                     Number(data.total) / 1.21
                   ).toFixed(2)}</strong></td>
                </tr>
                <tr class="total">
                   <td><strong>PVN 21%(LV): € ${(
                     Number(data.total) -
                     Number(data.total) / 1.21
                   ).toFixed(2)}</strong></td>
                </tr>
                <tr class="total">
                   <td><strong>Kopā:  € ${Number(data.total)}</strong></td>
                </tr>
             </table>
             <br />
             <br />
             <br />
             
             <h5>RĒĶINS SAGATAVOTS ELEKTRONISKI UN IR DERĪGS BEZ PARAKSTA</h5>
          </div>
       </body>
    </html>`
  );

  await page.pdf({
    path: `files/${data.id}.pdf`,
    format: "A4",
    printBackground: true,
  });
  await console.log(`Creating PDF for ${data.id}`);

  await browser.close();

  sendEmail(data)
};

module.exports = puppeteerCreatePdf;
