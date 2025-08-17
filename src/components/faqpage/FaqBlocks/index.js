import { useState } from 'react'
import { useFaqWp } from '../../../hooks/useQueryApi'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import useMeasure from 'react-use-measure'
import { smoothSpring, springConfig } from '../../../motion/Springs'

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const blockVariant = {
  initial: { opacity: 0, y: 30, scale: 1 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothSpring,
  },
}

const faqItemVariant = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
}

const FaqBlocks = () => {
  const { data: faqData, isLoading, error, isError } = useFaqWp()
  const [openItem, setOpenItem] = useState(null)

  const blocks = faqData?.faq_blocks

  const toggleFaqItem = (blockIndex, faqIndex) => {
    const key = `${blockIndex}-${faqIndex}`
    setOpenItem(openItem === key ? null : key)
  }

  const isItemOpen = (blockIndex, faqIndex) => {
    return openItem === `${blockIndex}-${faqIndex}`
  }

  if (isLoading) {
    return (
      <section className='p-4 md:p-16 2xl:p-28'>
        <motion.div
          className='flex items-center justify-center py-16'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={springConfig}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className='w-8 h-8 border-2 border-[#18BFDB] border-t-transparent rounded-full'
          />
        </motion.div>
      </section>
    )
  }

  if (isError || !blocks) {
    return (
      <section className='p-4 md:p-16 2xl:p-28'>
        <motion.div
          className='text-center py-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
        >
          <p className='text-red-400 text-lg'>Failed to load FAQ data</p>
        </motion.div>
      </section>
    )
  }

  return (
    <motion.section
      className='p-4 md:p-16 2xl:p-28'
      variants={staggerContainer}
      initial='initial'
      animate='animate'
    >
      {blocks.map((block, blockIndex) => {
        const heading = block?.faq_block?.heading
        const faqs = block?.faq_block?.questions_and_answers

        return (
          <motion.div
            key={blockIndex}
            variants={blockVariant}
            className='p-1 overflow-hidden rounded-2xl mb-8'
            style={{
              background: 'linear-gradient(150deg, #007fcf, #f56b0d)',
            }}
          >
            <div className='w-full h-full bg-black rounded-2xl overflow-hidden p-4 md:p-16'>
              {/* Header */}
              <motion.h2
                className='gradient-text font-urbanist font-bold text-3xl md:text-6xl inline-flex gap-3 mb-8'
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springConfig, delay: blockIndex * 0.1 }}
              >
                <motion.span className='leading-tight md:leading-normal'>
                  {`0${blockIndex + 1}`}
                </motion.span>
                <span className='leading-tight md:leading-normal'>
                  {heading}
                </span>
              </motion.h2>

              {/* FAQ Items */}
              {faqs && faqs.length > 0 && (
                <motion.div
                  className='space-y-4'
                  variants={staggerContainer}
                  initial='initial'
                  animate='animate'
                >
                  {faqs.map((faq, faqIndex) => (
                    <FaqItem
                      key={faq.id}
                      faq={faq}
                      isOpen={isItemOpen(blockIndex, faqIndex)}
                      onToggle={() => toggleFaqItem(blockIndex, faqIndex)}
                      index={faqIndex}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )
      })}
    </motion.section>
  )
}

const FaqItem = ({ faq, isOpen, onToggle, index }) => {
  const [ref, bounds] = useMeasure()

  return (
    <motion.div
      variants={faqItemVariant}
      className='rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden border-b-2'
      style={{
        borderColor: '#404040',
      }}
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        transition: smoothSpring,
      }}
    >
      {/* Question Button */}
      <motion.button
        onClick={onToggle}
        className='w-full p-4 md:p-6 text-left flex items-center justify-between group focus:outline-none'
        whileHover={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          transition: smoothSpring,
        }}
      >
        <motion.h3
          className='text-white text-xl md:text-3xl font-semibold pr-4 group-hover:text-[#18BFDB] transition-colors'
          animate={{
            color: isOpen ? '#18BFDB' : '#ffffff',
            transition: smoothSpring,
          }}
        >
          {faq.question}
        </motion.h3>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 0.7,
            },
          }}
          className='text-white/70 group-hover:text-[#18BFDB] transition-colors flex-shrink-0'
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      {/* Answer Content with Height Animation */}
      <motion.div
        animate={{
          height: isOpen ? bounds.height : 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 35,
            mass: 0.8,
          },
        }}
        className='overflow-hidden'
      >
        <div ref={ref}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    mass: 0.6,
                    delay: 0.05,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                  transition: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 40,
                    mass: 0.5,
                  },
                }}
                className='px-4 md:px-6 pb-4 md:pb-6'
              >
                <div className='pt-4'>
                  {faq.answer.map((answerItem, answerIndex) => (
                    <motion.p
                      key={answerItem.id}
                      className='text-white/80 text-base md:text-xl leading-relaxed pl-4'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          ...springConfig,
                          delay: answerIndex * 0.05,
                        },
                      }}
                    >
                      {answerItem.paragraph}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FaqBlocks
