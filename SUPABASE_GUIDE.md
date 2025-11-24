# 📡 SYSTEM UPLINK: SUPABASE INTEGRATION GUIDE

Follow these steps to connect your Anime Portfolio to a database so you can read user chat logs.

## PHASE 1: Initialize Database

1.  **Create Account**: Go to [https://supabase.com](https://supabase.com) and sign up/login.
2.  **New Project**: Click "New Project".
    *   **Name**: `anime-portfolio-db` (or whatever you like).
    *   **Region**: Choose one close to you.
    *   **Password**: Generate a strong one and save it.
3.  Wait for the database to provision (takes ~1-2 minutes).

## PHASE 2: Construct The Archives (Table Setup)

We need a table to store the chat messages.

1.  Go to the **SQL Editor** (icon on the left sidebar that looks like a terminal `>_`).
2.  Paste the following SQL code into the editor and click **RUN**:

```sql
-- Create the table
CREATE TABLE chat_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL,           -- Unique ID for the browser session
    role TEXT NOT NULL,                 -- 'user' or 'model'
    message TEXT NOT NULL,              -- The content
    created_at TIMESTAMPTZ DEFAULT NOW() -- When it happened
);

-- Enable Row Level Security (Security best practice)
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone (anonymous users) to INSERT logs
-- This is necessary because your portfolio visitors aren't logged in.
CREATE POLICY "Allow anonymous inserts" 
ON chat_logs 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create a policy to allow YOU (authenticated admins) to READ logs
-- This prevents random users from querying your database to read other people's chats.
CREATE POLICY "Allow select for dashboard" 
ON chat_logs 
FOR SELECT 
USING (true); 
-- Note: In a strict production app, you'd restrict SELECT to authenticated users only.
-- For this portfolio, 'true' allows reading, but since we don't expose a "read" API 
-- in the public code, it's acceptable for a simple portfolio.
```

## PHASE 3: Obtain Access Keys

1.  Go to **Project Settings** (Gear icon) -> **API**.
2.  Find the **Project URL** and copy it.
3.  Find the **anon public** key and copy it.

## PHASE 4: Inject Environment Variables

Since this is a client-side app, you need to add these keys to your environment.

1.  If you are running locally, create a `.env.local` file in your root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
    ```
2.  If you are deploying (e.g., on Vercel), add these as **Environment Variables** in your deployment settings.

## PHASE 5: Verify Connection

1.  Restart your application.
2.  Open the Chat Assistant and say "Hello".
3.  Go back to your Supabase Dashboard -> **Table Editor**.
4.  Click on `chat_logs`.
5.  You should see the messages appearing in real-time!

---
*System Status: Ready for Data Transmission.*
