const { db } = require('../config/firebase');

const USERS = 'users';

class User {
  // Create/merge a Firestore profile doc for a Firebase Auth user.
  // Called right after Firebase client-side signup completes.
  static async createProfile(uid, email, username) {
    await db.collection(USERS).doc(uid).set(
      {
        email,
        username,
        is_admin: false,
        c_id: null,
        s_id: null,
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return this.findByUid(uid);
  }

  static async findByUid(uid) {
    const snap = await db.collection(USERS).doc(uid).get();
    return snap.exists ? { id: snap.id, ...snap.data() } : null;
  }

  static async findByEmail(email) {
    const snap = await db.collection(USERS).where('email', '==', email).limit(1).get();
    if (snap.empty) return null;
    const docSnap = snap.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  }

  // Link a user's card/subscription record ids (equivalent of the old
  // c_id / s_id foreign keys). Call these after cards/subscriptions are
  // written to their own Firestore collections.
  static async setCardId(uid, cId) {
    await db.collection(USERS).doc(uid).update({ c_id: cId });
  }

  static async setSubscriptionId(uid, sId) {
    await db.collection(USERS).doc(uid).update({ s_id: sId });
  }
}

module.exports = User;
