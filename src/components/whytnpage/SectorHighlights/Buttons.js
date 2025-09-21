import React, { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props
  return (
    <button
      className='w-8 h-8 rounded-md hover:bg-theme-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center'
      type='button'
      {...restProps}
    >
      <ArrowLeft className='w-5 h-5 text-black' />
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props
  return (
    <button
      className='w-8 h-8 rounded-md hover:bg-theme-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center'
      type='button'
      {...restProps}
    >
      <ArrowRight className='w-5 h-5 text-black' />
      {children}
    </button>
  )
}
