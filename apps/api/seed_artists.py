import asyncio
from database import async_session, engine
from models import Artist, Base

async def seed_artists():
    # Ensure tables exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        # Dummy artist data
        artists = [
            Artist(
                creator_name="Alice DNA",
                description="Experimental electronic artist blending AI and human creativity.",
                profile_image_url="https://randomuser.me/api/portraits/women/1.jpg",
                tags=["electronic", "ai", "experimental"],
                dna_visibility="public",
                price=9.99,
                license_type="standard",
                tracks_visibility="visible",
                become_partner=True,
                audio_preview_url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                sensitivity=5,
                status="complete"
            ),
            Artist(
                creator_name="Bob Synth",
                description="Synthwave and retro artist with a futuristic twist.",
                profile_image_url="https://randomuser.me/api/portraits/men/2.jpg",
                tags=["synthwave", "retro", "futuristic"],
                dna_visibility="public",
                price=14.99,
                license_type="premium",
                tracks_visibility="visible",
                become_partner=False,
                audio_preview_url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                sensitivity=3,
                status="processing"
            ),
            Artist(
                creator_name="Chloe Beats",
                description="Hip-hop producer merging classic and modern sounds.",
                profile_image_url="https://randomuser.me/api/portraits/women/3.jpg",
                tags=["hip-hop", "producer", "modern"],
                dna_visibility="private",
                price=7.50,
                license_type="standard",
                tracks_visibility="invisible",
                become_partner=True,
                audio_preview_url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                sensitivity=7,
                status="pending"
            ),
            Artist(
                creator_name="Derek Flow",
                description="Ambient and chillout artist, perfect for relaxation.",
                profile_image_url="https://randomuser.me/api/portraits/men/4.jpg",
                tags=["ambient", "chillout", "relax"],
                dna_visibility="draft",
                price=5.00,
                license_type="free",
                tracks_visibility="visible",
                become_partner=False,
                audio_preview_url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                sensitivity=2,
                status="pending"
            ),
        ]
        session.add_all(artists)
        await session.commit()
        print(f"Seeded {len(artists)} artists.")

if __name__ == "__main__":
    asyncio.run(seed_artists()) 