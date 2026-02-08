"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Code2, Moon, Sun, List, User, LogOut, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@repo/ui/components/button"
import type { ProblemDetail, TestCase } from "../../lib/temp";
import { ProblemDescription } from "./problem-description"
import { CodeEditor } from "./code-editor"
import { TestCasesPanel } from "./test-cases-panel"
import { ProblemListDrawer } from "./problem-list-drawer"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import axios from "axios"
import { BASE_URL } from "../../lib/config"
import { processJudge0Response } from "../../lib/utils"
import { useRouter } from "next/navigation"

type Language = "CPP" | "PYTHON" | "JAVA" | "JAVASCRIPT" | "TYPESCRIPT" | "GO" | "RUST";

export function ArenaLayout({ problem, problemIdList, index, user }: { problem: ProblemDetail, problemIdList: string[], index: number, user: any }) {
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState<Language>("CPP")
  const [code, setCode] = useState(problem.starterCode.CPP)
  const [testCases, setTestCases] = useState<TestCase[]>(problem.testCases)
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<"testcase" | "result">("testcase")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter();


  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
    setCode(problem.starterCode[newLang])
  }

  async function handleRunFor(type: "submit" | "run") {
    setIsRunning(true)
    setActiveTab("result")

    const submissionObj = {
      problemId: problem.id,
      code,
      language,
      type,
    };

    try {
      const tokens = await axios.post(`${BASE_URL}/api/judge0/execute`, submissionObj, {
        withCredentials: true
      });

      let actualTokens = "";
      tokens.data.forEach((x: any) => {
        actualTokens += `,${x.token}`
      });
      try {
        const poolResponse: any = await new Promise(async (resolve, regect) => {
          const interval = setInterval(async () => {
            const result = await axios.get(`${BASE_URL}/api/judge0/submission?tokens=${actualTokens.substring(1)}&type=${type}`, { withCredentials: true });
            const arr = result.data.judge0Response.submissions;
            const status = arr.find((x: any) => {
              if (x.status.id == 1 || x.status.id == 2) {
                return true;
              }
            });
            if (!status) {
              resolve(arr);
              setIsRunning(false)
              clearInterval(interval);
            }
          }, 1300);
        });
        const processResponse = processJudge0Response(poolResponse, problem.testCases);
        setTestCases(processResponse);
      } catch (err) {
      }
    } catch (err) {
      console.log("error", err);
    }
  }

  const handleRun = async () => {
    await handleRunFor("run");
  }

  const handleSubmit = async () => {
    await handleRunFor("submit");
  }

  const prevProblemId = String(Math.max(1, Number(problem.id) - 1))
  const nextProblemId = String(Math.min(15, Number(problem.id) + 1))

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Navbar */}
      <header className="flex h-12 items-center border-b px-4">
        {/* Left section */}
        <div className="flex items-center gap-2 flex-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDrawerOpen(true)}>
            <List className="h-4 w-4" />
          </Button>
          <Link href="/problems" className="flex items-center gap-2 font-semibold">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">CodeArena</span>
          </Link>
          <div className="ml-4 flex items-center gap-1">
            <Button onClick={() => {
              router.push(`/arena/${problemIdList[index - 1] ? problemIdList[index - 1] : problemIdList[index]}`)
            }} variant="ghost" size="icon" className="h-8 w-8" disabled={problem.id === "1"}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-2">
              {problem.title}
            </span>
            <Button onClick={() => {
              router.push(`/arena/${problemIdList[index + 1] ? problemIdList[index + 1] : problemIdList[index]}`)
            }} variant="ghost" size="icon" className="h-8 w-8" disabled={problem.id === "15"}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Center section - Run & Submit */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRun} disabled={isRunning}>
            {isRunning ? "Running..." : "Run"}
          </Button>
          <Button size="sm" onClick={handleSubmit} disabled={isRunning}>
            {isRunning ? "Submitting..." : "Submit"}
          </Button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {user.image ? user.image : user.name[0].toUpperCase()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Problem Description */}
          <ResizablePanel defaultSize={50} minSize={25}>
            <ProblemDescription problem={problem} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Code Editor + Test Cases */}
          <ResizablePanel defaultSize={50} minSize={35}>
            <ResizablePanelGroup direction="vertical">
              {/* Code Editor */}
              <ResizablePanel defaultSize={60} minSize={30}>
                <CodeEditor
                  code={code}
                  onChange={setCode}
                  starterCode={problem.starterCode}
                  language={language}
                  onLanguageChange={handleLanguageChange}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Test Cases */}
              <ResizablePanel defaultSize={40} minSize={20}>
                <TestCasesPanel
                  testCases={testCases}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  isRunning={isRunning}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <ProblemListDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        currentProblemId={problem.id}
      />
    </div>
  )
}
