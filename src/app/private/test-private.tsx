import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const TestPrivate = () => {
  return (
    <View className='flex h-screen w-full justify-center items-center'>
      <Text>TestPrivate</Text>
      <Link href={"/preview"}> Chuyeenr hhuong </Link>
    </View>
  )
}

export default TestPrivate
