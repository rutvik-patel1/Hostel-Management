<template>
  <div>
    <nav>
        <div class="title">Hostel Management</div>
        <div class="user-container">
          <div class="username"><span>&#9879;</span><span> </span>{{ username }}</div>
          <div><button @click="logout">Logout</button></div>
        </div>
    </nav>

  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    created(){
      // console.log(this.$store.state.user.email)
    },
    methods:{
      logout(){
        this.$store.commit('user/RESET_STATE')
        this.$router.push({name:'Login'})
        this.$notify({
            title: "Success",
            text: "You are logged out",
            type:'success'
          });
        Cookies.remove('token')
      }
    },
    computed:{
      username(){
        return this.$store.state.user.email
      }
      
    }
}
</script>

<style scoped>
div{
  padding-bottom: 10px;
}
nav{
  display:flex;
  background-color:#ffffff;
  padding:0px;
  margin:0px;
  height:55px;
  /* align-items: center; */
  align-items: baseline;
  justify-content: space-around;
  border-bottom: 1px solid #ced2d6;
  /* box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.2); */
  margin-bottom: 15px;
}
.username{
  font-size: 18px;
  color: #0b4b45;
}

button{
  border:1px solid #0b4b45;
  padding:10px 20px !important;
  background-color:transparent;
  font-size:18px; 
}

button{
  display: block;
  width: 100%;
  padding:8px;
  font-size: 16px;
  border:none;
  background-color:#0b4b45;
  color:azure;
  border-radius: 8px;
}
button:hover{
  background-color:rgb(8, 36, 131);
}

.title{
  font-size: xx-large;
}
button:hover{
  background-color:black;
  color: #ffffff;
}
.user-container{
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>