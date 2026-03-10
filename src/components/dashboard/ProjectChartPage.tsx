import { useState, useEffect } from "react";
import { BarChart2, Lock, Upload, Sparkles, Check, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { UserProfile } from "../../App";
import { generateProjectsTemplate, verifyProjectSolution, type APIProject } from "../../lib/ai";
import { LoadingScreen } from "./LoadingScreen";

type ProjectChartPageProps = {
  profile: UserProfile;
  onBack: () => void;
};

const LEVEL_META: Record<"Easy" | "Intermediate" | "Hard", { label: string; color: string; dot: string }> = {
  Easy: {
    label: "Easy",
    color: "text-white/50 border-white/15 bg-white/5",
    dot: "bg-white/30",
  },
  Intermediate: {
    label: "Intermediate",
    color: "text-accent/80 border-accent/25 bg-accent/5",
    dot: "bg-accent",
  },
  Hard: {
    label: "Hard",
    color: "text-red-400 border-red-500/25 bg-red-500/5",
    dot: "bg-red-400",
  },
};

export const ProjectChartPage = ({ profile, onBack }: ProjectChartPageProps) => {
  const [projects, setProjects] = useState<APIProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(1);

  const [solutions, setSolutions] = useState<Record<string, string>>({});
  const [verifiedQuestions, setVerifiedQuestions] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<Record<string, { success: boolean; message: string }>>({});
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const data = await generateProjectsTemplate(profile, profile.careerGoal || "Software Engineer");
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, [profile]);

  const currentProject = projects.find((p) => p.id === activeProject) || projects[0];

  const handleVerify = async (questionId: string, questionTitle: string) => {
    const sol = solutions[questionId];
    if (!sol?.trim()) return;
    setVerifyingId(questionId);
    try {
      const result = await verifyProjectSolution(questionTitle, sol, profile.careerGoal || "Software Engineer");
      setFeedback((prev) => ({ ...prev, [questionId]: { success: result.success, message: result.feedback } }));
      if (result.success) setVerifiedQuestions((prev) => ({ ...prev, [questionId]: true }));
    } catch {
      setFeedback((prev) => ({ ...prev, [questionId]: { success: false, message: "Verification unavailable. Try again later." } }));
    } finally {
      setVerifyingId(null);
    }
  };

  const isQuestionUnlocked = (level: "Easy" | "Intermediate" | "Hard", questions: APIProject["questions"]) => {
    if (level === "Easy") return true;
    const easyQ = questions.find((q) => q.level === "Easy");
    if (level === "Intermediate") return easyQ ? !!verifiedQuestions[easyQ.id] : true;
    if (level === "Hard") {
      const intQ = questions.find((q) => q.level === "Intermediate");
      return (easyQ ? !!verifiedQuestions[easyQ.id] : true) && (intQ ? !!verifiedQuestions[intQ.id] : true);
    }
    return false;
  };

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-10 overflow-hidden">
      {/* Ambient accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(167,45,37,0.07),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 inline-flex items-center gap-2 px-4 py-2 text-xs text-white/50 border border-white/10 rounded-full bg-white/5 backdrop-blur-md hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 active:scale-95"
          onClick={onBack}
        >
          ← Back to Dashboard
        </motion.button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-accent/10 border border-accent/20 rounded-xl">
              <BarChart2 size={20} className="text-accent" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">Technical Quest</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">
            Project Charts
          </h1>
          <p className="text-sm text-white/45 mt-2 max-w-lg leading-relaxed">
            Master your craft through progressive technical challenges. Complete each phase to unlock the next level.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <LoadingScreen
            title="Crafting your technical quest..."
            subtitle="Personalizing challenges for"
            highlight={profile.careerGoal || "your path"}
          />
        ) : (
          <>
            {/* Project Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-2 mb-8"
            >
              {projects.map((project) => {
                const isActive = activeProject === project.id;
                const isLocked = project.status === "locked";
                return (
                  <button
                    key={project.id}
                    onClick={() => !isLocked && setActiveProject(project.id)}
                    disabled={isLocked}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full border text-[11px] tracking-widest uppercase font-medium transition-all duration-300 ${
                      isActive
                        ? "border-accent bg-accent text-white shadow-lg shadow-accent/20 hover:bg-white hover:text-black hover:border-white"
                        : isLocked
                        ? "border-white/5 text-white/15 cursor-not-allowed bg-transparent"
                        : "border-white/10 text-white/45 bg-white/3 hover:bg-accent hover:border-accent hover:text-white"
                    }`}
                  >
                    <span>Project {project.id}</span>
                    {isLocked && <Lock size={11} className="opacity-40" />}
                    {isActive && <ChevronRight size={11} className="opacity-60" />}
                  </button>
                );
              })}
            </motion.div>

            {/* Current Project Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                {/* Project Header Card */}
                <div className="relative p-7 rounded-3xl border border-white/10 bg-white/4 backdrop-blur-2xl shadow-2xl overflow-hidden">
                  {/* Top accent line */}
                  <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                  {/* Decorative watermark */}
                  <div className="absolute bottom-4 right-6 opacity-[0.03] pointer-events-none">
                    <Sparkles size={110} className="text-white" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-accent/60 mb-2 font-medium">Active Project</p>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-3 leading-tight">
                    {currentProject?.title}
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed max-w-2xl">
                    {currentProject?.description}
                  </p>
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  {currentProject?.questions.map((q, idx) => {
                    const unlocked = isQuestionUnlocked(q.level, currentProject.questions);
                    const verified = verifiedQuestions[q.id];
                    const isVerifying = verifyingId === q.id;
                    const meta = LEVEL_META[q.level];

                    return (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className={`rounded-2xl border transition-all duration-500 ${
                          unlocked
                            ? "border-white/10 bg-white/4 backdrop-blur-md hover:border-white/18 hover:bg-white/6"
                            : "border-white/5 bg-transparent opacity-30 grayscale"
                        }`}
                      >
                        <div className="p-6">
                          {/* Phase header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                                <span className="text-[10px] uppercase tracking-[0.28em] text-white/25 font-semibold">
                                  Phase {String(idx + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <span className={`px-2.5 py-0.5 rounded-full border text-[9px] uppercase tracking-wider font-semibold ${meta.color}`}>
                                {meta.label}
                              </span>
                            </div>
                            {verified && (
                              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] uppercase tracking-widest font-bold">
                                <CheckCircle2 size={11} /> Complete
                              </span>
                            )}
                          </div>

                          {/* Question title */}
                          <h3 className={`text-base font-light leading-snug mb-5 ${unlocked ? "text-white/85" : "text-white/20"}`}>
                            {q.title}
                          </h3>

                          {/* Unlocked Content */}
                          {unlocked && (
                            <div className="space-y-4">
                              {/* Hint */}
                              {q.hint && (
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/12">
                                  <AlertCircle size={14} className="text-accent mt-0.5 shrink-0" />
                                  <p className="text-xs text-white/35 leading-relaxed italic">
                                    <span className="text-accent not-italic font-semibold mr-1">PRO TIP:</span>
                                    {q.hint}
                                  </p>
                                </div>
                              )}

                              {/* Textarea */}
                              <textarea
                                rows={5}
                                value={solutions[q.id] || ""}
                                onChange={(e) => setSolutions((prev) => ({ ...prev, [q.id]: e.target.value }))}
                                placeholder="Describe your technical solution here..."
                                disabled={verified || isVerifying}
                                className={`w-full bg-black/50 border border-white/8 rounded-xl p-4 text-sm text-white/70 placeholder:text-white/15 focus:outline-none focus:border-accent/30 transition-all resize-none ${
                                  verified ? "opacity-40 cursor-not-allowed" : ""
                                }`}
                              />

                              {/* Feedback */}
                              {feedback[q.id] && (
                                <div
                                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                                    feedback[q.id].success
                                      ? "bg-emerald-500/8 border-emerald-500/20 text-emerald-400"
                                      : "bg-red-500/8 border-red-500/20 text-red-400"
                                  }`}
                                >
                                  <div className="shrink-0 mt-0.5">
                                    {feedback[q.id].success ? <Check size={13} /> : <AlertCircle size={13} />}
                                  </div>
                                  <p className="font-medium">{feedback[q.id].message}</p>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                                <button
                                  disabled={verified || isVerifying}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest transition-all ${
                                    verified ? "opacity-25 cursor-not-allowed" : "text-white/50 hover:bg-accent hover:border-accent hover:text-white active:scale-95"
                                  }`}
                                >
                                  <Upload size={13} /> Upload Artifacts
                                </button>

                                {!verified && (
                                  <button
                                    onClick={() => handleVerify(q.id, q.title)}
                                    disabled={isVerifying || !solutions[q.id]}
                                    className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-2.5 rounded-full border text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 ${
                                      isVerifying
                                        ? "bg-white/8 border-white/15 cursor-wait opacity-70 text-white/50"
                                        : "bg-white text-black border-white hover:bg-accent hover:border-accent hover:text-white active:scale-95 disabled:opacity-25 disabled:pointer-events-none"
                                    }`}
                                  >
                                    {isVerifying ? (
                                      <>
                                        <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                                        Analyzing...
                                      </>
                                    ) : (
                                      <>
                                        <Sparkles size={13} /> Verify with AI
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Locked overlay */}
                          {!unlocked && idx > 0 && (
                            <div className="mt-3 py-3 flex items-center justify-center gap-2 rounded-xl bg-white/3 border border-white/5">
                              <Lock size={11} className="text-white/25" />
                              <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                Complete Phase {String(idx).padStart(2, "0")} to unlock
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
};
