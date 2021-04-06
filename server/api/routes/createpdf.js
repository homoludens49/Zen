const pdf = require('html-pdf');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const nodemailer  = require('nodemailer')




const pdfTemplate1 = require('./documents/index1');
const pdfTemplate2 = require('./documents/index2');
const pdfTemplate3 = require('./documents/index3');
const pdfTemplate4 = require('./documents/index4');
const pdfTemplate5 = require('./documents/index5');

const pdfTemplate1alilo = require('./documents/index1alilo');
const pdfTemplate2alilo = require('./documents/index2alilo');
const pdfTemplate3alilo = require('./documents/index3alilo');
const pdfTemplate4alilo = require('./documents/index4alilo');
const pdfTemplate5alilo = require('./documents/index5alilo');


const sendEmail = (information) => {

    let transporter = nodemailer.createTransport({
        host: 'smartmom.shop',
        port: '465',
        auth: {
            user: 'info@smartmom.shop',
            pass: 'Log9821204'
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    
    let mailoptions = {
        from: 'info@smartmom.shop',
        to: 'sakov.p@gmail.com',
        subject: `order number ${information.orderId}`,
        text: '',
        attachments: [
            
            {   
                path: `${__dirname}/result.pdf`
            },
        ]
    }

    transporter.sendMail(mailoptions,function (err, info){
        if(err){
            console.log('Error: ', err)
        }else {
            console.log('Message sent!!!')
        }
    })

}


router.post('/create-pdf', (req, res) => {
    if(req.body.link.self[0].href.includes('alilo')){
        pdf.create(req.body.order.length===1?pdfTemplate1alilo(req.body):
               req.body.order.length===2?pdfTemplate2alilo(req.body):
               req.body.order.length===3?pdfTemplate3alilo(req.body):
               req.body.order.length===4?pdfTemplate4alilo(req.body):
               req.body.order.length===5?pdfTemplate5alilo(req.body):
               (console.log('too many items')), {}).toFile(`${__dirname}/result.pdf`, (err) => {

        if(err) {
            res.send(Promise.reject());
        }
       // sendEmail(req.body)
        res.send(Promise.resolve());
        });
    }else{
        pdf.create(req.body.order.length===1?pdfTemplate1(req.body):
               req.body.order.length===2?pdfTemplate2(req.body):
               req.body.order.length===3?pdfTemplate3(req.body):
               req.body.order.length===4?pdfTemplate4(req.body):
               req.body.order.length===5?pdfTemplate5(req.body):
               (console.log('too many items')), {}).toFile(`${__dirname}/result.pdf`, (err) => {

        if(err) {
            res.send(Promise.reject());
        }
       // sendEmail(req.body)
        res.send(Promise.resolve());
        });
    }
    
});

router.get('/fetch-pdf', (req, res) => {
 
    res.sendFile(`${__dirname}/result.pdf`)
    
})



module.exports = router