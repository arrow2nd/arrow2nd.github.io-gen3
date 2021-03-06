import React from 'react'
import Sections from '../components/common/sections'
import Seo from '../components/common/seo'
import Carousel from '../components/detail/carousel'
import LinkButton from '../components/detail/link-button'
import Title from '../components/detail/title'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { useImages, getImageData } from '../hooks/useImages'

type Props = {
  data: GatsbyTypes.WorkDetailQuery
}

const Detail = ({ data }: Props): JSX.Element => {
  if (!data.worksJson) {
    return <p>{`error : data.worksJson is undefined.`}</p>
  }

  const { title, desc, image, sections, links } = data.worksJson
  if (!links) {
    return <p>{`error : data.workJson.links is undefined.`}</p>
  }

  const allImages = useImages()
  const result = getImageData(allImages, `${image?.baseName}-1.png`)
  const seoImage = result ? result.src : ''

  const linkButtons = links.map((e) => (
    <LinkButton
      iconName={e?.icon || 'link'}
      text={e?.name || ''}
      href={e?.href || ''}
      key={e?.name}
    />
  ))

  return (
    <Layout>
      <Seo title={title} desc={desc} image={seoImage} article />
      <div className="mx-auto max-w-3xl transition-anim">
        <Carousel baseName={image?.baseName} imageNum={image?.num} />
        <Title title={title} desc={desc} />
        <Sections items={sections ?? []} />
        <div className="mt-16 text-center">{linkButtons}</div>
      </div>
    </Layout>
  )
}

export default Detail

export const query = graphql`
  query WorkDetail($slug: String!) {
    worksJson(fields: { slug: { eq: $slug } }) {
      title
      desc
      category
      image {
        baseName
        num
      }
      sections {
        text
        title
      }
      links {
        href
        icon
        name
      }
    }
  }
`
