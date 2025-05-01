import React from 'react'
import { SendHorizontal, X } from 'lucide-react'
import useModal from '@/hooks/useModal'
import { MotionProps, motion } from 'framer-motion'
import ShutterButton from '../custom/shutter-button'
import { cn } from '@/lib/utils'
interface ITemplateModalProps {
  children?: React.ReactNode
  submitText?: string
  className?: string
  style?: React.CSSProperties
}
const TemplateModal: React.FC<ITemplateModalProps> = ({ children, submitText = 'Submit', className, style }) => {
  const modalVariants: MotionProps["variants"] = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },

  }
  const { closeModal, data, onSubmit } = useModal()
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={modalVariants}
      transition={{ duration: 0.2 }}
      className={cn("flex flex-col gap-2  rounded-md bg-neutral-200 p-3", className)}
      style={style}
    >
      <div className='relative w-full h-10 rounded-t-md flex items-center justify-between'>
        <div
          className="z-10 absolute top-0 right-0 cursor-pointer p-1 rounded-full border-2 border-black/50 hover:border-black group"
        >
          <X size={16} className="text-red-300 group-hover:text-red-500" onClick={closeModal} />
        </div>
        <span className='text-xl font-semibold text-black/80'>{data?.title}</span>
      </div>
      <div className='flex-1'>
        {children}
      </div>
      <div className='flex items-center justify-end w-full h-10 rounded-b-md'>
        <ShutterButton
          icon={<SendHorizontal size={16} color='black' />}
          text={submitText}
          onClick={onSubmit}
          bgColorCode="#4DD0E1"
          containerClassName="p-2 w-fit h-full rounded-md border-[1px] border-black/50 cursor-pointer"
          textClassName='text-black font-semibold'
          mode='vertical-out'
        />
      </div>
    </motion.div>
  )
}

export default TemplateModal