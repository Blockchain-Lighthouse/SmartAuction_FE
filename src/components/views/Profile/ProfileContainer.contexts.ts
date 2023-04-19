import { createContext, Dispatch, SetStateAction } from 'react'

export type Modal = 'decode' | null

interface ModalContextProps {
  modal: Modal
  setModal: Dispatch<SetStateAction<Modal>>
}

export const ModalContext = createContext<ModalContextProps>({
  modal: 'null' as unknown as Modal,
  setModal: () => null as unknown as void,
})
