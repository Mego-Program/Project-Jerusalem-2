import {atom} from 'jotai'
import axios from 'axios'

async function tryReach(){
  try{
const res = await axios.get('http://localhost:3000/missions/a')
const ret = await res.data
return true
  }catch(e){return false}
}

    
    async function chooseServer(){
      let serverBaseUrl;
  if (process.env.NODE_ENV === 'development') {
    const local = await tryReach()
    if(local){console.log('local:');serverBaseUrl ='http://localhost:3000/' ;}
    else{
    serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';}
  } else {
    
    serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';
  }
  console.log('url:',serverBaseUrl);
  return serverBaseUrl
    }


 async function  getUserName(){
  const url = await chooseServer()
    try{
    const res = await axios.get(`${url}projects/userName`,{
        headers: {
            'Content-Type': 'application/json',
            Authorization:localStorage.getItem('token')
          },
    })
return res.data


}catch(e){console.log('error try get user name',e);}

 }
 const userNameAtom = atom(getUserName())
 const atomUrl = atom(chooseServer())

 export {userNameAtom,atomUrl}