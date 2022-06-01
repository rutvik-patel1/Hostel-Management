<template>
  <div>
    <notifications position="top right"/>
    <router-view/>
  </div>
</template>

<style>
body{
  margin:0;
}
#app {
  /* font-family: 'Poppins', sans-serif; */
  font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
input:focus{
    outline: none;
    border-bottom:1px solid rgb(99, 96, 96);
}
input{
  padding:8px;
  border:none;
  border-bottom:1px solid rgb(207, 190, 190);
  border-radius: 2px;
	font-size: initial;
  margin:25px auto;
}

.vue-notification {
  padding: 10px !important;
  font-size: 15px !important;
  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
}

.vue-notification-group{
  margin-top: 60px;
  margin-left: 16px;
}

.vue-notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 15px;
  padding: 0;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
