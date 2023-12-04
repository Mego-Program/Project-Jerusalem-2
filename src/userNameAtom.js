import {atom} from 'jotai'
import axios from 'axios'
import fakeToken from './fakeToken';

    let serverBaseUrl;
    let userName
  if (process.env.NODE_ENV === 'development') {
    
    serverBaseUrl = 'http://localhost:3000/';
  } else {
    
    serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';
  }

 async function  getUserName(){
    try{
    const res = await axios.get(`${serverBaseUrl}projects/userName`,{
        headers: {
            'Content-Type': 'application/json',
            // Authorization: localStorage.getItem('token'),
            Authorization:fakeToken //change it to the previous line when there is real token

          },
    })
return res.data

}catch(e){console.log('error try get user name',e);}

 }
 const userNameAtom = atom(getUserName())
 const atomUrl = atom(serverBaseUrl)

 export {userNameAtom,atomUrl}