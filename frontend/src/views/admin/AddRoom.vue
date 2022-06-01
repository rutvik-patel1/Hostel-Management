<template>
  <div>
      <h2 style="color:#0b4b45;">Add Room</h2>
      <form @submit.prevent="postNewRoom">
          <label for="hostel"> Hostel No.</label>
          <select v-model="hostel" id="hostel">
          <option value="1" selected="selected">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          </select>
           <br>
          <label for="floor"> Floor No.</label>
          <select v-model="floor" id="floor">
          <option value="1" selected="selected">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          
          </select>
          <br>
          <label for="room"> Room No.</label>
          <select v-model="room" id="room">
          <option v-for="i in 50" :key="i" :value="i.toString().length == 1 ? 0+i.toString() : Number(i)">{{ i.toString().length == 1 ? 0+i.toString() : i}}</option>
          </select>
          <br>
           <label for="total">Total Capacity</label>
           <input type="number" id="total" v-model="totalSharing" > <br>
          <div style="margin:20px;">Room ID : <span>{{ generatedRoomId }}</span> </div>
          <br>
          <button type="submit" :disabled="generatedRoomId.length !== 4 ? true : false" > Add Room</button>
      </form>

      

  </div>
</template>

<script>

import  { postRoom }  from '../../api/admin'

export default {

data() {
    return {
        hostel:1,
        floor:1,
        room:1,
        totalSharing:1
    }
},
methods:{
    postNewRoom(){
        const payload = {
            hostelNumber: this.hostel, 
            floorNumber: this.floor,
            roomNumber:this.room,
            totalSharing: this.totalSharing
        }
        postRoom(payload)
        .then((res)=>{
            this.$notify({
            title: "Success",
            text: "You added a new room",
            type:'success'
            });
            console.log(res);
        }).catch(err => {
            this.$notify({
            title: "Error",
            text: "Something went wrong!!",
            type:'error'
            });
        })
    }
},
computed: {
    generatedRoomId(){
        return this.hostel.toString() + this.floor.toString() + this.room.toString()
    }
}

}
</script>

<style scoped>
button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

.container {
    border:1px solid red;
    width: 100%;
}
select {
  border: none;
  padding: 8px;
  font-size: 16px;
  width: 80px;
  margin:15px;
}
label{
   margin:20px;
}

button{
    margin:25px;
}
span{
    padding:10px 30px 10px 30px;
    border:1px solid #0b4b45;
    margin-left: 20px;
}

</style>