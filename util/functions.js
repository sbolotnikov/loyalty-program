import { View, Text } from 'react-native'
import React from 'react'

 const  validateEmail=(email)=>{

     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        return (true)
      }
        return (false)
    }
    export default validateEmail