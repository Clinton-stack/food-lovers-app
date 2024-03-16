"use client"
import Link from 'next/link'
import React from 'react'
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation'

export default function NavLink({href, children}) {
    const path = usePathname()  
  return (
    <>
        <Link href={href} className={path.startsWith(href) ? styles.active : undefined }>
            {children}
        </Link>

    </>
    )
}
