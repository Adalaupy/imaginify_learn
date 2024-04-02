"use client"


import Image from 'next/image'
import Link from "next/link"




const WorkDisplay = ({ FullWorkList }: { FullWorkList: any[] }) => {


    return (

        <div className='work-list-box'>
            {FullWorkList.map((work) => (
                <Link href={`/transformations/${work.id}`} key={work.id} className="work-item img-parent">

                    <Image
                        className={'transformed-img'}
                        src={work.transFormedURL}
                        alt={'transformedImg'}
                        width={work.width}
                        height={work.height}
                    />

                    {work.title}

                </Link>
            ))}


        </div>
    )
}

export default WorkDisplay