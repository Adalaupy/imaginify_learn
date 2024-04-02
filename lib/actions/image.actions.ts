

const GetCurrentImage = (FormEntry: FormType, uploadImg: any, currentUser: any, TransformedImgURL: string, getTransform: any) => {

    const thisImageInfo = {

        title: FormEntry.title,
        transform_type: FormEntry.transformtype,
        publicId: uploadImg.publicId,
        secureURL: uploadImg.secureUrl,
        transFormedURL: TransformedImgURL,
        width: uploadImg.width,
        height: uploadImg.height,
        config: FormEntry.config,
        color: FormEntry.color,
        aspectRatio: FormEntry.transformtype == "fill" ? FormEntry.aspectRatio : "",
        prompt: FormEntry.prompt,
        author: currentUser.id,
        createAt: new Date(),
        updateAt: new Date(),
        newWidth: getTransform.width,
        newHeight: getTransform.height,

    }


    return thisImageInfo
}




export const AddImageSave = (FormEntry: FormType, uploadImg: any, currentUser: any, TransformedImgURL: string, getTransform: any) => {

    const thisImageInfo = GetCurrentImage(FormEntry, uploadImg, currentUser, TransformedImgURL, getTransform)

    fetch('http://localhost:4000/Image/',
        {
            method: "POST",
            body: JSON.stringify(thisImageInfo),
            headers: { "Content-Type": "application/json" }
        }
    )
        .then(response => { })
        .catch(error => { })

}





export const Get_ImageList = async () => {

    const response = await fetch('http://localhost:4000/Image/')
    const data = await response.json()

    return data
}




export const Get_Image_ByID = async (id: string) => {

    const response = await fetch(`http://localhost:4000/Image?id=${id}`)
    const data = await response.json()

    return data
}



export const Get_Image_ByAuthor = async (author: string) => {

    const response = await fetch(`http://localhost:4000/Image?author=${author}`)
    const data = await response.json()


    return data
}