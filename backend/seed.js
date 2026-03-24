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
    plantName: 'PCMC E-waste recycling and plastic Recyling & Hobby Center',
    address: 'Pune, Maharashtra',
    contactNumber: '090288 54102',
    mapsLink: 'https://maps.google.com/?q=PCMC+E-waste+recycling',
  },
  {
    plantName: 'Vozon ComSof Pvt Ltd. E-Waste Recycling',
    address: 'Sr.No 19/9 Buchade Vasti, Near, Indira College Road',
    contactNumber: '086007 26007',
    mapsLink: 'https://maps.google.com/?q=Vozon+ComSof+Pvt+Ltd+E-Waste+Recycling',
  },
  {
    plantName: 'PCMC SWaCH V Collect center',
    address: 'Darshanvari Society',
    contactNumber: 'N/A',
    mapsLink: 'https://maps.google.com/?q=PCMC+SWaCH+V+Collect+center',
  },
  {
    plantName: 'Enrich Tech - A waste management company',
    address: '3rd floor, Kant Helix, 411033, Bhoir Colony Rd',
    contactNumber: '095119 09997',
    mapsLink: 'https://maps.google.com/?q=Enrich+Tech+waste+management+company',
  },
  {
    plantName: 'Grecycle scrap center',
    address: 'Pune, Maharashtra',
    contactNumber: '088558 84582',
    mapsLink: 'https://maps.google.com/?q=Grecycle+scrap+center+Pune',
  },
  {
    plantName: 'SK Scrap Center',
    address: 'Old Kate Road, near Roshni Seles',
    contactNumber: '099601 21764',
    mapsLink: 'https://maps.google.com/?q=SK+Scrap+Center+Old+Kate+Road',
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
