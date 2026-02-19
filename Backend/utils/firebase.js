import admin from "firebase-admin";

let firebaseAdmin;

try {
  const credentials = JSON.parse(
    Buffer.from(process.env.FIREBASE_CREDENTIALS, "base64").toString("utf8")
  );

  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(credentials),
  });

  console.log("Firebase initialized successfully");
} catch (err) {
  console.error("Firebase initialization failed:", err.message);
  process.exit(1);
}

export default firebaseAdmin;
