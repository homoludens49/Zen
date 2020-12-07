<template>
<body class="body-dashboard">
    
    <div class="cotainer ">
        <div class="row" v-for = "numbers in Calc" :key = "numbers._id">
            <div class="col">
                <div class="card border-info mb-3 mt-2">
                    <h6 class="card-title">Total Stock Quantity</h6>
                    <p class="card-text">{{numbers.quantity}}</p>
                </div>
            </div>
            <div class="col">
                <div class="card border-info mb-3 mt-2">
                    <h6 class="card-title">Total Stock in Cash Retail</h6>
                    <p class="card-text">EUR {{numbers.sellprice.toFixed(2)}}</p>
                </div>
            </div>
            <div class="col">
                <div class="card border-info mb-3 mt-2">
                    <h6 class="card-title">Total Stock in Cash Purchase</h6>
                    <p class="card-text">EUR {{numbers.buyprice.toFixed(2)}}</p>
                </div>
            </div>
        </div>    
        <div class="row" v-for = "numbers in Calc" :key = "numbers._id">
            <div class="col">
                <div>
                    <h6 class="card-title"></h6>
                    <p class="card-text"></p>
                </div>
            </div>
            <div class="col">
                <div class="card border-info mb-3 mt-2">
                    <h6 class="card-title">Retail Revenue without VAT</h6>
                    <p class="card-text">EUR {{numbers.revenueNoVat.toFixed(2)}}</p>
                </div>
            </div>
            <div class="col">
                <div class="card border-info mb-3 mt-2">
                    <h6 class="card-title">VAT</h6>
                    <p class="card-text">EUR {{(numbers.sellprice - numbers.revenueNoVat).toFixed(2)}}</p>
                </div>
            </div>
        </div>
       
            <div class="row" v-for = "numbersOmn in CalcOmn" :key = "numbersOmn._id">
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock Omniva</h6>
                        <p class="card-text">{{numbersOmn.quantity}}</p>
                    </div>
                </div> 
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock in Cash Retail</h6>
                        <p class="card-text">EUR {{numbersOmn.sellprice}}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock in Cash Purchase</h6>
                        <p class="card-text">EUR {{numbersOmn.buyprice.toFixed(2)}}</p>
                    </div>
                </div>
            </div>    
       
            <div class="row" v-for = "numbersMain in CalcMain" :key = "numbersMain._id">
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock Ganibu Dambis</h6>
                        <p class="card-text">{{numbersMain.quantity}}</p>
                    </div>
                </div> 
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock in Cash Retail</h6>
                        <p class="card-text">EUR {{numbersMain.sellprice}}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock in Cash Purchase</h6>
                        <p class="card-text">EUR {{numbersMain.buyprice.toFixed(2)}}</p>
                    </div>
                </div>
        </div>    
    </div>


    <table class="table table-hover">
        <thead>
            <tr>
            <th scope="col"></th>
            <th scope="col">Model Name</th>
            <th scope="col">Quantaty</th>
            <th scope="col">Warehouse</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for = "product in Products" :key = "product._id" v-bind:class="{'table-dark':true, 'table-primary':(product.quantity < 3), 'table-dark':false, 'table-danger':(product.quantity === 0), 'table-dark':false}">
                <button @click="plusOne(product)" class="badge badge-pill badge-primary mr-3 btn btn-primary">+</button>
                <button @click="minusOne(product)" class="badge badge-pill badge-primary mr-3 btn btn-default">-</button> 
            <td>{{product.model}}</td>
            <td class="tabQuantity">{{product.quantity}} </td>
            <td>{{product.warehouse}}</td>
            <td><button @click="deleteOne(product)" class="badge badge-pill badge-danger mr-3 btn btn-default">X</button></td>
            </tr>
        </tbody>
    </table> 
</body>

</template>

<script>

// HEROKU MODE
// const PRODAPI_URL ='https://smartmom-dashboard.herokuapp.com/products'
// const PRODUPDATEPLUSONEAPI_URL ='https://smartmom-dashboard.herokuapp.com/products/updatePlusOne'
// const PRODUPDATEMINUSONEAPI_URL ='https://smartmom-dashboard.herokuapp.com/products/updateMinusOne'
// const CALC_URL ='https://smartmom-dashboard.herokuapp.com/calculations/totalItems'
// const CALCOMN_URL ='https://smartmom-dashboard.herokuapp.com/calculations/totalItemsOmniva'
// const CALCMAIN_URL = 'https://smartmom-dashboard.herokuapp.com/calculations/totalItemsMain'

//DEV MODE
const PRODAPI_URL = 'http://localhost:1337/products'
const PRODUPDATEPLUSONEAPI_URL = 'http://localhost:1337/products/updatePlusOne'
const PRODUPDATEMINUSONEAPI_URL = 'http://localhost:1337/products/updateMinusOne'
const CALC_URL = 'http://localhost:1337/calculations/totalItems'
const CALCOMN_URL = 'http://localhost:1337/calculations/totalItemsOmniva'
const CALCMAIN_URL = 'http://localhost:1337/calculations/totalItemsMain'


export default {
    name: 'Dashboard',
    data: () => ({
        showMoveForm: false,
        stock: [],
        calc:[],
        calcOmn:[],
        calcMain:[],
        numbers:{
            quantity:'',
            sellprice: '',
            buyprice:'',
            revenueNoVat:''
        },
        numbersOmn:{
            quantity:'',
            sellprice: '',
            buyprice:''
        },
        numbersMain:{
            quantity:'',
            sellprice: '',
            buyprice:''
        },
        product: {
            model: '',
            quantity: ''
        },
        search: {
            search: ''
        },
        move: {
            from: '',
            to: '',
            moveId: '',
            sku: '',
            quantity: ''
        }

        
        
    }),
    computed: {
        Products(){
            return this.stock;
        },
        Calc(){
            return this.calc
        },
        CalcOmn(){
            return this.calcOmn
        },
        CalcMain(){
            return this.calcMain
        }
    },

    mounted(){
        fetch(PRODAPI_URL).then(response =>
            response.json()
        ).then(result =>{
            this.stock = result
        })
        fetch(CALC_URL).then(response =>
            response.json()
                ).then(result =>{
                  this.calc = result
        })
        fetch(CALCOMN_URL).then(responseOmn =>
            responseOmn.json()
                ).then(resultOmn =>{
                  this.calcOmn = resultOmn
        })
        fetch(CALCMAIN_URL).then(responseMain =>
            responseMain.json()
                ).then(resultMain =>{
                  this.calcMain = resultMain
        })
    },
    
    methods: {
       plusOne(product){
            fetch(PRODUPDATEPLUSONEAPI_URL, {
                method: 'POST',
                body: JSON.stringify(product),
                headers:{
                    'content-type': 'application/json'
                }
            }).then(updatePlusOne =>{
                  console.log(updatePlusOne)
        })
        },
        minusOne(product){
            fetch(PRODUPDATEMINUSONEAPI_URL, {
                method: 'POST',
                body: JSON.stringify(product),
                headers:{
                    'content-type': 'application/json'
                }
            }).then(updateMinusOne =>{
                  console.log(updateMinusOne)})
        }
        
    }
}
</script>

<style scoped>
.tabQuantity{
    display: flex;
    justify-content: space-between;
    width: 70%;
}
.tabQuantityInput{
    max-width: 40px;
    margin-left: auto;
    
}
</style>