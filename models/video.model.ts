import {Schema, model, models} from "mongoose";

export const Video_Dimension = {
    height: 1024,
    width: 780
} as const

 export interface IV {
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string; // url of the thumbnail image
    transformation: {
        height: { type: number, default: 100 };
        width: { type: number, default: 100 };
        quality: {type: number, min: 1, max: 100 }; // e.g., 1080, 720
        format: "mp4"
    };
    controls?:{
        play: boolean;
        pause: boolean;
        stop: boolean;
    };
    category: string[]
}


const videoSchema = new Schema<IV>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String, required: true },
    transformation:{
        height: { type: Number, default: Video_Dimension.height},
        width: { type: Number, default: Video_Dimension.width},
        quality: { type : Number, min: 1, max: 100, default: 80 }, // e.g., 1080, 720
    },
    controls: {
        play: { type: Boolean, default: true },
        pause: { type: Boolean, default: false },
        stop: { type: Boolean, default: false },
    },
    category:{ type: [String] , required: true}
}, { timestamps: true });

const Video = models?.Video || model<IV>("Video", videoSchema);

export default Video;
