<template>
  <div>
     <h2 style="color:#0b4b45;">Student Details</h2>
     <!-- 1	Rutvik45	rutvik1@gmail.com	1234567890	hahahahahahaha	4	2022	1007 -->
     <table class="table">
           <thead>
             <tr>
               <th>ID</th>
               <th>Full Name</th>
               <th>Email ID</th>
               <th>Mobile No</th>
               <th>Address</th>
               <th>Passout</th>
               <th>Room No</th>
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
               <td v-if="student.roomNumber">{{ student.roomNumber }}</td>
               <td v-else style="color:red;">Pending</td>
             </tr>
           </tbody>
     </table>
  </div>
</template>

<script>
import  {getStudentData}  from '../../api/admin'
export default {
created(){
  getStudentData().then((res)=>{
    this.students = res.data.data
  })
  .catch((err)=>{
    this.$notify({
            title: "Error",
            text: "Something went wrong!!",
            type:'error'
      });
  })
},
data() {
  return {
    students:[]
  }
},

}
</script>

<style>
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

</style>