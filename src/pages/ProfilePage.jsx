import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import styles from "./UserAuth.module.css";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("grandRealtors_user"))
  );
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className={styles.authWrapper}>
        <h2>No Profile Found</h2>
        <p>Please sign up to create your profile.</p>

        <Link to="/signup" className={styles.mobileAuthBtn}>
          <Button variant="outline" size="lg">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, profilePic: reader.result };
        localStorage.setItem("grandRealtors_user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  // LOG OUT FUNCTION (just end session, keep account data)
  const handleLogout = () => {
    localStorage.removeItem("grandRealtors_loggedIn"); 
    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
    navigate("/signin");
  };

  // DELETE ACCOUNT FUNCTION (remove everything)
  const handleDeleteAccount = () => {
    localStorage.removeItem("grandRealtors_user");
    localStorage.removeItem("grandRealtors_loggedIn");
    toast({
      title: "Account deleted",
      description: "Your account has been permanently removed.",
      variant: "destructive",
    });
    navigate("/signup");
  };

  return (
    <div className={styles.authWrapper} style={{ maxWidth: 500 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 16 }}>
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt="Profile"
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #2563eb",
              background: "#f3f4f6",
            }}
          />
        </div>
        <h2 style={{ marginBottom: 8, fontWeight: 700, fontSize: "1.5rem" }}>
          {user.firstName} {user.lastName}
        </h2>
        <div
          style={{
            background: "#f9fafb",
            borderRadius: 12,
            padding: "1.5rem 1rem",
            width: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <strong>Email:</strong> <span>{user.email}</span>
            </div>
            <div>
              <strong>Sex:</strong> <span>{user.sex}</span>
            </div>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleProfilePicChange}
        />
        <button
          className={styles.button}
          style={{ marginTop: 8, width: 180 }}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          Change Photo
        </button>

        {/* LOG OUT BUTTON */
        <button
          className={styles.button}
          style={{ marginTop: 16, width: 180, background: "#3b82f6" }}
          onClick={handleLogout}
        >
          Log Out
        </button>
        }
        

        {/* DELETE ACCOUNT BUTTON */}
        <button
          className={styles.button}
          style={{ marginTop: 16, width: 180, background: "#ef4444" }}
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>

        {error && (
          <div style={{ color: "red", fontSize: "0.95rem", marginTop: 8 }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
