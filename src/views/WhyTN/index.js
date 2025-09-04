import { Helmet } from "react-helmet";
import WhyTNPage from "../../components/whytnpage/WhyTNPage";

const WhyTN = () => {
    return (
        <>
            <Helmet className='font-urbanist'>
                <title>Why Tamil Nadu | TNGSS 2025</title>
                <meta
                name='description'
                content='Tamil Nadu - India&apos;s Economic Powerhouse'
                />
            </Helmet>
            <WhyTNPage />
        </>
    )
}

export default WhyTN