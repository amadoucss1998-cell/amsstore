import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Gender } from '../types';
import PhotoUpload from '../components/PhotoUpload';

const CITIES = ['Monrovia', 'Gbarnga', 'Buchanan', 'Harbel', 'Voinjama', 'Freetown', 'Accra', 'Lagos', 'Abidjan'];
const INTERESTS = ['Music', 'Travel', 'Food', 'Sports', 'Art', 'Tech', 'Fashion', 'Faith', 'Movies', 'Fitness', 'Gaming', 'Business'];

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [photos, setPhotos] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('man');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (i: string) =>
    setInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const handleSave = () => {
    updateProfile({ name, age: parseInt(age) || 20, gender, city, bio, interests, photos });
    navigate('/discover');
  };

  return (
    <div className="flex flex-col min-h-screen px-6 pt-14 pb-10 overflow-y-auto">
      <h2 className="text-3xl font-bold mb-1">Set up your profile</h2>
      <p className="text-dim mb-6">Tell the community about yourself.</p>

      <label className="text-sm text-dim mb-2">Photos (up to 6)</label>
      <div className="mb-6">
        <PhotoUpload photos={photos} onChange={setPhotos} />
      </div>

      <label className="text-sm text-dim mb-1">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your first name"
        className="bg-card border border-border rounded-2xl px-4 py-4 text-white mb-5 outline-none focus:border-primary"
      />

      <label className="text-sm text-dim mb-1">Age</label>
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="e.g. 25"
        type="number"
        className="bg-card border border-border rounded-2xl px-4 py-4 text-white mb-5 outline-none focus:border-primary"
      />

      <label className="text-sm text-dim mb-2">I am a</label>
      <div className="flex gap-3 mb-5">
        {(['man', 'woman', 'non-binary'] as Gender[]).map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className={`flex-1 py-3 rounded-xl text-sm font-medium capitalize transition-colors ${
              gender === g ? 'bg-primary text-white' : 'bg-card text-dim border border-border'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <label className="text-sm text-dim mb-2">City</label>
      <div className="flex flex-wrap gap-2 mb-5">
        {CITIES.map((c) => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              city === c ? 'bg-primary text-white' : 'bg-card text-dim border border-border'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <label className="text-sm text-dim mb-1">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write something interesting about yourself..."
        rows={3}
        className="bg-card border border-border rounded-2xl px-4 py-4 text-white mb-5 outline-none focus:border-primary resize-none"
      />

      <label className="text-sm text-dim mb-2">Interests (pick a few)</label>
      <div className="flex flex-wrap gap-2 mb-8">
        {INTERESTS.map((i) => (
          <button
            key={i}
            onClick={() => toggleInterest(i)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              interests.includes(i) ? 'bg-primary text-white' : 'bg-card text-dim border border-border'
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={!name}
        className="w-full py-4 rounded-2xl gradient-primary text-white font-bold text-lg disabled:opacity-40 active:scale-95 transition-transform"
      >
        Start Discovering ✨
      </button>
    </div>
  );
}
