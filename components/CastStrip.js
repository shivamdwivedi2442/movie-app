import Image from "next/image";
import { IMG } from "@/lib/tmdb";
import { User } from "lucide-react";

export default function CastStrip({ cast }) {
  if (!cast.length) return null;
  return (
    <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: "thin" }}>
      {cast.slice(0, 12).map((member) => {
        const photo = IMG.profile(member.profile_path);
        return (
          <div key={member.id} className="w-24 flex-shrink-0 text-center">
            <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border border-stage-700 bg-stage-800">
              {photo ? (
                <Image src={photo} alt={member.name} fill sizes="96px" className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-8 w-8 text-mist-500" aria-hidden />
                </div>
              )}
            </div>
            <p className="mt-2 truncate text-xs font-medium text-mist-200">{member.name}</p>
            <p className="truncate text-[11px] text-mist-500">{member.character}</p>
          </div>
        );
      })}
    </div>
  );
}