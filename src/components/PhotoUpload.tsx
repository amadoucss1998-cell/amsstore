import { useRef } from 'react';
import { Camera, X, Plus } from 'lucide-react';

interface Props {
  photos: string[];
  onChange: (photos: string[]) => void;
  max?: number;
}

export default function PhotoUpload({ photos, onChange, max = 6 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = max - photos.length;
    const toRead = Array.from(files).slice(0, remaining);

    toRead.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) onChange([...photos, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const remove = (idx: number) =>
    onChange(photos.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((src, i) => (
          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-card">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => remove(i)}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center"
            >
              <X size={12} className="text-white" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full font-semibold">
                Main
              </span>
            )}
          </div>
        ))}

        {photos.length < max && (
          <button
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted hover:border-primary/60 hover:text-primary transition-colors"
          >
            {photos.length === 0 ? (
              <>
                <Camera size={24} />
                <span className="text-xs font-medium">Add Photo</span>
              </>
            ) : (
              <Plus size={22} />
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        onClick={(e) => ((e.target as HTMLInputElement).value = '')}
      />

      {photos.length > 0 && (
        <p className="text-dim text-xs mt-2">
          {photos.length}/{max} photos — drag to reorder coming soon
        </p>
      )}
    </div>
  );
}
