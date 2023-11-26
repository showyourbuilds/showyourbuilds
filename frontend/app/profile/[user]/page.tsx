import React from 'react'

export default function User({ params }: { params: { user: string } }) {
  return (
    <div>{params.user}</div>
  )
}
