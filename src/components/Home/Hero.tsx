import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="flex-between w-full max-sm:flex-center-col gap-10 max-sm:text-center">
      <div className='flex-1'>
        <h1 className='text-4xl'>Discovery in every <span className='text-primary'>digital corner.</span></h1>
        <p className='mt-4 max-w-md max-sm:mx-auto'>Welcome to Lumina Library, a digital sanctuary where curiosity meets curated knowledge. Explore our collections and find your next intellectual adventure.</p>
        <div className="hero_actions flex gap-4 mt-8 max-sm:justify-center">
            <button type='button' className='btn_primary'>Start Reading</button>
            <button type='button' className='border border-border text-foreground hover:border-primary hover:text-primary transition rounded-full px-4 py-2'>Tour Library</button>
        </div>
      </div>

      <div>
        <Image
         src="/image.png"
         alt="Illustration of a person reading in a digital library"
         width={400}
         height={400}
         priority
         className='hero_image shadow-lg rounded-card max-w-full h-auto'
        />
      </div>
    </section>
  )
}

export default Hero
