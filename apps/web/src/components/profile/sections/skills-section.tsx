'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export function SkillsSection() {
  const form = useFormContext();
  const [newSkill, setNewSkill] = useState('');

  const skills = form.watch('skills') || [];

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      form.setValue('skills', [...skills, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      'skills',
      skills.filter((skill: string) => skill !== skillToRemove)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Add your professional skills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
                <button
                  type="button"
                  className="ml-2 hover:text-destructive"
                  onClick={() => removeSkill(skill)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill(newSkill.trim());
                  setNewSkill('');
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                addSkill(newSkill.trim());
                setNewSkill('');
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
