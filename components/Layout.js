import React from 'react'
import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({children}) => (
  <>
    <Head>
      <title>Online Course</title>
    </Head>
    <Navbar />
    {children}
  </>
)

export default Layout;