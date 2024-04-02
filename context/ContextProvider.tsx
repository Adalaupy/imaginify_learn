"use client"


import { FormEntryInit } from "@/constants";
import { useContext, createContext, useState, ReactNode } from "react";



const VariableContext = createContext<MyContextType>({} as MyContextType);



export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


    const [FormEntry, setFormEntry] = useState<FormType>(FormEntryInit)
    const [uploadImg, setUploadImg] = useState({} as any)
    const [TransformedImgURL, setTransformedImgURL] = useState("" as string)
    const [currentUser, setcurrentUser] = useState({} as any)
    const [statusFlag, setstatusFlag] = useState({
        isDownloading: false,
        isTransforming: false,
        isUploadedImg: false,
        isTransformed: false,
    })



    return (
        <VariableContext.Provider value={{
            FormEntry, setFormEntry,
            uploadImg, setUploadImg,
            TransformedImgURL, setTransformedImgURL,
            currentUser, setcurrentUser,
            statusFlag, setstatusFlag
        }}>
            {children}
        </VariableContext.Provider>

    )
}


export const useVariableContext = () => useContext(VariableContext);