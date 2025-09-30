#!/usr/bin/env node

// Helper script to update .env.local with Supabase credentials
// Usage: node scripts/update-env.js <PROJECT_URL> <ANON_KEY>

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: node scripts/update-env.js <PROJECT_URL> <ANON_KEY>');
  console.error('Example: node scripts/update-env.js https://abcdef.supabase.co eyJhbGciOiJIUzI1NiIs...');
  process.exit(1);
}

const [projectUrl, anonKey] = args;
const envPath = path.join(__dirname, '..', '.env.local');

// Validate URL format
if (!projectUrl.startsWith('https://') || !projectUrl.includes('.supabase.co')) {
  console.error('Error: PROJECT_URL should be in format: https://your-project.supabase.co');
  process.exit(1);
}

// Update .env.local file
const envContent = `NEXT_PUBLIC_SUPABASE_URL=${projectUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Successfully updated .env.local with Supabase credentials');
  console.log(`Project URL: ${projectUrl}`);
  console.log(`Anon Key: ${anonKey.substring(0, 20)}...`);
} catch (error) {
  console.error('❌ Error updating .env.local:', error.message);
  process.exit(1);
}