import { Stack } from 'expo-router'
import React from 'react'

const PrivateLayout = () => {
  return ( 
    <Stack screenOptions={{
        headerShown: false
    }}/>
  )
}

export default PrivateLayout