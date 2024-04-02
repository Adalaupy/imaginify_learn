import MediaTransform from "@/components/shared/MediaTransform"
import MediaUploader from "@/components/shared/MediaUploader"
import TransformationBtn from "@/components/shared/TransformationBtn"
import TransformationForm from "@/components/shared/TransformationForm"
import { transformationTypes } from "@/constants"


const page = (PageParam: SearchParamProps) => {

    const currentType = PageParam.params.type
    const thisTransform = transformationTypes[currentType]





    return (

        <div className="transform-box">


            <div className="transform-title">
                <h1>{thisTransform.title}</h1>
                <p>{thisTransform.subTitle}</p>
            </div>


            <div className="transform-form">
                <TransformationForm type={currentType as TransformationTypeKey} />
            </div>


            <div className="media-box transform-img">
                <MediaUploader />
                <MediaTransform />
            </div>


            <TransformationBtn />




        </div>
    )

}

export default page