"use client"


import { toast } from 'react-hot-toast';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useVariableContext } from '@/context/ContextProvider';
import { useEffect } from 'react';


const MediaUploader = () => {


    const { uploadImg, setUploadImg, setFormEntry, statusFlag, setTransformedImgURL } = useVariableContext()


    useEffect(() => setUploadImg({}), [])


    const onUploadSuccess = (result: any) => {

        setFormEntry((prev: any) => ({ ...prev, publicId: result.info.public_id }))
        setUploadImg((prev: any) => (
            {
                ...prev,
                publicId: result.info.public_id,
                width: result.info.width,
                height: result.info.height,
                secureUrl: result.info.secure_url
            }
        ))

        toast.success('Image Uploaded')

        statusFlag.isUploadedImg = true
        statusFlag.isTransformed = false


        setTransformedImgURL('')

    }


    return (


        <div className={`upload-box img-box ${uploadImg.height > uploadImg.width ? 'protrait' : 'landscape'}`}      >

            <CldUploadWidget
                uploadPreset='lpy_imaginify'
                options={{ multiple: false, resourceType: "image" }}
                onSuccess={onUploadSuccess}
                onError={() => toast.error('Image Upload Failed')}
            >
                {({ open }) => (

                    <button className={`open-upload-box img-parent`} onClick={() => open()}>

                        {uploadImg.publicId ? (

                            <img
                                className='display-img'
                                id="uploaded-img"
                                src={uploadImg.secureUrl}
                                alt="Uploaded Image"

                            />

                        ) : (

                            <>
                                <Image
                                    id='add-img-icon'
                                    src="/assets/icons/add.svg"
                                    alt="Add Image"
                                    width={24}
                                    height={24}
                                />

                                <p>Click To Upload</p>
                            </>

                        )}
                    </button>
                )}

            </CldUploadWidget>
        </div>



    )
}

export default MediaUploader