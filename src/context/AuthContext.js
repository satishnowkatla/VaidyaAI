import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as Crypto from "expo-crypto";
import { createContext, useContext, useEffect, useState } from "react";

const USER_KEY = "vaidyaai_user";
const AuthContext = createContext();

const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "YOUR_GOOGLE_WEB_CLIENT_ID";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_KEY)
      .then((data) => {
        if (data) setUser(JSON.parse(data));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_WEB_CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({ scheme: "vaidyaai" }),
      scopes: ["profile", "email"],
      usePKCE: true,
      nonce: Crypto.randomUUID(),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (accessToken) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        photo: data.picture,
      };
      setUser(userData);
      AsyncStorage.setItem(USER_KEY, JSON.stringify(userData)).catch(() => {});
    } catch (e) {
      console.warn("Failed to fetch user info:", e);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (e) {
      console.warn("Google login error:", e);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginWithGoogle, logout, request }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
