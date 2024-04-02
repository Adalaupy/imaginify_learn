"use client"

import { useVariableContext } from "@/context/ContextProvider"
import { getCldImageUrl } from "next-cloudinary"
import { AddImageSave } from '@/lib/actions/image.actions'
import { GetCurrentUserInfo, UpdateUserCredit } from '@/lib/actions/users.actions'



const TransformationBtn = () => {

    const { currentUser, FormEntry, uploadImg, TransformedImgURL, setTransformedImgURL, statusFlag } = useVariableContext()



    // Check if the user fill in all the required fields
    const Check_FillinForm = () => {

        let isAllFilled = true
        let FormList: string[] = []

        switch (FormEntry.transformtype) {

            case 'restore' || 'removeBackground':
                FormList = ['title']
                break
            case 'fill':
                FormList = ['title', 'aspectRatio']
                break
            case 'remove':
                FormList = ['title', 'prompt']
                break
            case 'recolor':
                FormList = ['title', 'prompt', 'color']
                break
        }


        const isFilled = (FormType: keyof FormType) => {

            return FormEntry[FormType] != '' ? true : false

        }


        FormList.map((FormItem) => {

            isAllFilled = isFilled(FormItem as keyof FormType)

        })

        return isAllFilled

    }





    const handleApply = async () => {


        console.log(await GetCurrentUserInfo())
        const BalanceCredit = (await GetCurrentUserInfo()).creditBalance




        if (BalanceCredit <= 0) {
            alert('You do not have enough credit to apply the transformation')
            return
        }

        const isAllFilled = Check_FillinForm()

        let getTransform

        if (isAllFilled) {


            statusFlag.isTransforming = true

            getTransform = {
                width: uploadImg.width,
                height: uploadImg.height,
                src: uploadImg.publicId,
                ...FormEntry.config
            }


            if (FormEntry.transformtype == "fill") {

                const ratio = parseInt(FormEntry.aspectRatio.split(':')[0]) / parseInt(FormEntry.aspectRatio.split(':')[1])
                const newHeight = Math.round(uploadImg.width / ratio)

                getTransform.height = newHeight

            }


            const NewURL = getCldImageUrl(getTransform)
            setTransformedImgURL(NewURL)

            AddImageSave(FormEntry, uploadImg, currentUser, NewURL, getTransform)
            UpdateUserCredit(currentUser.id, -1, false)





            statusFlag.isTransforming = false
            statusFlag.isTransformed = true


        }

        else {

            alert('Please fill in all the required fields')

        }

    }




    const handleSave = async () => {


        const response = await fetch(TransformedImgURL);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);



        const aElem = document.createElement('a')
        aElem.href = url
        aElem.download = FormEntry.title.replace(' ', '')
        document.body.appendChild(aElem)
        aElem.click()
        document.body.removeChild(aElem)

    }



    return (
        <div className="form-btn-box">

            <button
                className={`form-btn apply-btn ${!statusFlag.isUploadedImg ? 'disableBtn' : ''} `}
                onClick={handleApply}
                disabled={!statusFlag.isUploadedImg}
            >
                Apply Transformation
            </button>


            <button
                className={`form-btn save-btn ${!statusFlag.isTransformed ? 'disableBtn' : ''}`}
                onClick={handleSave}
                disabled={!statusFlag.isTransformed}
            >
                Save Image
            </button>

        </div>
    )
}

export default TransformationBtn