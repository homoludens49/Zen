<template>
  <body>
    <button @click="showMoveForm = !showMoveForm" type="button" class="btn btn-primary mt-3 mb-3">Show Form</button>
    <form v-if = "showMoveForm" @submit.prevent="moveBetweenWarehouses" action="submit">
          <div class="form-group">
            <div class="form-group">
                <select class="custom-select" id="fromInput">
                <option selected="">From...</option>
                <option value="Omniva">Omniva</option>
                <option value="Ganibu Dambis">Ganibu Dambis</option>
                <option value="Jana Dikmana">Jana Dikmana</option>
                </select>
            </div>
            <div class="form-group">
                <select class="custom-select" id="toInput">
                <option selected="">To...</option>
                <option value="Omniva">Omniva</option>
                <option value="Ganibu Dambis">Ganibu Dambis</option>
                <option value="Jana Dikmana">Jana Dikmana</option>
                </select>
            </div>
          </div>
           <button type="submit" class="btn btn-primary">Move</button>
      </form>
    <table class="table table-hover">
       <thead>
          <tr>
            <th scope="col">Model Name</th>
            <th scope="col">Warehouse</th>
            <th scope="col">Move</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key = "product._id">
            <td>{{product.model}}</td>
            <td>{{product.warehouse}}</td>
            <td><input class="tabQuantityInput" type="text"></td>
          </tr>
        </tbody>
     
    
    </table>
    
      
  </body>
</template>

<script>
const PRODAPI_URL = 'http://localhost:3000/products'
export default {
  data: () => ({
    products:[],
    showMoveForm: false
  }),
  mounted(){
    fetch(PRODAPI_URL).then(response =>
            response.json()
        ).then(result =>{
            this.products = result
        })
  },
  methods: {
    moveBetweenWarehouses(){
            const fromInput =  document.getElementById('fromInput').value 
            const toInput =  document.getElementById('toInput').value
            let newMove = {
              fromInput: fromInput,
              toInput: toInput,

            }
            console.log(newMove)
            const inputs = document.querySelectorAll('.tabQuantityInput')
            const iArray = Array.from(inputs)
            var moveArray = []
            var index = []
            for(let i = 0;i<iArray.length;i++){
              
              if(iArray[i].value > 0){
                index.push(i)
                moveArray.push(iArray[i])
              }
             
            }
            console.log(index)
            console.log(moveArray)
            
        }
}
}

</script>

<style>

</style>