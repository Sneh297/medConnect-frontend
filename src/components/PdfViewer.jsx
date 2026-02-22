import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, AlertCircle } from 'lucide-react';
import React from 'react';

export default function PdfViewer({ url }) {
    const [embedFailed, setEmbedFailed] = useState(false);

    if (!url || url.trim() === '') {
        return (
            <div className="flex flex-col items-center justify-center h-40 gap-3 rounded-xl bg-white/5 border border-white/10">
                <AlertCircle className="w-8 h-8 text-slate-500" />
                <p className="text-sm text-slate-500">No payment proof attached</p>
            </div>
        );
    }

    // Normalize Google Drive URLs for embedding
    const getEmbedUrl = (raw) => {
        const driveMatch = raw.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
            return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
        }
        return raw;
    };

    const embedUrl = getEmbedUrl(url);

    if (embedFailed) {
        return (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-48 gap-4 rounded-xl bg-white/5 border border-white/10"
            >
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-red-400" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-white">PDF Preview Unavailable</p>
                    <p className="text-xs text-slate-500 mt-1">The file may require authentication</p>
                </div>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 btn-primary text-sm py-2 px-4"
                >
                    <ExternalLink className="w-4 h-4" />
                    View PDF
                </a>
            </motion.div>
        );
    }

    return (
        <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-slate-900">
            <iframe
                src={embedUrl}
                className="w-full h-72"
                title="Payment Proof PDF"
                onError={() => setEmbedFailed(true)}
                allow="autoplay"
            />
            <div className="absolute top-2 right-2">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-black/60 hover:bg-black/80 
                     text-white border border-white/20 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors"
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open in Tab
                </a>
            </div>
        </div>
    );
}
