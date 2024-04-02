"use client"

import { plans } from '@/constants'

import { GetCurrentUserInfo, UpdateUserCredit } from '@/lib/actions/users.actions'
import Image from 'next/image'

const page = () => {




    const handleBuyNow = (plan: any) => {


        if (confirm('Are you sure you want to buy this plan?')) {


            const CreditBalanceUpdate = async () => {


                const user = await GetCurrentUserInfo()
                const isFreeUsed = user.isFreeUsed


                const creditChange = plan.credits
                const userId = user?.id


                if (plan.name == 'Free' && isFreeUsed) {

                    alert('You have already used the free trial')

                    return
                }


                UpdateUserCredit(userId as string, creditChange, plan.name == 'Free' ? true : false)

            }

            CreditBalanceUpdate()

        }



    }

    return (


        <div className='credit-main'>


            {plans.map((plan) => (

                <div key={plan._id} className="plan-box">

                    <div className="credit-info">
                        <Image src={plan.icon} alt="check" width={50} height={50} />
                        <h2 className='plan-name'>{plan.name}</h2>
                        <p className='plan-price'>${plan.price}</p>
                        <p className='plan-credit'>{plan.credits} Credits</p>
                    </div>


                    <ul className="plan-inclusion-box">
                        {plan.inclusions.map((inclusion, index) => (
                            <li key={index} className='plan-inclusion'>
                                {inclusion.isIncluded ? (
                                    <Image src="/assets/icons/check.svg" alt="check" width={20} height={20} />
                                ) : (
                                    <Image src="/assets/icons/cross.svg" alt="cross" width={20} height={20} />
                                )}
                                {inclusion.label}
                            </li>
                        ))}
                    </ul>


                    <button
                        onClick={() => { handleBuyNow(plan) }}
                        className={`${plan.name == 'Free' ? 'free-btn' : 'buy-btn'} credit-btn`}>
                        {plan.name === "Free" ? "Free Trial" : "Buy Now"}
                    </button>

                </div>

            ))}

        </div >
    )
}

export default page