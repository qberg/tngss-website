import bgImage from '../../assets/minimalHeroBg.png'

const MinimalHero = () => {
  return (
    <section className='relative bg-black overflow-x-hidden'>
      <div
        className='bg-cover bg-center'
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
    </section>
  )
}

export default MinimalHero
