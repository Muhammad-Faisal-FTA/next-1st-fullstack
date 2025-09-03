import { Schema, model, models } from "mongoose";

interface IU {
    name:string;
    email: string;
    password: string
    dob: Date;
    profession: string;
}

const userSchema = new Schema<IU>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  dob: { type: Date, required: true},
  profession: { type: String, required: true}
}, {timestamps: true});

const User = models.User || model<IU>("User", userSchema);

export default User;
