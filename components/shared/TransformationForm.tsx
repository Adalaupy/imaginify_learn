"use client"

import { aspectRatioOptions } from '@/constants'
import { useVariableContext } from '@/context/ContextProvider'
import { transformationTypes } from "@/constants"
import { useEffect } from 'react'
import { FormEntryInit } from "@/constants";


const TransformationForm = (currentType: { type: TransformationTypeKey }) => {

    const thisType = currentType.type
    const { FormEntry, setFormEntry, setTransformedImgURL } = useVariableContext()



    const handleFormChange = (type: string, value: string) => {


        let thisConfig = transformationTypes[thisType]['config'] as Record<string, any>
        const keyName = Object.keys(thisConfig)[0]


        if (type === 'color') thisConfig[keyName].to = value
        if (type === 'prompt') thisConfig[keyName].prompt = value

        setFormEntry({ ...FormEntry, [type]: value, config: thisConfig })

    }


    useEffect(() => {
        setFormEntry({ ...FormEntryInit, transformtype: thisType })

        setTransformedImgURL('')
    }, [])


    return (

        <form className='form-box'>

            {/* Image Title */}
            <div className="form-item-box">
                <p className="form-title">Image Title</p>
                <input className="form-input" type="text"
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    value={FormEntry.title}
                />
            </div>



            {/* Image aspectRatio */}
            {thisType == "fill" && (
                <div className="form-item-box">
                    <p className="form-title">Aspect Ratio</p>
                    <select
                        onChange={(e) => handleFormChange('aspectRatio', e.target.value)}
                        value={FormEntry.aspectRatio}
                        name="aspectratio" id="aspectratio"
                        className="ratio-box"
                    >

                        {Object.keys(aspectRatioOptions).map((key) => (
                            <option className='ratio-option' key={key} value={key}>
                                {aspectRatioOptions[key as keyof typeof aspectRatioOptions].label}
                            </option>

                        ))}
                    </select>
                </div>
            )}



            {/* Image Prompt */}
            {(thisType == "remove" || thisType == "recolor") && (
                <div className="form-item-box">
                    <p className="form-title">{thisType == "remove" ? 'Object to remove' : 'Object to recolor'}</p>
                    <input
                        className="form-input"
                        type="text"
                        onChange={(e) => handleFormChange('prompt', e.target.value)}
                        value={FormEntry.prompt}
                    />
                </div>
            )}



            {/* Image Color */}
            {thisType == "recolor" && (
                <div className="form-item-box">
                    <p className="form-title">Replacement Color</p>
                    <input
                        className="form-input"
                        type="text"
                        onChange={(e) => handleFormChange('color', e.target.value)}
                        value={FormEntry.color}
                    />
                </div>
            )}



        </form>
    )
}

export default TransformationForm