
"use client"

import { Get_ImageList } from "@/lib/actions/image.actions"
import { useEffect, useState } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '@/constants'
import WorkDisplay from '@/components/shared/WorkDisplay'



const Home = () => {



    const [FullWorkList, setFullWorkList] = useState([] as any[])
    const [displayWorkList, setdisplayWorkList] = useState([...FullWorkList])




    const Call_ImageList = async () => {

        const FullWorkList = await Get_ImageList()

        setFullWorkList(FullWorkList)
        setdisplayWorkList(FullWorkList)

    }




    useEffect(() => { Call_ImageList() }, [])


    const [searchText, setSearchText] = useState("")

    const SearchTextChange = (txt: string) => {

        setSearchText(txt)

        const newWorkList = [...FullWorkList].filter((work) => work.title.toLowerCase().includes(txt.toLowerCase()))

        setdisplayWorkList(newWorkList)

    }




    return (




        <div className='home-main'>

            <div className="func-box">
                {navLinks.slice(1, 6).map((item) => (
                    <Link key={item.route} id={item.route} href={item.route} className="func-item">
                        <Image className='func-img' src={item.icon} alt="logo" width={30} height={30} />
                        {item.label}
                    </Link>
                ))}
            </div>


            <div className="worklist">

                <div className="worklist-head">
                    <h1>All Works</h1>
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchText}
                        onChange={(e) => SearchTextChange(e.target.value)}
                    />
                </div>

                <WorkDisplay FullWorkList={displayWorkList} />



            </div>



        </div>
    )
}

export default Home