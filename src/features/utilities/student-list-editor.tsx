import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type StudentListEditorProps = {
  id: string
  label: string
  students: string[]
  onChange: (students: string[]) => void
}

export function StudentListEditor({
  id,
  label,
  students,
  onChange,
}: StudentListEditorProps) {
  const [draft, setDraft] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const addStudent = () => {
    const name = draft.trim().replace(/\s+/g, ' ')
    if (!name) {
      setLocalError('Введите фамилию и имя.')
      return
    }
    if (students.some((s) => s.toLowerCase() === name.toLowerCase())) {
      setLocalError('Этот ученик уже в списке.')
      return
    }
    onChange([...students, name])
    setDraft('')
    setLocalError(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addStudent()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addStudent()
    }
  }

  const removeStudent = (index: number) => {
    onChange(students.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          id={id}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            if (localError) setLocalError(null)
          }}
          onKeyDown={handleKeyDown}
          placeholder="Фамилия Имя"
        />
        <Button type="submit" variant="secondary" className="shrink-0">
          <Plus />
          Добавить
        </Button>
      </form>
      {localError ? (
        <p className="text-xs text-destructive">{localError}</p>
      ) : null}
      {students.length === 0 ? (
        <p className="rounded-lg border border-dashed px-3 py-6 text-center text-xs text-muted-foreground">
          Список пуст
        </p>
      ) : (
        <ul className="flex flex-col gap-1 rounded-lg border p-1">
          {students.map((name, index) => (
            <li
              key={`${name}-${index}`}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50"
            >
              <span className="min-w-0 flex-1 truncate text-sm">{name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => removeStudent(index)}
                aria-label={`Удалить ${name}`}
              >
                <Trash2 />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
