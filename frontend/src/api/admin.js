import axios from './request';

export function getStudentData(){
    return axios({
        url: "/admin/student",
        method: "get",
      })
}

export function getRooms(){
    return axios({
        url: "/admin/allroom",
        method:'get'
    })
}

export function getAvailableRooms(){
    return axios({
        url: "/admin/room",
        method:'get'
    })
}

export function postRoom(data){
    return axios({
        url: "/admin/room",
        method:'post',
        data
    })
}

export function getStudentsInRoom(id){
    return axios({
        url:'/admin/room/'+id,
        method:'get'
    })
}

export function getPendingStudentData(){
    return axios({
        url: "/admin/student/pending",
        method:'get'
    })
}

export function allocateRoomById(studentId,roomId){
    return axios({
        url:'/admin/allocateroom/'+studentId+'/'+roomId,
        method:'post'
    })
}