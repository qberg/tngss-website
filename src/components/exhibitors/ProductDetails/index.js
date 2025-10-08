import { PrimaryContentTitle } from '../../Layout/Blocks'
import { SectionWrapper } from '../../Layout/Section'
import {
  ProductBody,
  ProductCard,
  ProductContent,
  ProductDivider,
  ProductImage,
  ProductTitle,
} from '../ProductCard'

const ProductDetails = ({ products }) => {
  return (
    <SectionWrapper variant='top'>
      <PrimaryContentTitle variant='secondary'>Products</PrimaryContentTitle>

      {products.map((product) => {
        const name = product?.name
        const about = product?.about
        const imageSrc = product?.images

        return (
          <ProductCard key={product?.id}>
            <ProductImage imageSrc={imageSrc} />
            <ProductDivider />
            <ProductBody>
              {name && <ProductTitle>{name}</ProductTitle>}
              {about && <ProductContent>{about}</ProductContent>}
            </ProductBody>
          </ProductCard>
        )
      })}
    </SectionWrapper>
  )
}

export default ProductDetails
