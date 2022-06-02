<template>
  <div class="container">
    <div class="title">Register</div>
    <form @submit.prevent="Register">
   <img src="../assets/logo.png" alt="Logo" width="100">
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" placeholder="Email address" required>
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" placeholder="password" required>
    <button type="submit">Register</button>
    </form>
    <router-link to="/login"> Already have an account ? Login! </router-link>
  </div>
</template>

<script>
import { register } from '../api/auth'
export default {
created(){
     
   },
   data() {
     return {
       email:'',
       password:''
     }
   },
   methods: {
     Register(){
        const payload = {
          email:this.email,
          password:this.password
        }
      register(payload).then((res)=>{
        this.$notify({
            title: "Success",
            text: "Registered Successfully",
            type:'success'
            });
        this.$router.push({name:'Login'})
      })
      .catch((error)=>{
        this.$notify({
            title: "Error",
            text: 'Something went wrong, try login again',
            type:'error'
            });
        console.log("something is wrong with the user registration",error)
      })     
     }
   },
}
</script>

<style scoped>
.container{
  margin:auto auto;
  padding:20px;
  box-sizing: border-box;
  border: 1px solid rgb(202, 197, 197);
  border-radius:8px;
  display: block;
  box-shadow: 0px 4px 8px 0px rgba(253, 212, 212, 0.2);
  max-width: 500px;
  text-align:center;
  background-color: #f7f7f7;
  margin-top:60px;
}
.title{
  text-align: center;
  font-size: 36px;
  margin:10px;
}
input{
  display: block;
  width: -moz-available;
  padding:8px;
  border:none;
  border:1px solid rgb(207, 190, 190);
  border-radius: 4px;
  margin:16px auto;
}

form{
  margin-bottom: 20px;
}

button{
  display: block;
  width: 100%;
  padding:8px;
  font-size: 16px;
  border:none;
  background-color:rgb(63, 106, 247);
  color:azure;
  border-radius: 8px;
}
button:hover{
  background-color:rgb(8, 36, 131);
}
label{
  text-align: left;
  display: block;
}
</style>