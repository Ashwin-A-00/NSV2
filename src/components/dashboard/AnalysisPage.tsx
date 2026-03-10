import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { TrendingUp, Brain, Clock, Zap, Download, AlertCircle } from "lucide-react";
import type { UserProfile } from "../../App";
import {
  getCareerById,
  getTopCareerMatch,
  generatePersonalizedAnalysis,
  type AIAnalysisData,
  type AIGeneratedData,
} from "../../lib/ai";
import { LoadingScreen } from "./LoadingScreen";

type AnalysisPageProps = {
  profile: UserProfile;
  selectedCareerId: string | null;
  aiData?: AIGeneratedData | null;
  onBack: () => void;
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  accent = false,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`relative rounded-2xl border bg-white/5 backdrop-blur-xl px-5 py-5 overflow-hidden group ${
      accent ? "border-accent/25 hover:border-accent/40" : "border-white/10 hover:border-white/20"
    } transition-all duration-300`}
  >
    {accent && (
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    )}
    <div className={`mb-3 w-8 h-8 rounded-lg flex items-center justify-center ${accent ? "bg-accent/10 border border-accent/20" : "bg-white/5 border border-white/10"}`}>
      <Icon size={15} className={accent ? "text-accent" : "text-white/50"} />
    </div>
    <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1">{label}</p>
    <p className={`text-2xl font-light ${accent ? "text-white" : "text-white/85"}`}>{value}</p>
  </motion.div>
);

export const AnalysisPage = ({ profile, selectedCareerId, aiData, onBack }: AnalysisPageProps) => {
  const [analysis, setAnalysis] = useState<AIAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const name = profile.name || "Explorer";
  const selectedCareer = getCareerById(profile, selectedCareerId) || aiData?.career;
  const topMatch = selectedCareer || getTopCareerMatch(profile);
  const goal = topMatch?.title || profile.careerGoal || "Job Ready";

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const data = await generatePersonalizedAnalysis(profile, goal);
        setAnalysis(data);
      } catch (err) {
        console.error(err);
        setError("Failed to generate AI analysis.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [profile, goal]);

  const today = new Date();
  const addWeeks = (w: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + w * 7);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  // Loading
  if (loading) {
    return (
      <LoadingScreen
        title="AI is evaluating your readiness..."
        subtitle="Connecting your skills to market demand for"
        highlight={goal}
      />
    );
  }

  // Error
  if (error || !analysis) {
    return (
      <section className="relative min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={20} className="text-red-400" />
          </div>
          <p className="text-white/60 text-sm mb-6">{error || "Something went wrong."}</p>
          <button
            onClick={onBack}
            className="px-5 py-2 text-xs uppercase tracking-widest rounded-full border border-white/15 bg-white/5 text-white/60 hover:bg-accent hover:text-white hover:border-accent transition-all"
          >
            ← Go Back
          </button>
        </div>
      </section>
    );
  }

  const weeksNum = parseInt(analysis.estimatedWeeks.split("-")[0] || "12");

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(167,45,37,0.07),transparent_65%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">

        {/* Hero Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-7 py-7 mb-6 overflow-hidden"
        >
          <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 bg-accent/10 border border-accent/20 rounded-lg">
                  <Brain size={16} className="text-accent" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">AI Analysis</p>
              </div>
              <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-1.5">
                {name}&apos;s readiness for{" "}
                <span className="text-accent/80 italic">{goal}</span>
              </h1>
              <p className="text-xs text-white/40 max-w-lg leading-relaxed">
                A data-driven snapshot merging your overall capabilities with gap analysis to guide your next move.
              </p>
            </div>

            {/* Score Ring */}
            <div className="shrink-0 text-center md:text-right">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-1">Readiness Score</p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex flex-col items-center"
              >
                <span className="text-5xl font-extralight tabular-nums">{analysis.readinessScore}</span>
                <span className="text-xs text-white/30 uppercase tracking-widest mt-0.5">/ 100</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard icon={TrendingUp} label="Skills Matched" value={analysis.matchedSkills.length} accent delay={0.05} />
          <StatCard icon={AlertCircle} label="Skills Missing" value={analysis.missingSkills.length} delay={0.1} />
          <StatCard icon={Clock} label="Est. Weeks" value={analysis.estimatedWeeks} delay={0.15} />
          <StatCard icon={Zap} label="Strongest Area" value={analysis.strongestArea || "—"} delay={0.2} />
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-[1.2fr_1.8fr] mb-4">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-6"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1">Strengths vs Market</p>
            <p className="text-xs text-white/25 mb-5 leading-relaxed">How your proficiency matches real-world demand.</p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysis.chartData} layout="vertical" margin={{ top: 0, right: 24, left: 16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis
                    type="category"
                    dataKey="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                    width={76}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.85)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      fontSize: "11px",
                    }}
                    itemStyle={{ color: "rgba(255,255,255,0.7)" }}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "14px", color: "rgba(255,255,255,0.4)" }} />
                  <Bar dataKey="marketScore" name="Market Demand" fill="rgba(255,255,255,0.1)" radius={[0, 4, 4, 0]} barSize={9} />
                  <Bar dataKey="userScore" name="Your Score" fill="#a72d25" radius={[0, 4, 4, 0]} barSize={9} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Missing Skills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-6"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1">Immediate Skill Gaps</p>
            <p className="text-xs text-white/25 mb-5 leading-relaxed">
              Highest-leverage skills missing, ranked by market demand.
            </p>

            {analysis.missingSkills.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={18} className="text-emerald-400" />
                </div>
                <p className="text-sm text-white/40 italic text-center">
                  All core skills accounted for!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1 scrollbar-none">
                {analysis.missingSkills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-white/70 font-light">{skill.name}</span>
                      <span className="text-accent/70 tabular-nums">{skill.demand}%</span>
                    </div>
                    <div className="h-1 bg-white/8 overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.demand}%` }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 + i * 0.05 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Learning Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-6 mb-8"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-5">AI Projected Learning Timeline</p>
          <div className="relative">
            {/* Track */}
            <div className="h-px bg-gradient-to-r from-accent/15 via-accent/50 to-accent/15 mb-5" />
            {/* Dots */}
            <div className="absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-white/30 border border-white/20" />
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white/20 border border-white/15" />
            <div className="absolute -top-[5px] right-0 w-2.5 h-2.5 rounded-full bg-accent border border-accent/60 shadow-lg shadow-accent/30" />

            <div className="flex justify-between text-xs text-white/60">
              <div className="flex flex-col items-start gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full border border-white/15 text-[9px] uppercase tracking-wider bg-black/40 text-white/50">
                  Start
                </span>
                <span className="text-white/30 text-[11px]">{addWeeks(0)}</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full border border-white/10 text-[9px] uppercase tracking-wider bg-black/40 text-white/40">
                  Midpoint
                </span>
                <span className="text-white/30 text-[11px]">{addWeeks(Math.floor(weeksNum / 2))}</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full border border-accent/40 text-[9px] uppercase tracking-wider bg-accent/10 text-accent/80">
                  Job Ready
                </span>
                <span className="text-white/30 text-[11px]">{addWeeks(weeksNum)}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-end"
        >
          <button
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] rounded-full border border-white/15 bg-white/8 text-white/60 hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 active:scale-95"
            onClick={() => {
              const blob = new Blob(
                [
                  `NextStep AI Analysis Report for ${name}\n` +
                    `Goal: ${goal}\n` +
                    `Readiness Score: ${analysis.readinessScore}/100\n` +
                    `\nStrongest Area: ${analysis.strongestArea}` +
                    `\nMissing Skills: ${analysis.missingSkills.map((m) => m.name).join(", ")}`,
                ],
                { type: "text/plain" }
              );
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "nextstep-ai-analysis.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download size={13} />
            Download AI Report
          </button>
        </motion.div>
      </div>
    </section>
  );
};
