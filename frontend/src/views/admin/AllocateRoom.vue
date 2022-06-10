<template>
  <div>
     <h2 style="color:#0b4b45;">Allocate Room</h2>
     <!-- 1	Rutvik45	rutvik1@gmail.com	1234567890	hahahahahahaha	4	2022	1007 -->
      <div v-if="students.length ===  0">No pending student found!!</div>
      <table class="table" v-else>
           <thead>
             <tr>
               <th>ID</th>
               <th>Full Name</th>
               <th>Email ID</th>
               <th>Mobile No</th>
               <th>Address</th>
               <th>Passout</th>
               <th>Allocate Room</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="(student,index) in students" :key="student.id">
               <td>{{ student.id }}</td>
               <td>{{ student.fullname }}</td>
               <td>{{ student.email }}</td>
               <td>{{ student.mobile }}</td>
               <td>{{ student.address }}</td>
               <td>{{ student.passingMonth +" /"+student.passingYear }}</td>
               <td>
               <select v-model="roomNo[index]">
               <option value="0" disabled >Select</option>
               <option v-for="room in rooms" :key="room" :value="room">{{ room }}</option>
               </select>
               <button @click="allocateRoom(student.id,roomNo[index])" :disabled="roomNo == 0 ? true : false ">Allocate Room</button>
               </td>
             </tr>
           </tbody>
     </table>
     <!-- {{roomNo}} -->
  </div>
</template>

<script>
import  {getPendingStudentData,getAvailableRooms ,allocateRoomById}  from '../../api/admin'
export default {
created(){
  this.getRooms()
  this.getStudentData()
},
data() {
  return {
    students:[],
    roomNo:[],
    rooms:[]
  }
},
methods: {
   
getStudentData(){
  getPendingStudentData().then((res)=>{
    this.students = res.data.data
  })
  .catch(()=>{
    this.$notify({
            title: "Error",
            text: "Something went wrong!!",
            type:'error'
      });
  })
   },



  allocateRoom(studentid,roomid){
    allocateRoomById(studentid,roomid).then(()=>{
        this.getStudentData()
    })
    .catch(()=>{
      this.$notify({
            title: "Error",
            text: "Something went wrong!!",
            type:'error'
      });
    })
  },
  getRooms(){
    getAvailableRooms().then((res)=>{
       if(res.data.data.length !== 0 ){
         const result = res.data.data
         this.rooms = result.map(each=> each.roomNo )
       }
    })
    .catch(()=>{
      this.$notify({
            title: "Error",
            text: "Something went wrong!!",
            type:'error'
      });
    })
  }
}

}
</script>

<style>
button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
button:disabled,
button[disabled]:hover{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;

}

table{
  margin:auto;
  text-align:center;
}
th{
  padding:10px;
}
td{
  padding:10px;
  font-size:16px;
}
table,tr,th,td{
  border:1px solid #ccc;
  border-collapse: collapse;
}
select {
  border: none;
  padding: 8px;
  font-size: 16px;
  width: 80px;
  margin:0px;
  margin-right: 20px;
}
</style>