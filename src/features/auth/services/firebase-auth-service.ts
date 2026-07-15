import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "@firebase/auth";

import { firebaseAuth } from "../lib/firebase";
import type { AuthSubmitValues } from "../types/auth";

export class EmailNotVerifiedError extends Error {
  constructor() {
    super("Vui long xac thuc email truoc khi dang nhap.");
    this.name = "EmailNotVerifiedError";
  }
}

export function getCurrentFirebaseUser() {
  return firebaseAuth.currentUser;
}

export function waitForFirebaseUser() {
  return new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      (error) => {
        unsubscribe();
        reject(error);
      },
    );
  });
}

export async function registerWithEmail(values: AuthSubmitValues) {
  const credential = await createUserWithEmailAndPassword(
    firebaseAuth,
    values.email,
    values.password,
  );

  if (values.fullName) {
    await updateProfile(credential.user, {
      displayName: values.fullName,
    });
  }

  await sendEmailVerification(credential.user);

  return credential.user;
}

export async function signInWithEmail(values: AuthSubmitValues) {
  const credential = await signInWithEmailAndPassword(
    firebaseAuth,
    values.email,
    values.password,
  );

  if (!credential.user.emailVerified) {
    await sendEmailVerification(credential.user).catch(() => undefined);
    await signOutFirebase();
    throw new EmailNotVerifiedError();
  }

  return credential.user;
}

export async function signInWithGoogleIdToken(idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(firebaseAuth, credential);

  return result.user;
}

export async function getFirebaseIdToken(forceRefresh = false) {
  const user = firebaseAuth.currentUser;

  if (!user) {
    return null;
  }

  return user.getIdToken(forceRefresh);
}

export async function resendVerificationEmail() {
  const user = firebaseAuth.currentUser;

  if (!user) {
    throw new Error("Khong tim thay tai khoan dang nhap.");
  }

  await sendEmailVerification(user);
}

export async function signOutFirebase() {
  await signOut(firebaseAuth);
}

export function getFirebaseAuthErrorMessage(error: unknown) {
  if (error instanceof EmailNotVerifiedError) {
    return "Email chua duoc xac thuc. Chung toi da gui lai email xac thuc, vui long kiem tra hop thu.";
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Email nay da duoc dang ky.";
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Email hoac mat khau khong dung.";
      case "auth/invalid-email":
        return "Email chua dung dinh dang.";
      case "auth/network-request-failed":
        return "Khong the ket noi Firebase. Vui long kiem tra mang va thu lai.";
      case "auth/popup-closed-by-user":
      case "auth/cancelled-popup-request":
        return "Ban da huy dang nhap Google.";
      case "auth/too-many-requests":
        return "Tai khoan tam thoi bi gioi han do thu qua nhieu lan. Vui long thu lai sau.";
      default:
        break;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Khong the xu ly yeu cau dang nhap. Vui long thu lai.";
}
