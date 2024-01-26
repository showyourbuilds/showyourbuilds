import Link from 'next/link'
import React from 'react'

export default function LinksBar({links}: {links: {label: string, link: string}[]}) {
  return (
    <div className='flex'>
        {links.map((link, index) => {
            return (
                <div key={index} className="flex items-center justify-start my-2">
                    {link.label === "Github" ? (
                        <a href={link.link} target='_blank'>
                            <img src="/assets/github.png" alt="" width={25} className="mx-4" />
                        </a>
                    ) : link.label === "Twitter" ? (
                        <a href={link.link} target='_blank'>
                            <img src="/assets/twitter.png" alt="" width={25} className="mx-4" />
                        </a>
                    ) : link.label === "Portfolio" || link.label === "website" ? (
                        <a href={link.link} target='_blank'>
                            <img src="/assets/link.png" width={25} className="mx-4" alt="" />
                        </a>
                    ) : link.label === "LinkedIn" ? (
                        <a href={link.link} target='_blank'>
                            <img src="/assets/linkedin.png" width={25} className="mx-4" alt="" />
                        </a>
                    ) : link.label === "Instagram" ? (
                        <a href={link.link} target='_blank'>
                            <img src="/assets/instagram.png" width={25} className="mx-4" alt="" />
                        </a>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        )}
    </div>
  )
}
