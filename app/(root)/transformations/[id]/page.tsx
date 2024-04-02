"use client"



import { Get_Image_ByID } from '@/lib/actions/image.actions'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { transformationTypes } from '@/constants'
import { FindUserByID } from '@/lib/actions/users.actions'

const page = () => {

    const path = usePathname()
    const [CurrentWork, setCurrentWork] = useState({} as any)
    const [author, setAuthor] = useState("" as string)


    useEffect(() => {

        const GetThisWork = async () => {

            const ThisId = path.split('/')[2]
            const work = (await Get_Image_ByID(ThisId))[0]

            setCurrentWork(work)



            const thisAuthor = await FindUserByID(work.author)
            const UserName = thisAuthor.username != null ? thisAuthor.username : thisAuthor.firstName + ' ' + thisAuthor.lastName

            setAuthor(UserName)

        }

        GetThisWork()

    }, [])



    return (

        <div className='display-work-main'>

            <div className="transform-title">
                <h1>{CurrentWork.title}</h1>

            </div>


            <div className="work-info">

                <div className="info-box">
                    <div className="item-info">Transformation</div>
                    <div className="item-value">{CurrentWork.transform_type}</div>
                </div>



                {CurrentWork.aspectRatio != "" && (
                    <div className="info-box">
                        <div className="item-info">AspectRatio</div>
                        <div className="item-value">{CurrentWork.aspectRatio}</div>
                    </div>
                )}


                {CurrentWork.prompt != "" && (
                    <div className="info-box">
                        <div className="item-info">Prompt</div>
                        <div className="item-value">{CurrentWork.prompt}</div>
                    </div>

                )}



                {CurrentWork.color != "" && (
                    <div className="info-box">
                        <div className="item-info">Recolor</div>
                        <div className="item-value">{CurrentWork.color}</div>
                    </div>
                )}

                <div className="info-box">
                    <div className="item-info">Author</div>
                    <div className="item-value">{author}</div>
                </div>





            </div>

            <div className="seperator" />



            {
                CurrentWork.transFormedURL && (
                    <div className="display-work-box">

                        <div className="img-display-box">
                            <div className="img-display-parent img-before">
                                <Image
                                    className="display-img-item"
                                    src={CurrentWork.secureURL}
                                    alt="display-img"
                                    width={CurrentWork?.width}
                                    height={CurrentWork?.height / CurrentWork?.width * 500}
                                />
                            </div>


                            <Image
                                src='/assets/icons/toRight.svg'
                                width={50}
                                height={50}
                                alt='toRight'
                            />


                            <div className="img-display-parent img-after">
                                <Image
                                    className="display-img-item"
                                    src={CurrentWork.transFormedURL}
                                    alt="display-img"
                                    width={CurrentWork?.newWidth}
                                    height={CurrentWork?.newHeight / CurrentWork?.newWidth * 500}
                                />
                            </div>
                        </div>

                    </div>
                )
            }

        </div >
    )
}

export default page