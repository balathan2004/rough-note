// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UserCredResponse, userInterface } from "@/components/utils/interfaces";
import { getDoc } from "firebase/firestore";
import { firestore_admin } from "@/components/firebase_configs/firebase_admin";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserCredResponse>,
) {

    const uid=req.cookies.roughnote_uid || false

    if(uid){
    const userData:userInterface= (await firestore_admin.collection('users').doc(uid).get()).data() as userInterface
    
    res.json({status:200,message:"details fetched",credentials:userData}) 
    }

}
