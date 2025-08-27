import React from 'react'
import { useAboutUsWp } from '../../../hooks/useQueryApi'
import MinimalHero from '../../Elements/MinimalHero'
import IntroSection from '../IntroSection'
import WhyTamilNaduSection from '../WhyTamilNaduSection'
import OrganisingCommitteSection from '../OrganisingCommitteSection'
import FocusAreasSection from '../FocusAreaSection'
import KeyFocusSection from '../KeyFocusSection'
import SteeringCommitteSection from '../SteeringCommitteSection'

const AboutPage = () => {
  const { data, isLoading, error, isError } = useAboutUsWp()

  const {
    introduction,
    mission,
    committe,
    steering_committe,
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
        tagLine='TNGSS: Where Innovation Meets Opportunity'
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

      {steering_committe && (
        <SteeringCommitteSection data={steering_committe} />
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
