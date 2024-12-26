import bcrypt from "bcryptjs"
import { ComparePasswordType } from "@/types/authHelperTypes"
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest } from "next/server";


//compare password
const comparePassword = async ({ password, hashedPassword }: ComparePasswordType): Promise<Boolean> => {
    const result = await bcrypt.compareSync(password, hashedPassword);  // Returns true if the password matches the hashed password
    return result;
}


//encode jwt token
const encodeToken = (payload: object): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY || '');
    if (!token) {
        throw new Error('Failed to generate token');
    } else {
        return token;
    }
}


//decode jwt token
const decodeToken = (request: NextRequest): string => {
    try {
        //get token from request
        const token = request.cookies.get("token")?.value || " ";

        //decode token
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;

        if (!decodeToken) {
            throw new Error('Invalid token');
        }
        console.log("Print decoded token :", decodeToken); //TODO: Remove 
        return decodeToken?._id;
    } catch (error) {
        throw new Error('Invalid token');
    }
}


export { comparePassword, encodeToken, decodeToken }