import axios from './request';

export function login(data){
    return axios({
        url: "/auth/login",
        method: "post",
        data
      })
}

export function register(data){
  return axios({
    url: "/auth/signup",
    method: "post",
    data
  })
}

export function getStudentData(){
  return axios({
    url: "/student",
    method: "get",
  })
}

export function uploadStudentData(data){
  console.log("uploadStudentData",data)
  return axios({
    url: "/student",
    method: "post",
    data
  })
}

export function details(){
  return axios({
    url:'/details',
    method:'get'
  })
}