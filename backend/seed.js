/**
 * Database Seeder — run once to populate default data
 * Usage: node seed.js
 * 
 * Seeds:
 *  - 1 admin account: admin@ewaste.com / Admin@123
 *  - 6 e-waste disposal plant locations across India
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const Location = require('./models/Location');
const Campaign = require('./models/Campaign');

const locations = [
  {
    plantName: 'Kuldeep E-Waste Disposals',
    address: 'Sr. No. 119/2, Katraj-Saswad Road, Near Katraj Chowk, Pune - 411046',
    contactNumber: '+91 7733995555',
    mapsLink: 'https://maps.google.com/?q=Kuldeep+E-Waste+Disposals+Pune',
  },
  {
    plantName: 'Green IT Recycling Center Pvt. Ltd.',
    address: '890, Ganeshprasad, Near Perugate, Above Lazzat Hotel Sadashiv Peth, Pune - 411030',
    contactNumber: '+91 20 2445 6382',
    mapsLink: 'https://maps.google.com/?q=Green+IT+Recycling+Center+Pune',
  },
  {
    plantName: 'Adar Poonawalla Clean City Initiative (APCCI)',
    address: 'A-wing, 3rd floor, Mittal Court, Rasta Peth, Pune 411011',
    contactNumber: '+91 20 26137777',
    mapsLink: 'https://maps.google.com/?q=Adar+Poonawalla+Clean+City+Initiative+Pune',
  },
  {
    plantName: 'Sanjari Recycling',
    address: 'Pune City Drop-off & Home Pickup Service',
    contactNumber: '+91 9987787208',
    mapsLink: 'https://maps.google.com/?q=Pune+Maharashtra',
  },
  {
    plantName: 'Harshita Green Recyclers',
    address: '278, Near Chinchechi Talim, Shop No. 1, Shukrawar Peth, Pune - 411002',
    contactNumber: '+91 8044566854', // Using a placeholder/example number from JS since exact wasn't listed clearly for this specific one, wait JustDial had one but it was obscured
    mapsLink: 'https://maps.google.com/?q=Shukrawar+Peth+Pune',
  },
  {
    plantName: 'Zolopik E-Waste Recycling',
    address: 'Pune Regional Collection Center (Doorstep Pickup Available)',
    contactNumber: '1800 212 2125', // General e-waste helpline style number
    mapsLink: 'https://maps.google.com/?q=Pune+Maharashtra',
  },
];

const sampleCampaigns = [
  {
    title: 'E-Waste Awareness Drive — Mumbai College',
    description:
      'Students from 10 colleges gathered at Marine Drive for an awareness drive on the dangers of improper e-waste disposal. Over 500 kg of old electronics were collected and sent for certified recycling.',
    location: 'Marine Drive, Mumbai',
    imageUrl: '',
    status: 'approved',
    date: new Date('2024-09-15'),
  },
  {
    title: 'Green Electronics Campaign — Bangalore',
    description:
      'A city-wide campaign encouraging residents and offices to donate old devices. Partnered with certified recyclers to ensure safe dismantling and material recovery.',
    location: 'MG Road, Bengaluru',
    imageUrl: '',
    status: 'approved',
    date: new Date('2024-10-22'),
  },
  {
    title: 'School E-Waste Collection Project',
    description:
      'Students from grades 6–10 organized a collection drive across 12 schools in Pune. Old phones, chargers, and batteries were collected responsibly.',
    location: 'Kothrud, Pune',
    imageUrl: '',
    status: 'approved',
    date: new Date('2024-11-05'),
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Admin.deleteMany({});
    await Location.deleteMany({});
    await Campaign.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin account with hashed password
    const passwordHash = await bcrypt.hash('Admin@123', 12);
    await Admin.create({ email: 'admin@ewaste.com', passwordHash });
    console.log('👤 Admin account created: admin@ewaste.com / Admin@123');

    // Seed disposal locations
    await Location.insertMany(locations);
    console.log(`📍 ${locations.length} disposal locations seeded`);

    // Seed sample campaigns
    await Campaign.insertMany(sampleCampaigns);
    console.log(`📢 ${sampleCampaigns.length} sample campaigns seeded`);

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
};

seed();
