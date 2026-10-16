export function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-3 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Добро пожаловать
      </h1>
      <p className="max-w-lg text-sm text-muted-foreground">
        Teacher Widgets — набор инструментов для учителя. Выберите раздел
        в меню слева: общее, математика, английский язык или утилиты.
      </p>
    </div>
  )
}
