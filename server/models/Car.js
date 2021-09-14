import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
      minlength: 3,
      // NOTE enum is a list to choose from.
      // enum: ['toyota', 'tesla', 'honda', 'kia', 'bmw'],
      lowercase: true
    },
    model: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    year: {
      type: Number,
      required: true,
      min: 1919
    },
    img: {
      type: String,
      default: 'https://toppng.com/uploads/preview/vehicle-placeholder-2018-tesla-model-x-black-tesla-model-x-100d-11562942802drxuerxeyp.png',
      minlength: 8
    },
    description: {
      type: String,
      required: true
    },

    // NOTE this is a relationship more here later
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
