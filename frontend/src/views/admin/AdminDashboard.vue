<template>
  <div class="admin-container">
    <!-- //header //sidebar -->
    <div class="navbar">
      <div class="title2">Hostel Management</div>
      <div class="btn">
        <button style="color: #fff; border: 1px solid #fff" @click="logout">Logout</button>
      </div>
    </div>

    <div class="main">
      <aside class="sidebar">
        <div class="title3"><h3>Admin Dashboard</h3></div>
        <div class="option">
          <ul>
            <li>
              <router-link :active-class="'highlighted'" to="/admin/student"
                >Students Details</router-link
              >
            </li>
            <li>
              <router-link :active-class="'highlighted'" to="/admin/room"
                >Room Details</router-link
              >
            </li>
            <li>
              <router-link :active-class="'highlighted'" to="/admin/addroom"
                >Add Room</router-link
              >
            </li>
            <li>
              <router-link :active-class="'highlighted'" to="/admin/allocate"
                >Allocate Room</router-link
              >
            </li>
          </ul>
        </div>
      </aside>
      <div class="main-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "../../components/TheHeader.vue";
export default {
  methods:{ 
    logout(){
        this.$store.commit('user/RESET_STATE')
        this.$router.push({name:'Login'})
        this.$notify({
            title: "Success",
            text: "You are logged out",
            type:'success'
          });
      }
  }
};
</script>

<style>
.main-container {
  padding: 10px;
  width: 100%;
}

.option {
  display: flex;
  align-items: stretch;
}
li {
  list-style-type: none;
  /* padding: 20px; */
}
h3 {
  text-align: center;
}
a {
  text-decoration: none;
  display: block;
  color: #000;
  padding: 20px;
}
.highlighted {
  background-color: #0b4b45;
  color: rgb(253, 253, 253);
}
/* 
li> a:hover{
  
  background-color: #000;
  color: rgb(253, 253, 253); 
}*/
.admin-container {
  display: flex;
  flex-direction: column;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 1 20%;
  border-right: 1px solid #ccc;
  text-align: left;
}
.admin-container {
  flex: 1 1 80%;
}
.navbar {
  height: 60px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  background-color: #0b4b45;
  position: sticky;
  top: 0;
}
.title2 {
  font-size: 28px;
  color: #fff;
}
.title3{
  font-size: 18px;
  color: #0b4b45;
}

button {
  border: 1px solid #0b4b45;
  padding: 10px 20px !important;
  background-color: transparent;
  font-size: 18px;
}
button:hover {
  color: white;
  background-color: #0b4b45;
}
h2:after {
  background: none repeat scroll 0 0 rgb(191, 191, 191);
  bottom: -10px;
  content: "";
  display: block;
  height: 5px;
  position: relative;
  width: 40px;
}
</style>
