"use client"

import { Get_Image_ByAuthor } from '@/lib/actions/image.actions'
import { FindUserByID, GetCurrentLogin } from '@/lib/actions/users.actions'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const page = () => {

    const [userWork, setUserWork] = useState([] as any)
    const [userCredit, setUserCredit] = useState(0)




    useEffect(() => {

        const GetUserAllWork = async () => {

            const CurrentUser = await GetCurrentLogin()
            const UserWorkList = await Get_Image_ByAuthor(CurrentUser.id as string)
            const UserCredit = await FindUserByID(CurrentUser.id as string)


            setUserWork(UserWorkList)
            setUserCredit(UserCredit.creditBalance as number)

        }

        GetUserAllWork()

    }, [])




    return (

        <div className='profile-main'>
            <h1>Profile</h1>

            <div className="profile-info-box">
                <div className="user-box">
                    Your Credit Balance:
                    <div className="user-variable">

                        <Image
                            src={'/assets/icons/coins.svg'}
                            alt='coin'
                            width={50}
                            height={50}
                            className='profile-icon'
                        />
                        {userCredit}

                    </div>
                </div>


                <div className="user-box">
                    Number of your Works:

                    <div className="user-variable">
                        <Image
                            src={'/assets/icons/photo.svg'}
                            alt='coin'
                            width={50}
                            height={50}
                            className='profile-icon'
                        />
                        {userWork.length}
                    </div>

                </div>
            </div>


            <div className="recent-works-box">
                <h1>Your Works</h1>

                <div className="work-list-box">
                    {userWork.map((work: any) => (
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
            </div>

        </div>
    )
}

export default page