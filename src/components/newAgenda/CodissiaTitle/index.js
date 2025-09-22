import GradientCalendar from '../../Elements/Icons/GradientCalendar'

const CodissiaTitle = () => {
  return (
    <div className='flex flex-col gap-2 items-center justify-center font-urbanist font-medium text-2xl md:text-3xl gradient-text-gray'>
      <h1 className='text-center'>Codissia Trade Fair Complex, Coimbatore</h1>

      {/*date*/}
      <div className='flex gap-2'>
        <GradientCalendar />
        9th & 10th Oct 2025
      </div>
    </div>
  )
}

export default CodissiaTitle
