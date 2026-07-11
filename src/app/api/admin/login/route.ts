import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "earls_group_secret_key_2026";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Please enter email and password" }, { status: 400 });
    }

    let adminUser = null;
    let passwordMatch = false;

    try {
      await dbConnect();
      adminUser = await Admin.findOne({ email }).lean();
      
      if (adminUser) {
        passwordMatch = await bcrypt.compare(password, adminUser.passwordHash);
      }
    } catch (dbErr) {
      console.warn("MongoDB connection failed on login, falling back to static admin credentials.");
    }

    // Static fallback credentials
    if (!adminUser && email === "admin@earlsgroup.lk" && password === "luxuryRedefined2026") {
      adminUser = {
        _id: "static_admin_id",
        email: "admin@earlsgroup.lk",
        name: "Earls Admin",
        role: "admin",
      };
      passwordMatch = true;
    }

    if (!adminUser || !passwordMatch) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: adminUser._id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        name: adminUser.name,
        email: adminUser.email,
      },
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json({ success: false, error: error.message || "An error occurred" }, { status: 500 });
  }
}
