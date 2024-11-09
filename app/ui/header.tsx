'use client'

import Link from 'next/link'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { KeyIcon } from '@heroicons/react/24/outline'

export default function Header () {
  return (
    <header>
      <Popover>
        <div className="container mx-auto flex items-center border-b-2 px-6 py-2 h-24">
          <h1 className='font-bold'>Centro de Salud Chirusi</h1>
          <div className='grow'>
            <div className='hidden sm:flex items-center justify-center gap-2 md:gap-8'>
              <Link href="home">Inicio</Link>
              <Link href="about">Acerca de Nosotros</Link>
              <Link href="services">Servicios</Link>
              <Link href="contact">Contactanos</Link>
            </div>
          </div>
          <div className="flex grow items-center justify-end sm:hidden">
            <PopoverButton className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 
            hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
              <span className="sr-only">Abrir Menu</span>
              <KeyIcon className="h-6 w-6" aria-hidden='true' />
            </PopoverButton>
          </div>
          <Transition>
            <PopoverPanel focus className='absolute inset-x-0 top-0 origin-top-right transfor p-2 transition md:hidden'>
              <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <h1 className='font-bold'>Menu</h1>
                    <div className="-mr-2">
                      <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
                      hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Cerrar Menu</span>
                        <KeyIcon className="h-6 w-6" aria-hidden='true' />
                      </PopoverButton>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2' href="home">Inicio</Link>
                      <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2' href="about">Acerca de Nosotros</Link>
                      <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2' href="services">Servicios</Link>
                      <Link className='focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2' href="contact">Contactanos</Link>
                    </nav>
                  </div>
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <Link
                      href="register"
                      className='rounded-md bg-white px-4 py-2 text-sm font-medium text-black md:text-xl
                      w-full border-2focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'
                    >
                      Registrate
                    </Link>
                    <Link
                      href="login"
                      className='rounded-md bg-white px-4 py-2 text-sm font-medium text-black md:text-xl
                      w-full border-2focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'
                    >
                      Iniciar Sesion
                    </Link>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
          <div className='hidden sm:block'>
            <Link href="register" className='mr-2 font-bold'>Registrate</Link>
            <Link href="login" className='font-bold'>Iniciar Sesion</Link>
          </div>
        </div>
      </Popover>
    </header>
  )
}