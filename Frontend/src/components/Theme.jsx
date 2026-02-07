import React from 'react'

const Theme = () => {
  return (
    <section className='h-dvh flex-center relative'>
        <div className='absolute h-full w-full -z-30'><img src='./aurora.jpg'/></div>
        <div className='flex flex-col text-left justify-center items-center h-full'>
                <div className='font-thunder-black text-fg text-9xl lg:text-[10rem]'>Theme</div>
                <div className='font-thunder-black text-fg text-9xl lg:text-[35rem]'>AURORA</div>
        </div>
    </section>
  )
}

export default Theme