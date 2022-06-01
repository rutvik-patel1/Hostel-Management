<template>
  <div>
    <the-header></the-header>
<div class="main-container">
  
      <div class="form-container">
        <form @submit.prevent="applyForHostel">
          <!-- fullname,emil,mobile,address,passing month,passing year -->
          <div style="font-size: 26px; font-weight: 600">Registration Form</div>
          <label for="fullname">Fullname:</label>
          <input type="text" id="fullname" v-model="form.fullname" />
          <label for="email">Email Id:</label>
          <input type="email" id="email" v-model="form.email" />
          <label for="fullname">Mobile No.:</label>
          <input type="number" v-model="form.mobile" />
          <label for="add">Address:</label>
          <input type="text" id="add" v-model="form.address" />
          <div
            style="
              display: flex;
              justify-content: space-around;
              align-items: center;
            "
          >
            <label for="month">Passout Month:</label>
            <select id="month" @change="selectchanged" v-model="month">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <label for="year">Passout Year:</label>
            <select  id="year" v-model="year">
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <button :disabled="isDataSubmitted" type="submit" >
            {{ isDataSubmitted ? "Already submitted" : "Submit" }}
          </button>
        </form>
      </div>
      <div class="allocation-container" v-if="isDataSubmitted">
           <div style="font-size: 26px; font-weight: 600; ">Allocated Room</div>
           <div v-if="isRoomAllocated">
           <div style="font-weight: 600; margin-top:35px;">You got the room allocation !</div>
            <table style="text-align:left; margin:auto; margin-top:20px;">
              <tr>
                <td>Hostel ID</td>
                <td>:{{ roomNumber }}</td>
              </tr>
              <tr>
                <td>Hostel No.</td>
                <td>:{{ roomNumber[0]  }}</td>
              </tr>
              <tr>
                <td>Floor No.</td>
                <td>:{{ roomNumber[1] }}</td>
              </tr>
              <tr>
                <td>Room No.</td>
                <td>:{{ roomNumber[2]+roomNumber[3] }}</td>
              </tr>
            </table>
           
           </div>
           <div v-else>Have not allocated room yet</div>
      </div>
</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import TheHeader from "../components/TheHeader.vue";
import { getStudentData , uploadStudentData } from "../api/auth";
export default {
  components: {
    TheHeader,
  },
  created() {
    this.getData()
  },
  data() {
    return {
      form: {
        fullname: "",
        email: this.$store.state.user.email,
        mobile: "",
        address: "",
      },
      month: "",
      year: "",
      roomNumber:0,
      isRoomAllocated: false,
      isDataSubmitted: false,
    };
  },
  methods:{
    selectchanged(e){
      console.log(e.target.value)
    },
    applyForHostel() {
     // fullname, email, mobile, address, passingMonth, passingYear
     const payload = {
       fullname:this.form.fullname,
       email:this.form.email,
       mobile:this.form.mobile,
       address:this.form.address,
       passingMonth:this.month,
       passingYear:this.year
     }
     uploadStudentData(payload).then(res => (console.log(res)))
     .then(()=>{
       this.getData()
     })
     .catch((err) => (console.log(err)))
    },
    getData(){
      getStudentData()
      .then((res) => {
        // this.isDataSubmitted = true;
        console.log(res.data.data);
        if(res.data.data.length !== 0){
        this.isDataSubmitted = true;
        this.form.fullname = res.data.data.fullname;
        this.form.email = res.data.data.email;
        this.form.mobile = res.data.data.mobile;
        this.form.address = res.data.data.address;
        this.month = res.data.data.passingMonth;
        this.year = res.data.data.passingYear;
        if(res.data.data.roomNumber !== 0){
           this.isRoomAllocated = true
           this.roomNumber = res.data.data.roomNumber.toString()
        }}
      })
      .catch((error) => console.log(error));
    }
  }
};
</script>

<style scoped>

.main-container{
  display: flex;
}
.allocation-container{
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid rgb(202, 197, 197);
  border-radius: 8px;
  flex:1 0 auto;
  /* display: block; */
  /* box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2); */
  max-width: 500px;
  text-align: center;
}
.form-container{
  margin: auto auto;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid rgb(202, 197, 197);
  border-radius: 8px;
  /* display: block; */
  /* box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2); */
  max-width: 500px;
  flex:1 0 auto;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  width: -moz-available;

  padding: 8px;
  border: none;
  border: 1px solid rgb(207, 190, 190);
  border-radius: 4px;
  margin: 12px auto;
}
button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
button[disabled]:hover {
  background-color: #cccccc;
}

input:focus {
  outline: none;
  border: 1px solid rgb(99, 96, 96);
}

label {
  display: block;
  width: 100%;
  text-align: left;
}

button {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  margin-top: 10px;
  border: none;
  background-color: #0b4b45;
  color: azure;
  border-radius: 8px;
}
button:hover {
  background-color: #000808;
}
select {
  border: none;
  padding: 8px;
  font-size: 16px;
}

td{
  font-size: 22px;
}
</style>