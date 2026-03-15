import mongoose, { Schema, Document } from 'mongoose'

export interface ILead extends Document {
  name: string
  company: string
  email: string
  phone: string
  budget: string
  services: string[]
  message: string
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    budget: {
      type: String,
      required: [true, 'Budget is required'],
      enum: ['1L-3L', '3L-5L', '5L-10L', '10L-15L', '15L+'],
    },
    services: {
      type: [String],
      required: [true, 'At least one service must be selected'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0
        },
        message: 'Please select at least one service',
      },
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
LeadSchema.index({ email: 1 })
LeadSchema.index({ createdAt: -1 })
LeadSchema.index({ status: 1 })

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)
