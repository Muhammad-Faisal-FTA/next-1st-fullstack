//  The  two  video api controller are written here GET and POST

import { authOptions } from "@/lib/auth";
import { dbConnector } from "@/lib/db";
import Video, { IV } from "@/models/video.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const print = console.log;

export async function GET() {
    // get all the videos from the database
    try {
        await dbConnector();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        if(!videos || videos.length === 0){  
            return NextResponse.json([], { status: 404 });
        }

        return NextResponse.json(videos, { status: 200 });

    }catch(error){
        print("Error fetching videos:", error);
        return NextResponse.json("Error fetching videos", { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    // add a new video to the database
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        await dbConnector();

        const body: IV = await request.json();
        
        if (
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnail ||
            !body.transformation ||
            !body.category 
        ) {
            return NextResponse.json("Missing required fields", { status: 400 });
        }
        
        const videoData = {
            ...body,
            transformation: {
                height: body.transformation.height || 1024,
                width: body.transformation.width || 780,
            },
            controls: {
                play: body.controls?.play ?? true,
                pause: body.controls?.pause ?? false,
                stop: body.controls?.stop ?? false,
            },

    }


        const video = await Video.create(videoData);
        return NextResponse.json(video, { status: 201 });
    } catch (error) {
        print("Error creating video:", error);
        return NextResponse.json("Error creating video", { status: 500 });
    }
}