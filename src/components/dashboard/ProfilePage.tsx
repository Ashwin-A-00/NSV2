import { useState, useEffect } from "react";
import { Edit2, Save, X, User, Mail, GraduationCap, BookOpen, Briefcase, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { UserProfile } from "../../App";

type ProfilePageProps = {
  profile: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "NS";

export const ProfilePage = ({ profile, onUpdateProfile }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(profile);
  const [topicsText, setTopicsText] = useState(profile.topics.join(", "));
  const [interestsText, setInterestsText] = useState(profile.interests.join(", "));

  useEffect(() => {
    setEditForm(profile);
    setTopicsText(profile.topics.join(", "));
    setInterestsText(profile.interests.join(", "));
  }, [profile]);

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        ...editForm,
        topics: topicsText.split(",").map((s) => s.trim()).filter(Boolean),
        interests: interestsText.split(",").map((s) => s.trim()).filter(Boolean),
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setTopicsText(profile.topics.join(", "));
    setInterestsText(profile.interests.join(", "));
    setIsEditing(false);
  };

  const Field = ({
    icon: Icon,
    label,
    value,
    onChange,
    placeholder = "",
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    onChange?: (val: string) => void;
    placeholder?: string;
  }) => (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 hover:border-white/20 focus-within:border-accent/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={13} className="text-accent/70" />
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">{label}</p>
      </div>
      {isEditing && onChange ? (
        <input
          type="text"
          className="w-full bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder:text-white/20"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <p className="text-sm text-white/85 font-light">{value || <span className="text-white/25 italic">Not set</span>}</p>
      )}
    </div>
  );

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-10">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[radial-gradient(ellipse_at_top_left,rgba(167,45,37,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg">
              <User size={18} className="text-accent" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">Your Identity</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mt-1">
            Profile
          </h1>
          <p className="text-sm text-white/50 mt-2 max-w-lg leading-relaxed">
            This is the data NextStep uses to tailor your roadmap. Edit anytime to explore different directions.
          </p>
        </motion.div>

        {/* Avatar + Name Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl mb-6 overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center shadow-lg shadow-accent/10">
                <span className="text-2xl font-light tracking-widest text-accent">
                  {getInitials(profile.name || "NS")}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>

            {/* Name / Email */}
            <div className="flex-1 min-w-0">
              <p className="text-xl md:text-2xl font-light tracking-tight text-white truncate">
                {profile.name || "Anonymous Explorer"}
              </p>
              <p className="text-sm text-white/40 mt-0.5 truncate">{profile.email || "—"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.careerGoal && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent text-[10px] uppercase tracking-wider font-medium">
                    <Sparkles size={10} />
                    {profile.careerGoal}
                  </span>
                )}
                {profile.degree && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] uppercase tracking-wider">
                    {profile.degree}
                  </span>
                )}
              </div>
            </div>

            {/* Edit/Save Actions */}
            {onUpdateProfile && (
              <div className="shrink-0 flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div
                      key="editing"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-2"
                    >
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-xs text-white/60 hover:bg-white/10 hover:text-white transition-all duration-200"
                      >
                        <X size={13} /> Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent border border-accent text-white text-xs font-semibold hover:bg-white hover:text-black hover:border-white transition-all duration-200"
                      >
                        <Save size={13} /> Save
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="view"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs text-white/60 hover:bg-accent hover:text-white hover:border-accent transition-all duration-200"
                    >
                      <Edit2 size={13} /> Edit Profile
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* Fields Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-3 md:grid-cols-2 mb-3"
        >
          <Field
            icon={User}
            label="Full Name"
            value={editForm.name}
            onChange={(val) => setEditForm({ ...editForm, name: val })}
            placeholder="Ada Lovelace"
          />
          <Field
            icon={Mail}
            label="Email"
            value={editForm.email}
            onChange={(val) => setEditForm({ ...editForm, email: val })}
            placeholder="you@nextstep.studio"
          />
          <Field
            icon={GraduationCap}
            label="Degree"
            value={editForm.degree}
            onChange={(val) => setEditForm({ ...editForm, degree: val })}
            placeholder="B.Sc. Computer Science"
          />
          <Field
            icon={Briefcase}
            label="Major / Specialization"
            value={editForm.major}
            onChange={(val) => setEditForm({ ...editForm, major: val })}
            placeholder="Software Engineering"
          />
        </motion.div>

        {/* Career Goal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3"
        >
          <Field
            icon={Sparkles}
            label="Career Goal"
            value={editForm.careerGoal || ""}
            onChange={(val) => setEditForm({ ...editForm, careerGoal: val })}
            placeholder="e.g. Full Stack Developer, ML Engineer"
          />
        </motion.div>

        {/* Tags Sections */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-3 md:grid-cols-2 mb-8"
        >
          {/* Interests */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 hover:border-white/20 focus-within:border-accent/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={13} className="text-accent/70" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">Interests</p>
            </div>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  className="w-full bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder:text-white/20 mb-1"
                  value={interestsText}
                  onChange={(e) => setInterestsText(e.target.value)}
                  placeholder="AI, Design, Finance (comma separated)"
                />
                <p className="text-[10px] text-white/30">Comma-separated</p>
              </div>
            ) : profile.interests.length === 0 ? (
              <p className="text-sm text-white/25 italic">None selected.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full text-[10px] bg-accent/10 border border-accent/20 text-accent/80 uppercase tracking-wide">
                    {i}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Syllabus Topics */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 hover:border-white/20 focus-within:border-accent/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={13} className="text-accent/70" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">Syllabus Topics</p>
            </div>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  className="w-full bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder:text-white/20 mb-1"
                  value={topicsText}
                  onChange={(e) => setTopicsText(e.target.value)}
                  placeholder="React, Python, DSA (comma separated)"
                />
                <p className="text-[10px] text-white/30">Comma-separated</p>
              </div>
            ) : profile.topics.length === 0 ? (
              <p className="text-sm text-white/25 italic">No topics added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {profile.topics.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-[10px] bg-white/5 border border-white/15 text-white/60 uppercase tracking-wide">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
