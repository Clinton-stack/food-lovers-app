import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className='not-found'>
        <h1>Page not found</h1>
        <p>Sorry, we can&apos;t find the page you are looking for. please return to <Link href='/'> home page</Link> </p>
    </main>
  )
}
