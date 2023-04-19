import Head from 'next/head'

import ProfileContainerView from '@/components/views/Profile'

const My = () => {
  return (
    <div>
      <Head>
        <title>My Page</title>
        <meta name='description' content='My Page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <ProfileContainerView />
    </div>
  )
}

export default My
