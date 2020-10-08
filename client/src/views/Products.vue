<template>

    <div>
        <button @click="showProductForm = !showProductForm" type="button" class="btn btn-primary mt-3 mb-3">Show Form</button>
        <form v-if="showProductForm" @submit.prevent="addProduct" class="mb-3">
            <div class="form-group">
                <label for="productId">Product Id</label>
                <input v-model="product.productId" type="text" class="form-control" id="productId" placeholder="Product Id">
            </div>
            <div class="form-group">
                <label for="sku">SKU</label>
                <input v-model="product.sku" type="text" class="form-control" id="sku" placeholder="SKU">
            </div>
            <div class="form-group">
                <label for="model">Model</label>
                <input v-model="product.model" type="text" class="form-control" id="model" placeholder="Model">
            </div>
            <div class="form-group">
                <label for="brand">Brand</label>
                <input v-model="product.brand" type="text" class="form-control" id="brand" placeholder="Brand">
            </div>
            <div class="form-group">
                <label for="quantity">Quantity</label>
                <input v-model="product.quantity" type="number" class="form-control" id="quantity" placeholder="Quantity">
            </div>
            <div class="form-group">
                <label for="buyprice">Buy Price</label>
                <input v-model="product.buyprice" type="number" step="0.01" class="form-control" id="buyprice" placeholder="Buy Price">
            </div>
            <div class="form-group">
                <label for="sellprice">Sell Price</label>
                <input v-model="product.sellprice" type="number" step="0.01" class="form-control" id="sellprice" placeholder="Sell Price">
            </div>

            <button type="submit" class="btn btn-default">Submit</button>

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
//HEKORU
//const API_URL = 'https://smartmom-dashboard.herokuapp.com/products'
//DEV
const API_URL = 'http://localhost:3000/products'
export default {
    name: 'Products',
    data: () => ({
        showProductForm: false,
        products: [],
        error: '',
        product: {
            productId: '',
            sku: '',
            model: '',
            brand: '',
            quantity: '',
            buyprice: '',
            sellprice: ''
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
                await axios.post('/productUpload', formData)
            }catch(err){
                console.log(err);
            }
            
        },
        addProduct(){
            console.log(this.product)
            fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(this.product),
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
                    this.showProductForm = false;
                    this.products.push(result)
                }
            });
        }
    }
}
</script>