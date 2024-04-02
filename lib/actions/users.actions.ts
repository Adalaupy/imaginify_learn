"use server"

import { currentUser } from "@clerk/nextjs"




export const GetCurrentLogin = async () => {

    const user = await currentUser()

    const thisUser = {
        id: user?.id.replace('user_', ''),
        email: user?.externalAccounts[0]?.emailAddress,
        username: user?.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        image: user?.imageUrl,
    }

    return thisUser
}



export const FindIsUserExists = async (userid: string) => {

    if (userid !== '') {

        const response = await fetch(`http://localhost:4000/User?id=${userid}`)
        const data = await response.json()

        if (data.length == 0) return true
    }

    return false

}





export const HandleLoginUser = async () => {

    const user = await GetCurrentLogin()
    const userId = user?.id || ''

    const isExist = await FindIsUserExists(userId)


    if (isExist) createNewUser()


    return user

}





export async function createNewUser() {

    const getUser = await GetCurrentLogin()
    const thisUser = { ...getUser, creditBalance: 0, isFreeUsed: false }

    fetch(`http://localhost:4000/User/`,
        {
            method: "POST",
            body: JSON.stringify(thisUser),
            headers: { "Content-Type": "application/json" }
        }
    )
        .then(response => { })
        .catch(error => { })

}





export async function FindUserByID(id: string) {

    const response = await fetch(`http://localhost:4000/User?id=${id}`)
    const data = await response.json()

    return data[0]

}




export async function UpdateUserCredit(id: string, creditChange: number, isFree: boolean = false) {


    const user = await FindUserByID(id)
    const newCredit = user.creditBalance + creditChange
    const newRecord = { ...user, creditBalance: newCredit, isFreeUsed: isFree }



    const response = await fetch(`http://localhost:4000/User/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: { "Content-Type": "application/json" }
        }
    )

    return { status: response.status, creditBalance: newCredit }


}




export const GetCurrentUserInfo = async () => {


    const CurrentLogin = await GetCurrentLogin()
    const CurrentUser = await FindUserByID(CurrentLogin.id as string)

    return CurrentUser



}
