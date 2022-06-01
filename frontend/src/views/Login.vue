<template>
  <div class="container">
    <div class="title" style="color:#000">Login</div>
    <form @submit.prevent="login">
    <img src="../assets/logo.png" alt="Logo" width="100">
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" placeholder="Email address">
    <label for="">Password</label>
    <input type="password" v-model="password" placeholder="Enter password">
    <button type="submit">{{ isLoading? 'wait....' :'Sign In' }}</button>
    </form>
    <router-link to="/register"> Don't have an account ? Register! </router-link>
  </div>
</template>


<script>
export default {
   created(){
     
   },
   data() {
     return {
       email:'rutvik@gmail.com',
       password:'123456',
       isLoading: false
     }
   },
   methods: {
     login(){
        this.isLoading = true;
        const payload = {
          email:this.email,
          password:this.password
        }
        this.$store.dispatch('user/login',payload)
        .then((res) => {
           this.$notify({
            title: "Success",
            text: "You are now loggedIn",
            type:'success'
            });
            console.log("isadmin",this.$store.state.user.isAdmin)
            if(this.$store.state.user.isAdmin){
               this.$router.push({name:'student'})
            }
            else{
              this.$router.push({name:'Dashboard'})
            }
             
        })
        .catch((err) => {
            this.$notify({
            title: err,
            text: 'Something went wrong, try login again',
            type:'error'
            });
            console.log(err)
        })
        this.isLoading = false;
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
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.2);
  max-width: 500px;
  text-align: center;
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
form{
  margin-bottom: 20px;
}
</style>