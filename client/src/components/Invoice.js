import React, {useState, useEffect} from 'react'
import Moment from 'moment';
import axios from 'axios';
import { saveAs } from 'file-saver';

class Invoice extends React.Component {

   
    render =() => {
        
        const createAndDownloadPdf = (state) => {
            
             axios.post('/createpdf/create-pdf', state)
               .then(() => axios.get('/createpdf/fetch-pdf', { responseType: 'blob' }))
               .then((res) => {
                 const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
     
                 saveAs(pdfBlob, 'newPdf.pdf');
               })
           }

        const {order} = this.props.location.state  
        
        const item = order.map(i=>
            (<tr key={i.id}>
               <td>{i.name}</td>
               <td>{i.quantity}</td>
               <td>{(i.price/1.21).toFixed(2)}</td>
               <td>{(i.price-(i.price/1.21)).toFixed(2)}</td>
               <td>{i.price.toFixed(2)}</td>
                <td>{i.price.toFixed(2)*i.quantity}</td>
              
            </tr>
            ))

        const shippingNoVat = (this.props.location.state.orderShippingAmount/1.21).toFixed(2)
        const shippingVat = (this.props.location.state.orderShippingAmount-this.props.location.state.orderShippingAmount/1.21).toFixed(2)
        const shipping = (
        <tr>
            <td>Piegade:</td>
            <td>1</td>
            <td>€ {shippingNoVat}</td>
            <td>€ {shippingVat}</td>
            <td>€ {this.props.location.state.orderShippingAmount.toFixed(2)}</td>
        </tr>)

        const total = Number(this.props.location.state.total)
        const summaArVardiem = function(total){

        }

        return (
            
        <div className='invoice-container'>
            <button onClick={(e)=>createAndDownloadPdf(this.props.location.state)}>Create PDF</button>
            <p>Rēķins / Pavadzīme Nr. {this.props.location.state.orderId}</p>
            <br></br>
            <p>Pasutijuma Datums:  {Moment(this.props.location.state.orderDate).format('DD-MMMM-YYYY')}</p>
            <br></br>
            <div className='rekviziti'>
                <p> Piegādātājs:   Sia "SmartMom"   <br/>     				
                    Faktiska adrese / Juridiskā adrese:	<br/> 			
                    AS "SEB banka", Bankas kods: UNLALV2X,	<br/> 			
                    AS “Swedbank", Bankas kods: HABALV22,	<br/> 			
                    Tālr. +37122044652, +37125410262	<br/> 			
                    E-Pasts: smartmominfo@gmail.com		<br/> 		
                </p>
                <p>
                PVN Reģistrācijas Nr. LV40203072022 <br/> 
                Dambja iela 3A, Rīga, LV-1005<br/> 
                Konta Nr.: LV83UNLA0055000114035<br/> 
                Konta Nr.: LV23HABA0551043798886<br/> 
                </p>
            </div>
            <br></br>
            <div className='clienta-rekviziti'>
                <p> Preču saņēmējs:    <br/>     				
                    Piegādes adrese:  	<br/> 			
                    Tālr.:<br/> 			
                    E-pasts:<br/> 			
                    Piezimes<br/> 					
                </p>
                <p>
                {this.props.location.state.name} <br/> 
                {this.props.location.state.addressShipping}<br/> 
                {this.props.location.state.phone}<br/> 
                {this.props.location.state.email}<br/>  
                {this.props.location.state.customerNote}<br/>  
                {console.log(this.props.location.state)}
                </p>
            </div>
            <br/>
            <div className='invoice-table'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nosaukums</th>
                            <th>Daudzums gab.</th>
                            <th>Cena bez PVN, EUR</th>
                            <th>PVN 21%</th>
                            <th>Cena ar PVN, EUR</th>
                            <th>Summa ar PVN, EUR</th>
                        </tr>
                    </thead>
                    <tbody>{item}</tbody>
                    <tbody>{shipping}</tbody>
                </table>
                </div>
                <div className="summa-table">
                            <p>
                            Kopā bez PVN:<br/>
                            PVN 21%(LV):<br/>
                            Kopā: <br/>
                            Summa ar vārdiem:<br/>
                            </p>
                            <p>
                            € {(Number(this.props.location.state.total)/1.21).toFixed(2)}<br/> 
                            € {(Number(this.props.location.state.total)-(Number(this.props.location.state.total)/1.21)).toFixed(2)}<br/> 
                            € {Number(this.props.location.state.total)}<br/>  
                            {summaArVardiem}<br/>  
                            </p>
                </div>
                <br></br>
                <div>
                    <h3>RĒĶINS SAGATAVOTS ELEKTRONISKI UN IR DERĪGS BEZ PARAKSTA</h3>
                </div>
                
        </div>
    



        )
        
    }
}

export default Invoice