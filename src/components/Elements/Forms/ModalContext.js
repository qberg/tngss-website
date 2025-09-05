import { createContext, useContext, useState } from 'react'
import FormModal from './FormModal'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    redirectTo: null,
  })

  const showModal = (title, message, type = 'success', redirectTo = null) => {
    setModal({ isOpen: true, type, title, message, redirectTo })
  }

  const hideModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <FormModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={hideModal}
        redirectTo={modal.redirectTo}
      />
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}
