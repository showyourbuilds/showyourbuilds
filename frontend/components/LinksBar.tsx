import React from 'react'

export default function LinksBar({links}: {links: {website: string, link: string}[]}) {
  return (
    <div className='flex'>
        {links.map((link, index) => {
            return (
                <div key={index} className="flex items-center justify-start my-2">
                    {link.website === "github" ? (
                        <img src="/assets/github.png" alt="" width={25} className="mx-4" />
                    ) : link.website === "twitter" ? (
                        <img src="/assets/twitter.png" alt="" width={25} className="mx-4" />
                    ) : (
                        <img src="/assets/instagram.png" width={25} className="mx-4" alt="" />
                    )}
                </div>
            )}
        )}
    </div>
  )
}