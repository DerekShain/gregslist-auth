import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
      minlength: 3,
      // enum: ['toyota', 'tesla', 'honda', 'kia', 'bmw'],     // NOTE enum is a list to choose from.
      lowercase: true
    },
    model: {
      type: String,
      required: [true, 'who makes it?']
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

CarSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
