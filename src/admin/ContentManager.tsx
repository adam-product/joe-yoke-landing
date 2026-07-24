import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from './ContentContext';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Save, CheckCircle } from 'lucide-react';

const SECTIONS: Record<string, any> = {
  hero: {
    title: 'Hero Section', desc: 'Main landing area content.',
    fields: [
      { key: 'headline', label: 'Headline' },
      { key: 'subtext', label: 'Subtext' },
      { key: 'ctaLabel', label: 'CTA Button Text' },
      { key: 'heroImage', label: 'Hero Image (Mockup)', type: 'image' },
    ]
  },
  about: {
    title: 'About', desc: 'Mission statement and pills.',
    fields: [
      { key: 'quote', label: 'Quote' },
      { key: 'pill1', label: 'Pill 1' },
      { key: 'pill2', label: 'Pill 2' },
      { key: 'pill3', label: 'Pill 3' },
    ]
  },
  games: {
    title: 'Trending Games', desc: 'Games section headers.',
    fields: [{ key: 'sectionTitle', label: 'Section Title' }]
  },
  stats: {
    title: 'Community Stats', desc: 'Community numbers and labels.',
    fields: [
      { key: 'headline', label: 'Headline' },
      { key: 'ctaLabel', label: 'CTA Label' },
      { key: 'stat1_value', label: 'Stat 1 Value' }, { key: 'stat1_label', label: 'Stat 1 Label' },
      { key: 'stat2_value', label: 'Stat 2 Value' }, { key: 'stat2_label', label: 'Stat 2 Label' },
      { key: 'stat3_value', label: 'Stat 3 Value' }, { key: 'stat3_label', label: 'Stat 3 Label' },
      { key: 'stat4_value', label: 'Stat 4 Value' }, { key: 'stat4_label', label: 'Stat 4 Label' },
    ]
  },
  footer: {
    title: 'Footer', desc: 'Footer CTA, links, and copyright text.',
    fields: [
      { key: 'ctaHeadline', label: 'CTA Headline' },
      { key: 'ctaTagline', label: 'CTA Tagline' },
      { key: 'ctaBtn', label: 'CTA Button Text' },
      { key: 'copyright', label: 'Copyright Text' },
    ]
  }
};

export default function ContentManager() {
  const { sectionId } = useParams();
  const { content, updateContent } = useContent();
  const currentSection = SECTIONS[sectionId || 'hero'];
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State for the success modal

  useEffect(() => {
    if (content && sectionId && content[sectionId]) {
      setFormData(content[sectionId]);
    } else {
      setFormData({});
    }
  }, [content, sectionId]);

  const handleSave = async () => {
    setIsSaving(true);
    setShowSuccess(false); // Reset success state on new save
    try {
      await updateContent(sectionId, formData);
      // Trigger the success toast and hide it after 3 seconds
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    }
    setIsSaving(false);
  };

  const handleImageUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [key]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!currentSection) return <div className="p-8 text-white">Section not found</div>;

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{currentSection.title}</h1>
        <p className="text-gray-400">{currentSection.desc}</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
        {currentSection.fields.map((field: any) => (
          <div key={field.key} className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              {field.label}
            </label>
            
            {field.type === 'image' ? (
              <div className="flex flex-col gap-4">
                {formData[field.key] && (
                  <div className="relative w-48 h-48 bg-black/20 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center p-2">
                    <img src={formData[field.key]} alt="Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(field.key, e)}
                  className="text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#C5FF00] file:text-black hover:file:bg-[#d4ff33] cursor-pointer transition-colors"
                />
              </div>
            ) : (
              <div className="bg-white text-black rounded-lg [&_.ql-editor]:min-h-[100px] [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg">
                <ReactQuill 
                  theme="snow"
                  modules={quillModules}
                  value={formData[field.key] || ''}
                  onChange={(val) => setFormData(prev => ({ ...prev, [field.key]: val }))}
                  className="bg-white text-black"
                />
              </div>
            )}
          </div>
        ))}

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#C5FF00] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#d4ff33] transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Floating Success Toast Notification */}
      {showSuccess && (
        <div className="fixed bottom-10 right-10 bg-[#C5FF00] text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 transition-all duration-300">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold text-sm">Changes saved successfully!</span>
        </div>
      )}
    </div>
  );
}