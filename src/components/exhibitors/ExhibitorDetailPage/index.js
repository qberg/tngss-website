import { useParams } from 'react-router-dom'
import MinimalHero from '../../Elements/MinimalHero'
import { useExhibitorBySlug } from '../../../hooks/useExhibitorsData'
import ExhibitorDetails from '../ExhibitorDetails'
import FounderDetails from '../FounderDetails'
import ProductDetails from '../ProductDetails'

const ExhibitorDetailPage = () => {
  const { slug } = useParams()

  const { data: exhibitor, isLoading, error } = useExhibitorBySlug(slug)
  const founder = exhibitor?.exhibitor_data?.founderName
  const isProductCompany =
    exhibitor?.exhibitor_data?.productService === 'product'

  const products = exhibitor?.exhibitor_data?.products || []
  const hasProducts =
    (products && products.length > 0) || exhibitor?.exhibitor_data?.productName

  if (hasProducts && products.length === 0) {
    products.push({
      id: 0,
      name: exhibitor?.exhibitor_data?.productName?.trim() || null,
      about: exhibitor?.exhibitor_data?.productAbout?.trim() || null,
      images: exhibitor?.exhibitor_data?.productImageUrl?.trim() || null,
    })
  }
  return (
    <>
      <MinimalHero
        title='Exhibitor'
        tagLine='Elevate Your Brand at TNGSS'
        applyBorder={false}
      />

      <ExhibitorDetails exhibitor={exhibitor} />
      {founder && <FounderDetails exhibitor={exhibitor} />}
      {isProductCompany && hasProducts && (
        <ProductDetails products={products} />
      )}
    </>
  )
}

export default ExhibitorDetailPage
