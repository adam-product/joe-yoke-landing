import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from './ContentContext';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Save, CheckCircle, Plus, Trash2 } from 'lucide-react';

const SECTIONS: Record<string, any> = {
  hero: {
    title: 'Hero Section', desc: 'Main landing area content.',
    fields: [
      { key: 'headline', label: 'Headline' },
      { key: 'subtext', label: 'Subtext' },
      { key: 'ctaLabel', label: 'CTA Button Text', type: 'text' },
      { key: 'heroImage', label: 'Hero Image (Mockup)', type: 'image' },
    ]
  },
  about: {
    title: 'About', desc: 'Mission statement and pills.',
    fields: [
      { key: 'quote', label: 'Quote' },
      { key: 'pill1', label: 'Pill 1', type: 'text' },
      { key: 'pill2', label: 'Pill 2', type: 'text' },
      { key: 'pill3', label: 'Pill 3', type: 'text' },
    ]
  },
  games: {
    title: 'Trending Games', desc: 'Games section headers.',
    fields: [{ key: 'sectionTitle', label: 'Section Title' }]
  },
  categories: {
    title: 'Game Categories', desc: 'Browse by category labels and tags.',
    fields: [
      { key: 'subhead', label: 'Subhead (e.g. Browse by)', type: 'text' },
      { key: 'headline', label: 'Main Headline', type: 'text' },
    ]
  },
  stats: {
    title: 'Community Stats', desc: 'Community numbers and labels.',
    fields: [
      { key: 'headline', label: 'Headline' },
      { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
      { key: 'stat1_value', label: 'Stat 1 Value', type: 'text' }, { key: 'stat1_label', label: 'Stat 1 Label', type: 'text' },
      { key: 'stat2_value', label: 'Stat 2 Value', type: 'text' }, { key: 'stat2_label', label: 'Stat 2 Label', type: 'text' },
      { key: 'stat3_value', label: 'Stat 3 Value', type: 'text' }, { key: 'stat3_label', label: 'Stat 3 Label', type: 'text' },
      { key: 'stat4_value', label: 'Stat 4 Value', type: 'text' }, { key: 'stat4_label', label: 'Stat 4 Label', type: 'text' },
    ]
  },
  footer: {
    title: 'Footer', desc: 'Footer CTA, links, and copyright text.',
    fields: [
      { key: 'ctaHeadline', label: 'CTA Headline', type: 'text' },
      { key: 'ctaTagline', label: 'CTA Tagline', type: 'text' },
      { key: 'ctaBtn', label: 'CTA Button Text', type: 'text' },
      { key: 'copyright', label: 'Copyright Text', type: 'text' },
    ]
  },
  downloads: {
    title: 'Download Links', desc: 'Configure app store URLs and direct downloads.',
    fields: [
      { key: 'pageTitle', label: 'Page Title', type: 'text' },
      { key: 'pageSubtitle', label: 'Page Subtitle', type: 'text' },
      { key: 'playStoreLink', label: 'Google Play Store URL', type: 'text' },
      { key: 'appStoreLink', label: 'Apple App Store URL', type: 'text' },
      { key: 'directLink', label: 'Direct APK/App Download URL (Optional)', type: 'text' },
    ]
  }
};

const CUSTOM_COLORS = [
  '#C5FF00', '#d4ff33', '#0A0A0A', '#111111', '#1A1A1A', '#F8F9FA', '#ffffff', '#000000',
  '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff'
];

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': CUSTOM_COLORS }, { 'background': CUSTOM_COLORS }],
    ['clean']
  ],
};

// Helper to strip HTML tags from plain text inputs
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
};

export default function ContentManager() {
  const { sectionId } = useParams();
  const { content, updateContent } = useContent();
  const currentSection = SECTIONS[sectionId || 'hero'];
  
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (content && sectionId && content[sectionId]) {
      setFormData(content[sectionId]);
    } else {
      setFormData({});
    }
  }, [content, sectionId]);

  const handleSave = async () => {
    setIsSaving(true);
    setShowSuccess(false);
    try {
      // Clean plain text fields before saving
      const cleanedData = { ...formData };
      currentSection.fields.forEach((field: any) => {
        if (field.type === 'text' && cleanedData[field.key]) {
          cleanedData[field.key] = stripHtml(cleanedData[field.key]);
        }
      });

      await updateContent(sectionId, cleanedData);
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

  return (
    <div className="max-w-4xl mx-auto relative pb-24">
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
            ) : field.type === 'text' ? (
              <input 
                type="text"
                value={stripHtml(formData[field.key] || '')}
                onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00] transition-colors"
              />
            ) : (
              <div className="bg-white text-black rounded-lg [&_.ql-editor]:min-h-[120px] [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg">
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

        {sectionId === 'categories' && (
          <div className="flex flex-col gap-6 mt-4 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Dynamic Categories</h2>
                <p className="text-sm text-white/40 mt-1">Add or remove rows dynamically.</p>
              </div>
              <button 
                onClick={() => {
                  const newList = [...(formData.categoryList || []), { title: 'New Category', tags: 'Example / Tags / Here' }];
                  setFormData(prev => ({ ...prev, categoryList: newList }));
                }}
                className="flex items-center gap-2 bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Game Category
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {(formData.categoryList || []).map((cat: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-4 p-5 border border-white/10 rounded-xl relative bg-black/20">
                  <button 
                    onClick={() => {
                      const newList = [...formData.categoryList];
                      newList.splice(idx, 1);
                      setFormData(prev => ({ ...prev, categoryList: newList }));
                    }}
                    className="absolute top-4 right-4 text-white/30 hover:text-red-500 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="flex flex-col gap-2 pr-8">
                    <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Category Title</label>
                    <input 
                      type="text" 
                      value={cat.title} 
                      onChange={(e) => {
                        const newList = [...formData.categoryList];
                        newList[idx].title = e.target.value;
                        setFormData(prev => ({ ...prev, categoryList: newList }));
                      }}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Category Tags</label>
                    <input 
                      type="text" 
                      value={cat.tags} 
                      onChange={(e) => {
                        const newList = [...formData.categoryList];
                        newList[idx].tags = e.target.value;
                        setFormData(prev => ({ ...prev, categoryList: newList }));
                      }}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00] transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

      {showSuccess && (
        <div className="fixed bottom-10 right-10 bg-[#C5FF00] text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 transition-all duration-300">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold text-sm">Changes saved successfully!</span>
        </div>
      )}
    </div>
  );
}