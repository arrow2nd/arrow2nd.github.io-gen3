import { PageLinks } from '../../data/common/page-links'
import { Link } from 'gatsby'
import React from 'react'

type Props = {
  className?: string
}

const LinkButton = ({ className = '' }: Props): JSX.Element => {
  const links = PageLinks.map((e) => (
    <Link to={e.to} key={e.name}>
      <span className="mx-4 text-natural-white hover:text-natural-gray tracking-widest transition-colors">
        {e.name}
      </span>
    </Link>
  ))

  return (
    <div
      className={`inline-block px-4 py-2 bg-natural-black rounded-full ${className}`}
    >
      {links}
    </div>
  )
}

export default LinkButton