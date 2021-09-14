import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const HouseSchema = new Schema(
  {
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    levels: {
      type: Number,
      required: true
    },
    img: {
      type: String
    },
    year: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String
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

HouseSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
