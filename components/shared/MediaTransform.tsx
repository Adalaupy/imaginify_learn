"use client"

import { useVariableContext } from "@/context/ContextProvider"


const MediaTransform = () => {

    const { TransformedImgURL, statusFlag } = useVariableContext()




    return (

        <div className="img-box">
            <div className="open-upload-box">

                {statusFlag.isTransforming ? (
                    <>....</>
                ) :
                    (TransformedImgURL && (
                        <img
                            className='display-img'
                            id="transformed-img"
                            src={TransformedImgURL}
                            alt="Transformed Image"

                        />)
                    )
                }
            </div>
        </div>
    )
}

export default MediaTransform