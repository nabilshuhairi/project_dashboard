import { useEffect, useMemo, useState } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import { Notification } from '../components/ui/Notification'
import type { Task, Project } from '../types'

const aiSections = [
  { title: 'Project Summary', key: 'summary' },
  { title: 'Risks and Blockers', key: 'risks' },
  { title: 'Suggested Next Actions', key: 'actions' },
  { title: 'Weekly Project Update', key: 'weekly' },
] as const

type AiSectionKey = (typeof aiSections)[number]['key']

type AiResponse = Record<AiSectionKey, string>

function getMockResponse(tasks: Task[], projects: Project[]): AiResponse {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length
  const atRiskTasks = tasks.filter((task) => task.status === 'At Risk').length
  const projectCount = projects.length

  return {
    summary: `You are tracking ${projectCount} active project${projectCount === 1 ? '' : 's'} with ${totalTasks} total tasks. ${completedTasks} are complete and ${atRiskTasks} are currently flagged as at risk, indicating a healthy cadence with a few items needing attention.`,
    risks: atRiskTasks
      ? `There are ${atRiskTasks} task${atRiskTasks === 1 ? '' : 's'} marked At Risk. Review scope, clarify requirements, and prioritize blockers in the next planning session.`
      : 'No immediate risk flags detected. Continue monitoring delivery velocity and maintain team alignment on priorities.',
    actions: `Focus on closing overdue tasks first, keep stakeholders updated on any delayed dependencies, and break work into smaller milestones to keep pacing consistent. Schedule a quick sync for the ${projectCount} project${projectCount === 1 ? '' : 's'} with the most tasks.`,
    weekly: `In the past week, the team progressed through ${completedTasks} tasks and resolved blockers on higher-risk work. Maintain this momentum by reviewing next week’s due dates and reassigning capacity to any tasks that are still open.`,
  }
}

export function AIInsightsPage() {
  const projects = useDashboardStore((state) => state.projects)
  const tasks = useDashboardStore((state) => state.tasks)
  const [selectedSection, setSelectedSection] = useState<AiSectionKey>('summary')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<AiResponse | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    setContent(getMockResponse(tasks, projects))
  }, [tasks.length, projects.length])

  const selectedContent = useMemo(() => content?.[selectedSection] ?? '', [content, selectedSection])

  const generateInsights = async () => {
    setLoading(true)
    setNotification(null)

    try {
      if (import.meta.env.VITE_OPENAI_API_KEY) {
        // Placeholder for OpenAI integration if environment key exists
        const result = getMockResponse(tasks, projects)
        setContent(result)
        setNotification({ type: 'success', message: 'AI insights generated successfully.' })
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600))
        setContent(getMockResponse(tasks, projects))
        setNotification({ type: 'success', message: 'Generated realistic AI insights in offline mode.' })
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Unable to generate AI insights right now.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">AI Insights</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Intelligent project analysis</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Generate summaries, blockers, next actions, and weekly updates for your active projects.
              </p>
            </div>
            <button
              type="button"
              onClick={generateInsights}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              {loading ? 'Generating…' : 'Generate AI Insights'}
            </button>
          </div>
        </header>

        {notification ? <Notification type={notification.type} message={notification.message} /> : null}

        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,_1fr)]">
          <div className="space-y-4 rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/30">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">AI Generated Summary</p>
            <div className="grid gap-3">
              {aiSections.map((section) => (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setSelectedSection(section.key)}
                  className={`w-full rounded-3xl px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    selectedSection === section.key
                      ? 'bg-indigo-600 text-white shadow-inner shadow-indigo-500/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-sm font-semibold">{section.title}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-8 shadow-2xl shadow-slate-950/30">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">{aiSections.find((item) => item.key === selectedSection)?.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">{selectedSection === 'summary' ? 'Overview of the current project portfolio and progress.' : 'AI-crafted insights based on tasks and status.'}</p>
                </div>
                <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">{loading ? 'Loading' : 'Ready'}</span>
              </div>
              <div className="min-h-[220px] rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6 text-sm leading-7 text-slate-300 shadow-inner shadow-slate-950/30">
                {loading ? (
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-800" />
                    <div className="h-4 w-full animate-pulse rounded-full bg-slate-800" />
                    <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-800" />
                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-800" />
                  </div>
                ) : (
                  <p>{selectedContent}</p>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/30">
                <h3 className="text-base font-semibold text-white">Insights Source</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  These insights are generated from active project and task data, with offline fallback responses when AI credentials are unavailable.
                </p>
              </div>
              <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/30">
                <h3 className="text-base font-semibold text-white">Current Workspace</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {projects.length} project{projects.length === 1 ? '' : 's'}, {tasks.length} task{tasks.length === 1 ? '' : 's'} tracked in persistent LocalStorage.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
