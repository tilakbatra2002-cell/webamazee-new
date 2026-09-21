import { useRef, useState } from 'react';
import { ImageUp, Trash2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'];

/**
 * Logo picker.
 *
 * Images are read in the browser and stored as a base64 data URL on the
 * settings document, which keeps deployments stateless (no writable disk
 * needed on Render/Vercel) and means no filesystem path is ever exposed.
 */
export function LogoUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
}) {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [reading, setReading] = useState(false);

  const handleFile = (file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      toast.error('Use a PNG, JPG, WEBP, GIF or SVG image');
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error('Logo must be smaller than 2MB');
      return;
    }

    setReading(true);
    const reader = new FileReader();
    reader.onload = () => {
      onChange(String(reader.result));
      setReading(false);
      toast.success('Logo ready — remember to save');
    };
    reader.onerror = () => {
      setReading(false);
      toast.error('Could not read that file');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <span className="wm-label">Company logo</span>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-24 w-44 items-center justify-center overflow-hidden rounded-xl border border-dashed border-line bg-surface p-3">
          {value ? (
            <img src={value} alt="Company logo preview" className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-xs text-ink-soft">No logo uploaded</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(',')}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            className="wm-btn-ghost wm-btn-sm"
            onClick={() => inputRef.current?.click()}
            disabled={reading}
          >
            <ImageUp size={14} />
            {value ? 'Replace logo' : 'Upload logo'}
          </button>
          {value ? (
            <button
              type="button"
              className="wm-btn-sm wm-btn border border-red-200 bg-white text-red-600 hover:bg-red-50"
              onClick={() => onChange('')}
            >
              <Trash2 size={14} />
              Remove logo
            </button>
          ) : null}
          <p className="text-xs text-ink-soft">PNG, JPG, WEBP or SVG · max 2MB</p>
        </div>
      </div>
    </div>
  );
}
