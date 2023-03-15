import React, { useRef } from "react";
import styled from "styled-components";
import Head from "next/head";

import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

import LoginForm from '@/components/loginForm/loginForm';

export default function Profile() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  /*const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])*/

  if (!user)
    return (
      <LoginForm/>
    )

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}