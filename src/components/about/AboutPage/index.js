import React from 'react'
import { useAboutUsWp } from '../../../hooks/useQueryApi'
import MinimalHero from '../../Elements/MinimalHero'
import IntroSection from '../IntroSection'
import WhyTamilNaduSection from '../WhyTamilNaduSection'
import OrganisingCommitteSection from '../OrganisingCommitteSection'
import FocusAreasSection from '../FocusAreaSection'
import KeyFocusSection from '../KeyFocusSection'

const AboutPage = () => {
  const { data, isLoading, error, isError } = useAboutUsWp()

  const {
    introduction,
    mission,
    committe,
    whyTN,
    pavilion,
    pavilionTitle,
    highlights,
    highlightsTitle,
  } = data || {}

  return (
    <section className='home-fade-in text-white font-urbanist'>
      <MinimalHero
        title='About Us'
        subTitle=''
        tagLine='TNGSS Conversations: Where Ideas Collide'
        applyBorder={false}
      />

      {introduction && mission && (
        <IntroSection introData={introduction} missionData={mission} />
      )}
      {whyTN && (
        <WhyTamilNaduSection
          title={whyTN?.title}
          description={whyTN?.description}
        />
      )}

      {committe && <OrganisingCommitteSection data={committe} />}

      {pavilionTitle && pavilion && (
        <FocusAreasSection sectionTitle={pavilionTitle} data={pavilion} />
      )}

      {highlightsTitle && highlights && (
        <KeyFocusSection sectionTitle={highlightsTitle} data={highlights} />
      )}
    </section>
  )
}
export default AboutPage
