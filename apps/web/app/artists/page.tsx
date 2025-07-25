"use client";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  creator_name: string;
  description: string;
  profile_image_url?: string;
  tags?: string[];
  dna_visibility?: string;
  price?: number;
  license_type?: string;
  tracks_visibility?: string;
  become_partner?: boolean;
  audio_preview_url?: string;
  sensitivity?: number;
  status?: string;
  created_at?: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
        if (!backendUri) throw new Error("Backend URI not set");
        const res = await fetch(`${backendUri}/artists`);
        if (!res.ok) throw new Error("Failed to fetch artists");
        const data = await res.json();
        setArtists(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0f] p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">
      <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-4 xs:mb-6 sm:mb-8 ml-4 xs:ml-8 sm:ml-12 md:ml-16 lg:ml-0">Artists</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 md:gap-8 w-full">
          {artists.length === 0 && !error && (
            <div className="col-span-full flex flex-col items-center justify-center w-full px-2">
              <img src="/user.png" alt="No artists" className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3 xs:mb-4 border border-[#383838]" />
              <span className="text-[#bdbdbd] text-sm xs:text-base sm:text-lg text-center">No artists found.</span>
            </div>
          )}
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="relative rounded-2xl xs:rounded-3xl border-2 border-[#383838] flex flex-col justify-between items-stretch min-h-[320px] xs:min-h-[360px] sm:min-h-[400px] md:min-h-[440px] lg:min-h-[480px] max-h-[320px] xs:max-h-[360px] sm:max-h-[400px] md:max-h-[440px] lg:max-h-[480px] h-[320px] xs:h-[360px] sm:h-[400px] md:h-[440px] lg:h-[480px] p-0 transition-all duration-300 w-full max-w-[94vw] xs:max-w-[340px] sm:max-w-[350px] mx-auto bg-gradient-to-br from-[#1f1f1f]/90 via-[#232326]/80 to-[#2a2a2a]/90 shadow-xl hover:shadow-2xl hover:border-[#6A35EE] hover:scale-[1.04] group overflow-hidden"
              style={{
                boxShadow: '0 8px 32px 0 rgba(26, 18, 50, 0.25), 0 1.5px 8px 0 #6A35EE22',
                backdropFilter: 'blur(6px)',
              }}
            >
              {/* Card Header */}
              <div className="flex flex-col items-center p-3 xs:p-4 sm:p-6 pb-2">
                <div className="relative mb-3">
                  <img
                    src={"/user.png"}
                    alt={artist.creator_name}
                    className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full object-cover border-2 xs:border-4 border-[#6A35EE] shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    style={{ boxShadow: '0 0 0 4px #6A35EE22, 0 4px 24px 0 #6A35EE55' }}
                  />
                  <span className="absolute bottom-1 right-1 block w-4 h-4 rounded-full bg-gradient-to-tr from-[#6A35EE] to-[#C084FC] border-2 border-[#18181b] shadow-md"></span>
                </div>
                <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl text-white font-extrabold mb-1 text-center w-full truncate drop-shadow-lg tracking-tight">
                  {artist.creator_name}
                </h2>
                <div className="flex flex-wrap gap-1 xs:gap-2 mb-2 justify-center w-full">
                  {artist.tags && artist.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gradient-to-tr from-[#6A35EE]/90 to-[#C084FC]/80 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-[#6A35EE33]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Description with scroll */}
              <div className="px-2 xs:px-4 sm:px-6 mb-2">
                <div
                  className="rounded-xl p-2 xs:p-3 min-h-[40px] xs:min-h-[48px] sm:min-h-[56px] max-h-[64px] xs:max-h-[72px] sm:max-h-[80px] overflow-y-auto text-[#e0e0e0] text-sm xs:text-base font-semibold text-center custom-scrollbar backdrop-blur-md bg-white/5 border border-[#383838]/60 shadow-inner"
                  style={{ boxShadow: '0 2px 12px 0 #6A35EE11' }}
                >
                  {artist.description}
                </div>
              </div>
              {/* Card Attributes */}
              <div className="px-2 xs:px-4 sm:px-6 flex flex-col gap-1 mb-2">
                <div className="flex flex-wrap gap-1 xs:gap-2 justify-center">
                  <span className="bg-[#232326]/80 text-[#C084FC] text-[10px] xs:text-xs px-1.5 xs:px-2 py-1 rounded-lg font-bold shadow-sm">DNA: {artist.dna_visibility}</span>
                  <span className="bg-[#232326]/80 text-[#6A35EE] text-[10px] xs:text-xs px-1.5 xs:px-2 py-1 rounded-lg font-bold shadow-sm">{artist.price ? `$${artist.price}` : "Free"}</span>
                  <span className="bg-[#232326]/80 text-[#bdbdbd] text-[10px] xs:text-xs px-1.5 xs:px-2 py-1 rounded-lg font-bold shadow-sm">{artist.license_type}</span>
                  <span className="bg-[#232326]/80 text-green-400 text-[10px] xs:text-xs px-1.5 xs:px-2 py-1 rounded-lg font-bold shadow-sm">{artist.status}</span>
                </div>
              </div>
              {/* Card Footer */}
              <div className="w-full flex items-center justify-center px-2 xs:px-4 sm:px-6 pb-3 xs:pb-4 mt-auto">
                {artist.audio_preview_url && (() => {
  let previewUrl = artist.audio_preview_url;
  if (previewUrl.startsWith('/static/')) {
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI || '';
    previewUrl = backendUri.replace(/\/$/, '') + previewUrl;
  }
  return (
    <a
      href={previewUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group/audio relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-tr from-[#6A35EE]/90 to-[#C084FC]/80 shadow-lg hover:shadow-xl hover:from-[#C084FC] hover:to-[#6A35EE] transition-all text-white text-sm font-bold"
    >
      <svg className="w-5 h-5 text-white drop-shadow mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.518-3.89A1 1 0 007 8.618v6.764a1 1 0 001.234.97l6.518-1.868A1 1 0 0016 13.382v-2.764a1 1 0 00-1.248-.45z" />
      </svg>
      Listen Preview
    </a>
  );
})()}

              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add custom scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px sm:width-6px;
          background: #232326;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #383838;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
} 