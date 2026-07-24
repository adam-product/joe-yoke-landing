import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download as DownloadIcon } from 'lucide-react';
import { useContent } from './admin/ContentContext';
import { trackEvent } from './App';
import faviconImg from '@/imports/favicon.ico-1.jpg';
// Updated to .png below!
import appleStoreIcon from '@/imports/Apple App Store icon.png';
import googlePlayIcon from '@/imports/Google Play Store icon.png';

// Helper to strip HTML tags and sanitize URLs
const cleanText = (str: string) => {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
};

const cleanUrl = (rawUrl: string) => {
  let url = cleanText(rawUrl);
  if (!url) return '';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url;
};

export default function DownloadPage() {
  const navigate = useNavigate();
  const { get } = useContent();

  const title = cleanText(get('downloads', 'pageTitle')) || 'Get Joe Yoke';
  const subtitle = cleanText(get('downloads', 'pageSubtitle')) || 'Choose your platform to start playing.';
  const playStoreUrl = cleanUrl(get('downloads', 'playStoreLink'));
  const appStoreUrl = cleanUrl(get('downloads', 'appStoreLink'));
  const directUrl = cleanUrl(get('downloads', 'directLink'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = (platform: string, url: string) => {
    trackEvent(`${platform}_download_click`);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert('Download link has not been configured yet.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col relative overflow-hidden font-sans antialiased text-white">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5FF00]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 md:p-10">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <img src={faviconImg} alt="Joe Yoke" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-black text-sm tracking-tighter uppercase">Joe Yoke</span>
        </div>
        <div className="w-16" /> 
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md flex flex-col items-center gap-8"
        >
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">{title}</h1>
            <p className="text-white/50 text-sm md:text-base">{subtitle}</p>
          </div>

          <div className="w-full flex flex-col gap-4">
            
            {/* Apple App Store Button with Custom Icon */}
            <button 
              onClick={() => handleDownload('apple', appStoreUrl)}
              className="w-full group relative flex items-center p-4 bg-[#111] border border-white/10 rounded-2xl hover:border-[#C5FF00]/50 hover:bg-[#C5FF00]/5 transition-all duration-300 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform bg-black flex items-center justify-center">
                <img src={appleStoreIcon} alt="Apple App Store" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start ml-4">
                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Download on the</span>
                <span className="text-xl font-bold text-white">App Store</span>
              </div>
            </button>

            {/* Google Play Store Button with Custom Icon */}
            <button 
              onClick={() => handleDownload('google', playStoreUrl)}
              className="w-full group relative flex items-center p-4 bg-[#111] border border-white/10 rounded-2xl hover:border-[#C5FF00]/50 hover:bg-[#C5FF00]/5 transition-all duration-300 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform bg-black flex items-center justify-center">
                <img src={googlePlayIcon} alt="Google Play Store" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start ml-4">
                <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Get it on</span>
                <span className="text-xl font-bold text-white">Google Play</span>
              </div>
            </button>

            {/* Direct APK Download Option */}
            {directUrl && (
              <>
                <div className="flex items-center gap-4 my-2 opacity-30">
                  <div className="flex-1 h-[1px] bg-white" />
                  <span className="text-xs font-bold uppercase tracking-widest">OR</span>
                  <div className="flex-1 h-[1px] bg-white" />
                </div>
                
                <button 
                  onClick={() => handleDownload('direct', directUrl)}
                  className="w-full group relative flex items-center p-4 bg-[#111] border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="w-12 h-12 bg-[#C5FF00]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <DownloadIcon className="w-5 h-5 text-[#C5FF00]" />
                  </div>
                  <div className="flex flex-col items-start ml-4">
                    <span className="text-[10px] font-bold text-[#C5FF00]/60 tracking-widest uppercase">Alternative</span>
                    <span className="text-lg font-bold text-white">Direct Download (.APK)</span>
                  </div>
                </button>
              </>
            )}

          </div>
        </motion.div>
      </main>
    </div>
  );
}