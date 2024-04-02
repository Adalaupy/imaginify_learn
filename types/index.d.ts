declare type TransformationTypeKey =
    | "restore"
    | "fill"
    | "remove"
    | "recolor"
    | "removeBackground";


declare type SearchParamProps = {
    params: { id: string; type: TransformationTypeKey };
    searchParams: { [key: string]: string | string[] | undefined };
};



declare type MyContextType = {
    FormEntry: FormType;
    setFormEntry: Dispatch<SetStateAction<FormType>>;
    uploadImg: UploadImgType;
    setUploadImg: Dispatch<SetStateAction<UploadImgType>>;
    TransformedImgURL: string;
    setTransformedImgURL: Dispatch<SetStateAction<string>>;
    currentUser: { [key: string]: any },
    setcurrentUser: Dispatch<SetStateAction<{ [key: string]: any }>>
    setcurrentUser
    statusFlag: { [key: string]: boolean };
    setstatusFlag: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}



declare type FormType = {
    title: string;
    aspectRatio: string;
    color: string;
    prompt: string;
    publicId: string;
    config: { [key: string]: any };
    transformtype: string;
}

