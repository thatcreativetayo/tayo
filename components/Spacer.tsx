"use client"
import Image from "next/image";

export default function Spacer() {
    return (
        <div className="bg-[#FAFAFA] text-primary h-16 w-full max-w-304 flex relative">
            {/* Top dashed border */}
            <div className="absolute left-0 top-0 z-40 border-t w-full text-black/10 border-long-dashed2"></div>
            {/* Bottom dashed border */}
            <div className="absolute left-0 bottom-0 z-40 border-t w-full text-black/10 border-long-dashed2"></div>
            {/* Hatched area */}
            <div className="flex-1 self-stretch relative overflow-hidden">
                <div className="absolute left-[-40px] top-[-120px] flex flex-col">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 w-[200vw] -rotate-45 origin-top-left border border-[#EDEDED]"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
