import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"

export default function Modal({ cancelButton, title, isVisible, setIsVisible, children, size }) {
  const closeModal = () => {
    setIsVisible(false)
  }

  const openModal = () => {
    setIsVisible(true)
  }

  return (
    <>
      <Transition appear show={isVisible} as={Fragment}>
        <Dialog as="div" className="relative z-[100000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl bg-light-backdrop
                ${
                  size === 1
                    ? "max-w-xs"
                    : size === 2
                    ? "max-w-sm"
                    : size === 3
                    ? "max-w-md"
                    : size === 4
                    ? "max-w-lg"
                    : size === 5
                    ? "max-w-xl"
                    : size === 6
                    ? "max-w-2xl"
                    : size === 7
                    ? "max-w-3xl"
                    : size === 8
                    ? "max-w-4xl"
                    : size === 9
                    ? "max-w-5xl"
                    : size === 10
                    ? "max-w-6xl"
                    : size === 11
                    ? "max-w-7xl"
                    : "max-w-full"
                }
                `}
                >
                  <Dialog.Title as="h3" className="flex justify-between text-xl font-semibold leading-6 text-black">
                    {title}
                    {cancelButton && (
                      <i className="w-8 h-8 cursor-pointer fa-solid fa-xmark" onClick={() => setIsVisible(false)}></i>
                    )}
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
