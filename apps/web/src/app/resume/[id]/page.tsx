"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Share, Pencil, QrCode } from "lucide-react"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { ActionButtons } from "@/components/ui/action-buttons"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

interface ResumeData {
  id: string
  title: string
  html: string
  dataJson: any
}

export default function ResumeViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isLoading } = useAuth()
  const [resume, setResume] = useState<ResumeData | null>(null)
  const [isLoadingResume, setIsLoadingResume] = useState(true)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        const response = await fetch(`http://localhost:3001/resumes/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('이력서를 불러오는데 실패했습니다')
        }

        const data = await response.json()
        setResume(data)
      } catch (error) {
        console.error('에러 발생:', error)
      } finally {
        setIsLoadingResume(false)
      }
    }

    fetchResume()
  }, [params.id, router])

  if (isLoading || isLoadingResume) {
    return <div>Loading...</div>
  }

  if (!resume) {
    return <div>이력서를 찾을 수 없습니다</div>
  }

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <PageHeader title={resume.title} description="Public view of your resume">
          <ActionButtons>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share className="h-4 w-4" />
              Share Link
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <QrCode className="h-4 w-4" />
              QR Code
            </Button>
            <Link href={`/resume/${params.id}/edit`}>
              <Button size="sm" className="gap-1">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </Link>
          </ActionButtons>
        </PageHeader>

        <Card>
          <CardContent className="p-6">
            <div dangerouslySetInnerHTML={{ __html: resume.html }} />
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}

