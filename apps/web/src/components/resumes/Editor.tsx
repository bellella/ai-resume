'use client'

import { useState } from 'react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image,
} from "lucide-react"

const PDFDownloadButton = ({ html }: { html: string }) => {
  const handleDownloadPDF = async () => {
    const res = await fetch('/api/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html }),
    })

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume.pdf'
    a.click()
  }

  return (
    <div className="mb-4 text-right">
      <button
        onClick={handleDownloadPDF}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download as PDF
      </button>
    </div>
  )
}

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="border-b p-2">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]

const initialContent = `
<h2>Hi there,</h2>
<p>This is a <em>basic</em> example of <strong>Tiptap</strong>.</p>
<ul>
  <li>Bullet list 1</li>
  <li>Bullet list 2</li>
</ul>
<blockquote>
  Wow, that's amazing. Good work, boy! 👏<br />— Mom
</blockquote>
`
const resumeTemplateHTML = `
<h1 style="font-size: 28px; font-weight: bold;">김지원 (Jiwon Kim)</h1>
<p><strong>Frontend Developer</strong> | jiwon@example.com | +82 10-1234-5678 | GitHub: github.com/jiwon</p>

<h2 style="margin-top: 24px;">👨‍💻 About Me</h2>
<p>
창의적인 UI와 사용자 중심의 설계를 지향하는 프론트엔드 개발자입니다. React, Next.js 기반의 프로젝트 경험이 있으며, 팀 협업과 커뮤니케이션에 강점이 있습니다.
</p>

<h2 style="margin-top: 24px;">💼 Experience</h2>
<ul>
  <li>
    <strong>코드몽키 (CodeMonkey Inc.)</strong> – Frontend Intern (2023.01 ~ 2023.06)<br/>
    - React로 메인 페이지 리뉴얼<br/>
    - GitHub Actions를 통한 CI/CD 자동화 구축
  </li>
</ul>

<h2 style="margin-top: 24px;">📂 Projects</h2>
<ul>
  <li>
    <strong>AI Resume Builder (2024)</strong><br/>
    - Next.js, Tiptap, Stripe 기반 이력서 생성/AI 분석 서비스 개발<br/>
    - GPT API를 활용한 표현 교정 기능 추가
  </li>
</ul>

<h2 style="margin-top: 24px;">🛠 Skills</h2>
<ul>
  <li><strong>Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS</li>
  <li><strong>Tools:</strong> Git, Figma, Vite, VSCode</li>
</ul>

<h2 style="margin-top: 24px;">🎓 Education</h2>
<ul>
  <li>
    한양대학교 컴퓨터소프트웨어학과 (2019 ~ 2023)
  </li>
</ul>
`

interface EditorProps {
  initialData?: string
}

export default function EditorWithPDFExport({ initialData }: EditorProps) {
  const [html, setHtml] = useState(initialData || resumeTemplateHTML)

  return (
    <Card>
      <CardContent className="p-4">
        <EditorProvider
          extensions={extensions}
          content={initialData || resumeTemplateHTML}
          slotBefore={<MenuBar />}
          onUpdate={({ editor }) => {
            setHtml(editor.getHTML())
          }}></EditorProvider>
      </CardContent>
    <PDFDownloadButton html={html} />
    </Card>
  )
}
