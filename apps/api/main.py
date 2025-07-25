from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os, shutil
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
import crud, schemas
from typing import List
from uuid import UUID
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (audio previews)
static_dir = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/artists", response_model=List[schemas.Artist])
async def read_artists(db: AsyncSession = Depends(get_db)):
    return await crud.get_artists(db)

@app.get("/artists/{artist_id}", response_model=schemas.Artist)
async def read_artist(artist_id: UUID, db: AsyncSession = Depends(get_db)):
    artist = await crud.get_artist(db, artist_id)
    if artist is None:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist

@app.post("/artists", response_model=schemas.Artist)
async def create_artist(artist: schemas.ArtistCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_artist(db, artist)

@app.post("/upload-audio/")
async def upload_audio(file: UploadFile = File(...)):
    # Save the uploaded file to static dir
    file_ext = os.path.splitext(file.filename)[-1]
    save_path = os.path.join(static_dir, file.filename)
    # Ensure unique filename
    i = 1
    base, ext = os.path.splitext(file.filename)
    while os.path.exists(save_path):
        save_path = os.path.join(static_dir, f"{base}_{i}{ext}")
        i += 1
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    url = f"/static/{os.path.basename(save_path)}"
    return {"audio_preview_url": url}
