import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import {dbConnector} from "@/lib/db";
import {hash} from "bcryptjs"
const print = console.log;


export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { name, email, password, dob, profession } = body;

        // Basic validation
        if (!name || !email ||!password || !dob || !profession) {
            return NextResponse.json({
                message: `All fields are required: ${name} ${email} ${password} ${dob} ${profession}`,
                Error: `${!name ? "Name" : ""} ${!email ? "Email" : ""} ${!password ? "Password" : ""} is missing ${!dob ? "DOB" : ""} ${!profession ? "Profession" : ""}`
            }, 
            {
                status: 400
            })
        }
        if (password.length < 4) {
            return NextResponse.json({
                message: `Password must be at least 4 characters long`
            })
        }

        await dbConnector();
        setTimeout(async() => {
            const existingUser = await User.findOne({
                email: email, 
                name: name
            })
            if (existingUser) {
                return NextResponse.json({
                    message: `User with email ${email} and name ${name} already exists`
                })
            }
        }, 1000);
        


        const hashedPassword = await hash(password, 12);
        const user = await User.create({
            name,
            email, 
            password: hashedPassword, 
            dob, 
            profession
         });
        // await user.save();
        print("New User Created:", user);
        return NextResponse.json({ 
            message: "User registered successfully!" ,
        },{
            status: 201
        });
        print("User registered successfully!")
    } catch (error) {
        return NextResponse.json({ message: `Internal Server Error ${error}` }, { status: 500 });
    }
}