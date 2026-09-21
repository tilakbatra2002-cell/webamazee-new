import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    company: { type: String, trim: true, default: '', maxlength: 160 },
    email: { type: String, trim: true, lowercase: true, default: '', maxlength: 200 },
    phone: { type: String, trim: true, default: '', maxlength: 60 },
    address: { type: String, trim: true, default: '', maxlength: 300 },
    city: { type: String, trim: true, default: '', maxlength: 120 },
    state: { type: String, trim: true, default: '', maxlength: 120 },
    country: { type: String, trim: true, default: '', maxlength: 120 },
    postalCode: { type: String, trim: true, default: '', maxlength: 40 },
    taxNumber: { type: String, trim: true, default: '', maxlength: 60 },
    notes: { type: String, trim: true, default: '', maxlength: 2000 },
  },
  { timestamps: true }
);

customerSchema.index({ name: 1 });
customerSchema.index({ email: 1 });

customerSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export const Customer = mongoose.model('Customer', customerSchema);
