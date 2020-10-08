<template>

    <div>
        
        <button @click="showOrderForm = !showOrderForm" type="button" class="btn btn-primary mt-3 mb-3">Show Form</button>
        <form v-if="showOrderForm" @submit.prevent="addOrder" class="mb-3">
            <div class="form-group">
                <label for="orderId">Order Id</label>
                <input v-model="order.orderId" type="text" class="form-control" id="orderId" placeholder="Order Id">
            </div>
            <div class="form-group">
                <label for="sku">SKU</label>
                <input v-model="order.sku" type="text" class="form-control" id="sku" placeholder="SKU">
            </div>
            <div class="form-group">
                <label for="quant">Quant</label>
                <input v-model="order.quantity" type="number" class="form-control" id="quant" placeholder="quantaty">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          

        </form>
        <form @submit.prevent="sendFile" enctype="multipart/form-data" class="mb-3">
            <div class="form-group">
                <label for="file">File input</label>
                <input type="file" ref="file" @change="selectFile" />
            </div>
            <div class="field">
                <button class="button is-info">Send</button>

            </div>
        </form>
    </div>
    
</template>
<script>
import axios from 'axios'
// HEROKU 
//const API_URL = 'https://smartmom-dashboard.herokuapp.com/orders/'
//DEV
const API_URL = 'http://localhost:3000/orders/'
export default {
    name: 'Orders',
    data: () => ({
        showOrderForm: false,
        orders: [],
        error: '',
        file: "",
        order: {
            orderId: '',
            sku: '',
            quantity: ''
            
        }



    }),
    methods: {
        selectFile(){
            this.file = this.$refs.file.files[0];
            console.log(this.file)
        },
        async sendFile(){
            const formData = new FormData();
            formData.append('file', this.file)
            try{
                await axios.post('/orderUpload', formData)
            }catch(err){
                console.log(err);
            }
            
        },
       
        
      
        addOrder(){
            console.log(this.order)
            fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(this.order),
                headers:{
                    'content-type': 'application/json'
                }
            }).then(response => response.json())
            .then(result =>{
                if(result.details){
                    //there was an error
                    const error = result.details.map(detail => detail.message).join('. ');
                    this.error = error;

                }else{
                    //there was no error
                    this.error = '';
                    this.showOrderForm = false;
                    this.orders.push(result)
                }
            });
        }
    }
}
</script>