import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  FileText,
  Plus,
  Download,
  Share,
  Pencil,
  Trash,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';

export default function ResumesPage() {
  return (
    <Container>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="My Resumes"
          description="Manage and organize all your resumes in one place."
        >
          <Link href="/resume/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Create New Resume
            </Button>
          </Link>
        </PageHeader>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search resumes..." className="pl-8" />
          </div>

          <div className="flex gap-2 items-center">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 p-4">
                <div className="h-full w-full bg-card rounded-md p-4">
                  <div className="h-6 w-24 bg-muted rounded mb-2"></div>
                  <div className="h-3 w-full bg-muted rounded mb-1"></div>
                  <div className="h-3 w-3/4 bg-muted rounded mb-3"></div>
                  <div className="h-12 w-full bg-muted rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-muted rounded"></div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">
                      {i === 1 ? 'Software Engineer Resume' : `Resume ${i}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Last edited: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                <Link href={`/resume/${i}/edit`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-3 w-3" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Share className="h-3 w-3" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive gap-1">
                  <Trash className="h-3 w-3" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
