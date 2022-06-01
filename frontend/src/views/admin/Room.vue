<template>
  <div>
       <h2 style="color:#0b4b45;">Room Details</h2>
       <div>
         <div v-if="rooms.length === 0"> No data Found !!!!</div>
         <table class="table2" v-else>
           <thead>
             <tr>
               <th>Room No</th>
               <th>Total Capacity</th>
               <th>Available Space</th>
               <th>View Student</th>
             </tr>
           </thead>
           <tbody v-for="room in rooms" :key="room.roomNo">
             <tr>
               <td scope="row">{{ room.roomNo }}</td>
               <td>{{ room.totalShring }}</td>
               <td>{{ room.totalShring - room.avilableSpace  }}</td>
               <td> <button @click="getStudents(room.roomNo)">View</button></td>
             </tr>
           </tbody>
         </table>
       </div>

       <!-- modal -->
       <dialog-box v-if="openDialog" title="Student Details" @close="closeDialog">
         <template #default>
         <p v-if="students.length == 0"> No one in the room </p>
         <table class="table" v-else >
           <thead>
             <tr>
               <th>ID</th>
               <th>Full Name</th>
               <th>Email ID</th>
               <th>Mobile No</th>
               <th>Address</th>
               <th>Passout</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="student in students" :key="student.id">
               <td>{{ student.id }}</td>
               <td>{{ student.fullname }}</td>
               <td>{{ student.email }}</td>
               <td>{{ student.mobile }}</td>
               <td>{{ student.address }}</td>
               <td>{{ student.passingMonth +" /"+student.passingYear }}</td>
             </tr>
           </tbody>
         </table>
         
         </template>
       <template #actions>
          <button @click="closeDialog">Close</button>
    </template>
  </dialog-box>

       <!-- end -->
  </div>
</template>

<script>
import DialogBox from '../../components/DialogBox.vue'
import  { getRooms,getStudentsInRoom }  from '../../api/admin'
export default {
  components: { DialogBox },
created(){
  getRooms()
  .then((res) => {
    this.rooms = res.data.data
  })
  .catch((err) => {
    this.$notify({
            title: "Error",
            text: "Something went wrong!!",
            type:'error'
      });
  })
},
data() {
  return {
    rooms:[],
    openDialog:false,
    students:[]
  }
},
methods: {
  closeDialog(){
    this.openDialog = !this.openDialog;
    this.students = [];
  },
  getStudents(id){
    this.openDialog = true;
    getStudentsInRoom(id).then((res)=>{
      console.log('ressss',res)
      this.students = res.data.data
    })
    .catch((error)=>{
      console.log(error)
    })
  }
}

}
</script>

<style scoped>
table{
  margin:auto;
  text-align:center;
}
th{
  padding:10px;
}
td{
  padding:5px;
  font-size:20px;
}
table,tr,th,td{
  border:1px solid #ccc;
  border-collapse: collapse;
}

.table > tbody > tr > td, .table > thead > tr > th{
   font-size: 14px;
}

</style>