from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import io
import pdfplumber
from supabase import create_client, Client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://YOUR_PROJECT.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "YOUR_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/parse-resume")
async def parse_resume(file: UploadFile, job_id: str = Form(...), user_id: str = Form(...)):
    content = await file.read()
    skills = []
    text = ""

    if file.filename.endswith(".pdf"):
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            text = "\n".join(page.extract_text() or "" for page in pdf.pages)
            if "Python" in text: skills.append("Python")
            if "SQL" in text: skills.append("SQL")
            if "AI" in text or "ML" in text: skills.append("AI/ML")

    data = {
        "candidate_id": user_id,
        "job_id": job_id,
        "resume_url": None,  # set a real URL if you upload to Storage
        "parsed_skills": skills,
        "status": "applied"
    }
    supabase.table("job_applications").insert(data).execute()

    return {"status": "success", "skills": skills}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
