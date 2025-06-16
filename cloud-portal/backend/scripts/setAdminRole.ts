// scripts/setAdminRole.ts

import admin from '../lib/firebaseAdmin';

async function setAdminRole(uid: string) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
    console.log(`✅ Role 'admin' set for user ${uid}`);
  } catch (error) {
    console.error('❌ Failed to set role:', error);
  }
}

// Replace this with the actual Firebase UID of your user
const uid = '72alh5hBVQaqY2kHUoGUYK7ypQi2';

setAdminRole(uid);
